import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';
import { Notificacion } from 'src/app/interfaces/notificaciones';
import { Cliente } from 'src/app/interfaces/cliente';
import { ComunicateWebServiceService } from 'src/app/services/comunicate-web-service.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  listNotificaciones: Notificacion[];
  listClientes: Cliente[];

  isExito: boolean;

  constructor(
    private CloudFiretoreService: GetDataCloudFirestoreService,
    private WebServiceCM: ComunicateWebServiceService
  ) {
    this.listNotificaciones = [];
    this.isExito = false;
  }

  ngOnInit() {
    this.getListOfertas();
    this.getListClients();
  }

  getListOfertas() {
    this.CloudFiretoreService.getOfertasUidRef()
      .subscribe(data => {
        try {
          let aux;
          this.listNotificaciones = [];
          data.docChanges().map(element => {
            aux = element.doc.data();
            aux.uid = element.doc.id;
            this.listNotificaciones.push(aux);
          });
        } catch {

        }
      });
  }

  getListClients() {
    this.CloudFiretoreService.getClientes()
    .subscribe(data => {
      this.listClientes = data as Cliente[];
    });
  }

  sendNotificacion() {
    this.isExito = true;
    this.listNotificaciones.forEach(elementNotification => {

      this.listClientes.forEach(elementClient => {
        elementNotification.token = elementClient.token;
        this.WebServiceCM.WebServiceFCM(elementNotification)
        .subscribe(data => {
          console.log(data.text());
        });

      });
    });
  }

  borrarNotificacion(uid) {
    this.CloudFiretoreService.deleteOferte(uid);
  }
}
