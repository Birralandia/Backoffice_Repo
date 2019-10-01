import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Oferta } from 'src/app/interfaces/oferta';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clients: Cliente[];
  oferts: Oferta[];
  ganacias: string;
  gastos: string;


  constructor(
    private CloudFirestoreService : GetDataCloudFirestoreService
  ) { 
    this.oferts = [];
    this.clients = [];
    this.ganacias = '0';
    this.gastos = '0';
  }

  ngOnInit() {
    this.getDataToday();

    this.getClientes();
    this.getOfertas();
  }


  getClientes(){
    this.CloudFirestoreService.getClientes()
    .subscribe(data => {
      this.clients = data as Cliente[];
    });
  }

  getDataToday(){
    var f = new Date();
    const fechaHoy = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    let gananciasHoy = 0;
    this.CloudFirestoreService.getVentas()
    .subscribe(data => {
      data.map(element => {
        if(element["fecha"] === fechaHoy){
          gananciasHoy = Number(element["precio"]) + gananciasHoy;
        }
      });
      this.ganacias = gananciasHoy.toString();
    });
  }

  getOfertas(){
    this.CloudFirestoreService.getOfertasWithoutKey()
    .subscribe(data => {
      this.oferts = data as Oferta[];
    })
  }
}
