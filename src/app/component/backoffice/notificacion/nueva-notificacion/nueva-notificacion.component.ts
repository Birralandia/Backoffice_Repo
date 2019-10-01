import { Component, OnInit } from '@angular/core';
import { ComunicateWebServiceService } from 'src/app/services/comunicate-web-service.service';
import { Notificacion } from 'src/app/interfaces/notificaciones';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-nueva-notificacion',
  templateUrl: './nueva-notificacion.component.html',
  styleUrls: ['./nueva-notificacion.component.scss']
})
export class NuevaNotificacionComponent implements OnInit {

  target : string;
  icon : number;
  notification : Notificacion;
  Oferta : any;
  listClients : any[];
  productSelected : string;
  diasFrecuencia : number;

  productosList : any[];

  constructor(
    private CFService : GetDataCloudFirestoreService,
    private WebServiceFCM : ComunicateWebServiceService
  ) { 
    this.target = "Seleccioná una opción"
    this.notification = {
      token:"",
      title:"",
      body:"",
      icon:""
    }
    this.Oferta = {
      title:"",
      body:"",
      descuento:"",
      producto:""
    }
    this.diasFrecuencia = null;
    this.listClients = []
  }


  ngOnInit() {
    this.CFService.getClientes()
    .subscribe(data => {
      this.listClients = []
      this.listClients = data.map(element => {
        return element;
      })
    });

    this.CFService.getProductos()
    .subscribe(data => {
      const aux = [];
      try {
        data.docChanges().map(element => {
          aux.push({ uid: element.doc.id, nombre: element.doc.data().nombre, precio: element.doc.data().precio });
        });
      } catch {
        alert("¡Error! Porfavor volvé a intentarlo, si persiste el problema ponete en contacto con tu soporte");
      }
      this.productosList = aux;

    })
  }

  sendNotification(){
    let iconToNotification = "";
    switch (this.icon) {
      case 1:
        iconToNotification = "http://cristianestudio.com/assets/share_item/fashion.png"
        break;
        case 2:
        iconToNotification = "http://cristianestudio.com/assets/share_item/laundry.png"
        break;
        case 3:
          iconToNotification = "http://cristianestudio.com/assets/share_item/colores.png"
          break;
    
      default:
          iconToNotification = "http://cristianestudio.com/assets/share_item/colores.png"

        break;
    }

    this.notification.icon = iconToNotification;
    
    if(this.target === 'A todos los clientes'){
      this.listClients.forEach(element => {
        this.notification.token = element.token;
        const result = this.WebServiceFCM.WebServiceFCM(this.notification);
        result.subscribe(data => {
          console.log(data.text());
        });
      });
    }
    var f = new Date();
    var fechaHoy = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(); 
    
    if(this.target === 'Filtrar por frecuencia'){
      this.listClients.forEach(element => {
        if(element.ultimaCompra !== undefined){
    
          if(this.calculeDays(element.ultimaCompra,fechaHoy) >= this.diasFrecuencia){
            this.notification.token = element.token;
            const result = this.WebServiceFCM.WebServiceFCM(this.notification);
            result.subscribe(data => {
                console.log(data.text());
              });
            }
        }
      });
    }


    this.agregarOferta(fechaHoy);
  }
  
  agregarOferta(fechaHoy){
    var oferta = {
      title: this.notification.title,
      body: this.notification.body,
      descuento:this.Oferta.descuento,
      producto: this.productSelected,
      puntos:this.Oferta.puntos,
      dias:this.Oferta.dias,
      fechaHoy: fechaHoy
    }
    this.CFService.agregarOferta(oferta);
  }

  calculeDays(ultimaCompra, fechaHoy){
    var aFecha1 = ultimaCompra.split('/');
    var aFecha2 = fechaHoy.split('/');
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(Number(aFecha2[2]),Number(aFecha2[1])-1,Number(aFecha2[0]));
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }
  
  targetChange(value){
    this.target = value;
    if(this.target == 'A todos los clientes'){
      this.Oferta.puntos = 0;
    }else{
      this.Oferta.puntos = null;
    }
  }
}
