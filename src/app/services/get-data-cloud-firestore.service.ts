import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Cliente } from '../interfaces/cliente';
import { Observable, Observer } from 'rxjs';
import { Ventas } from '../interfaces/ventas';
import { Oferta } from '../interfaces/oferta';
import { Productos } from '../interfaces/productos';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataCloudFirestoreService {

  /** Data to loging  **/
  userData: any;
  formData: any;
  /**                 **/
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    public afs: AngularFirestore,     // Inject Firestore service
    public afAuth: AngularFireAuth,   // Inject Firebase auth service
    public router: Router,            // Route to use dom
    public ngZone: NgZone             // NgZone service to remove outside scope warning
  ) {
    /** Set default value **/
    this.formData = {
      uid: null,
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
      password: '',
      tipoUsuario: ''
    }


    /**  Saving user data in localstorage when
    logged in and setting up null when logged out **/

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }


  /**
   * Sing In user with FirebaseAuth
   * @param email Email of user
   * @param password Password of user
   */
  SignIn(email, password) {
    if (email == "" || email == undefined || password == "" || password == undefined)
      return;

    this.afAuth.auth.languageCode = 'es';
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        console.log(this.SetUserData(result.user));

        this.ngZone.run(() => {
          this.router.navigate(['backoffice/dashboard']);
        });

      }).catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("La contraseña no es válida o el usuario no tiene una contraseña");
            break;
          case "auth/user-not-found":
            alert("No hay un registro de usuario correspondiente a este identificador. Es posible que el usuario haya sido eliminado");
            break;
          case "auth/invalid-email":
            alert("Email con formato incorrecto. Por favor volver a ingresar el email.");
            break;
          default:
            if (error.message === "Cannot read property 'emailVerified' of undefined") {
              this.SignIn(email, password)
            }
            break;
        };
      })
  }


  /**
   * Sing Up user with Firebase Auth - Method Asynctro
   * @param form Need a form data from login form. This method use input name to get value.
   */
  async SignUp(form) {
    localStorage.setItem('registroCliente', JSON.stringify(form.value));
    this.afAuth.auth.languageCode = 'es';
    return await this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.pas)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        return true;
      }).catch((error) => {
        window.alert(error.message);
        return false;
      });

  }



  /**
   * This method is obsolete. But we can use this to send emails in the future.
   */
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }




  /**
   * 
   * Method to update password 
   * @param passwordResetEmail Get password to update current password when user forgot it.
   *
   */
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }


  /**
   * Verifi if user is logged. Return true if the user is logged.
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }



  /**
   * Providers method
   * @param provider Using providers to login.
   */
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }


  /** Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service **/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      tipoUsuario: "free",
      emailVerified: user.emailVerified,
      password: ""
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  /**
   * Update password
   * @param password Password to update current password
   */
  changePassword(password) {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }


  /**
   * Loggout method 
   */
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }


  /*********************+ END METHODS AUTH ************************/


  /******************** GET METHODS *********************/
  /**
   * Get Clients collection. Return Json type Cliente.
   */
  getClientes() {
    const doc = this.afs.collection('users');
    const listClients = doc.valueChanges();
    return listClients;
  }

  /**
   * Get Clients collection. Return Json type Cliente.
   */
  getVentas() {
    const doc = this.afs.collection('ventas');
    const listVentas = doc.valueChanges();
    return listVentas;
  }
  /**
   * Get Products collection. Return Json type Product
   */
  getProductos() {
    let productos = [];
    let cityRef = this.afs.collection('productos');
    return cityRef.get()

  }

  /**
  * Get Offers collection. Return Json type Oferta
  */
  getOfertasWithKey(keyOferta) {
    const doc = this.afs.collection('oferta').doc(keyOferta);
    const listProducts = doc.valueChanges();
    return listProducts;
  }

  getOfertasWithoutKey() {
    const doc = this.afs.collection('oferta');
    const listOferta = doc.valueChanges();
    return listOferta;
  }

  getOfertasUidRef() {
    let productos = [];
    let cityRef = this.afs.collection('oferta');
    return cityRef.get();
  }

  /**
   * Get envios collection. Return Json type Envio
   */
  getEnvios() {
    let productos = [];
    let cityRef = this.afs.collection('envios');
    return cityRef.get();

  }

  /*****************************************************/


  /****************** ADD METHODS DATABASE ************/

  /**
   * Add sale to Data base - Venta Interface
   * @param venta Get variable of type Ventas.
   */
  agregarVenta(venta: Ventas) {
    const doc = this.afs.collection('ventas');
    doc.add({
      email: venta.email,
      precio: venta.precio,
      producto: venta.producto,
      cantidad: venta.cantidad,
      uid: venta.uid,
      fecha: venta.fecha
    })
  }

  /**
   * Add sale to Data base - Venta Interface
   * @param producto Get variable of type Ventas.
   */
  agregarProducto(producto: Productos) {
    const doc = this.afs.collection('productos');
    doc.add({
      nombre: producto.nombre,
      precio: producto.precio
    });
  }

  /**
   * Add points to  data base - Cliente Interface
   * @param slug Get variable of type Cliente Interface
   */
  agregarPuntos(slug: Cliente) {
    const doc = this.afs.collection('users').doc(slug.uid);
    doc.set({
      email: slug.email,
      nombre: slug.nombre,
      token: slug.token,
      uid: slug.uid,
      puntos: slug.puntos,
      ultimaCompra: slug.ultimaCompra
    })
  }

  /**
   * Add Offers to data base - Oferta Interface
   * @param oferta Get variable of type Oferta Interface
   */
  agregarOferta(oferta: Oferta) {
    const doc = this.afs.collection('oferta');
    doc.add({
      title: oferta.title,
      body: oferta.body,
      descuento: oferta.descuento,
      producto: oferta.producto,
      puntos: oferta.puntos,
      dias: oferta.dias,
      fechaHoy: oferta.fechaHoy
    });
  }

  /**
   * Add Offers to data base - Oferta Interface
   * @param envio Get variable of type Oferta Interface
   */
  agregarEnvio(data: any) {
    const doc = this.afs.collection('envios');
    doc.add({
      ubicacion: data.ubicacion,
      horario: data.horario,
      status: data.status
    });
  }

  /***************************************************/

  /***************** UPDATE METHODS ****************/

  updateUsuario(slug: Cliente) {
    const doc = this.afs.collection('users').doc(slug.uid);
    doc.set({
      email: slug.email,
      nombre: slug.nombre,
      token: slug.token,
      uid: slug.uid,
      puntos: slug.puntos,
      ultimaCompra: slug.ultimaCompra
    });
  }



  updateProductos(producto: Productos) {
    const doc = this.afs.collection('productos').doc(producto.uid);
    doc.update({
      nombre: producto.nombre,
      precio: producto.precio,
    });
  }


  updateEnvios(envios: any) {
    const doc = this.afs.collection('envios').doc(envios.uid);
    doc.update({
      horario: envios.horario,
      status: envios.status,
      ubicacion: envios.ubicacion
    });
  }



  /********* DETELE METHODS ***********/

  deleteProductos(uid){
    const doc = this.afs.collection('productos').doc(uid).delete();
  } 

  deleteOferte(uid) {
    const doc = this.afs.collection('oferta').doc(uid).delete();
    console.log("borrado");
  }
}
