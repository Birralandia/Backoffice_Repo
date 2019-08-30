import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-nuevo-registro-promocion',
  templateUrl: './nuevo-registro-promocion.component.html',
  styleUrls: ['./nuevo-registro-promocion.component.scss']
})
export class NuevoRegistroPromocionComponent implements OnInit {

  clientScanner : any;
  promoScanner : any;

  products : any;
  cantidad : number;
  productSelected : any;

  constructor(
    private CloudFirestoreDatabase : GetDataCloudFirestoreService,
    private ActivedRoute : ActivatedRoute
    ) { 
      this.clientScanner= {
        email:""
      }
      this.cantidad = null;
      this.promoScanner = {
        title:"",
        producto:"",
        descuento:""
      }
    }

  ngOnInit() {

    this.CloudFirestoreDatabase.getProductos()
    .subscribe(data => {  
      this.products = data;
    });

    const slug = this.ActivedRoute.snapshot.params["idcliente"];

    const keyClientePromo = slug.split("|&|");
    console.log(keyClientePromo);
    this.CloudFirestoreDatabase.getClientes()
    .subscribe(data => {

      data.map(element => {
        if(element['uid'] === keyClientePromo[0]){
          this.clientScanner = element;
        }
      });
      
    });
    this.CloudFirestoreDatabase.getOfertasWithKey(keyClientePromo[1])
      .subscribe(data => {
        this.promoScanner = data;
        this.promoScanner.descuentoText = "El descuento es de " + this.promoScanner.descuento;
      }); 
  }

  agregarVenta(){
    
    /** Calculate Points */
    const nuevoPuntosCliente = Number(this.clientScanner.puntos) - Number(this.promoScanner.puntos);
    this.clientScanner.puntos = nuevoPuntosCliente;

    /** Value of product */
    let valorPrecio = 0;
    this.products.forEach(element => {
      if(element.nombre.toUpperCase() === this.promoScanner.producto.toUpperCase()){
        valorPrecio = element.precio;
      }
    });
    const descuentoNumber = Number(this.promoScanner.descuento.split("%")[0]);
   

    /** Date of today */
    var f = new Date();
    var fechaHoy = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(); 
  
    /** Ultimate payment */
    this.clientScanner.ultimaCompra = fechaHoy;


    /** Venta register */
    let venta = {
      email: this.clientScanner.email,
      precio: Math.round(Number(valorPrecio) - valorPrecio*descuentoNumber/100 ),
      producto: this.promoScanner.producto,
      cantidad: 1,
      uid:this.clientScanner.uid,
      fecha: fechaHoy
    }

    /** Services Call */
    this.CloudFirestoreDatabase.agregarVenta(venta);
    this.CloudFirestoreDatabase.agregarPuntos(this.clientScanner);   
  }
}
