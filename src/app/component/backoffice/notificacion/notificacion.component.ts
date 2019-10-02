import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';
import { Notificacion } from 'src/app/interfaces/notificaciones';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  listNotificaciones: Notificacion[];
  constructor(
    private CloudFiretoreService: GetDataCloudFirestoreService
  ) {
    this.listNotificaciones = [];
  }

  ngOnInit() {
    this.getListOfertas();
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

  borrarNotificacion(uid) {
    this.CloudFiretoreService.deleteOferte(uid);
  }
}
