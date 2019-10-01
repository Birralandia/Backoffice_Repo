import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Notificacion } from 'src/app/interfaces/notificaciones';
import { ComunicateWebServiceService } from 'src/app/services/comunicate-web-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listClientes: Cliente[];
  cliente: Cliente;
  tempNotificacion: Notificacion;

  constructor(
    private CloudFirestoreService: GetDataCloudFirestoreService,
    private WebServiceCM: ComunicateWebServiceService
  ) {
    this.listClientes = [];

    this.tempNotificacion = {
      title: '',
      body: '',
      token: '',
      icon: ''
    };

   }

  ngOnInit() {
    this.getListClients();
  }

  getListClients() {
    this.CloudFirestoreService.getClientes()
    .subscribe(data => {
      this.listClientes = data as Cliente[];
    });
  }

  sendNotificacion() {
    this.WebServiceCM.WebServiceFCM(this.tempNotificacion);
    this.cliente = null;
    this.resetNotification();
  }

  resetNotification() {
    this.tempNotificacion = {
      title: '',
      body: '',
      token: '',
      icon: ''
    };
  }
}
