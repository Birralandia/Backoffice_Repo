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
    this.isEnvios = true;
    this.dataEnvios = {
      ubicacion: '',
      horario: '',
      status:''
    };
  }

  ngOnInit() {
    this.CloudFirestoreService.getEnvios()
    .subscribe(data => {

      try {
        data.docChanges().map(element => {
          this.dataEnvios = {uid: element.doc.id, horario: element.doc.data().horario, ubicacion: element.doc.data().ubicacion};
        });
      } catch {
        alert('Error con el sistema de envios');
      }
    });
  }

  guardarConfiguracion() {
    this.dataEnvios.status = (!this.isEnvios).toString();
    this.CloudFirestoreService.updateEnvios(this.dataEnvios);
    this.tipo = '';
  }

}
