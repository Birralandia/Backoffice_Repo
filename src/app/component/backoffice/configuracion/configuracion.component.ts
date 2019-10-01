import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  tipo: string;

  isEnvios: boolean;
  dataEnvios: any;

  constructor(
    private CloudFirestoreService: GetDataCloudFirestoreService
  ) {
    this.tipo = '';
    this.isEnvios = false;
    this.dataEnvios = {
      ubicacion: '',
      horario: '',
      status:''
    };
  }

  ngOnInit() {
  }

  guardarConfiguracion() {
    this.dataEnvios.status = (!this.isEnvios).toString();
    this.CloudFirestoreService.agregarEnvio(this.dataEnvios);
  }

}
