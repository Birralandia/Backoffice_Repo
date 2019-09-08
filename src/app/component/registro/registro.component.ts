import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(
    public CFDataBase : GetDataCloudFirestoreService
  ) { 
   
  }

  ngOnInit() {
  }

  registrarUsuario(form) {
    console.log(form);
    this.CFDataBase.SignUp(form).then(result => {
      if (result) {
        let cliente = JSON.parse(localStorage.getItem('registroCliente'));
       // this.CFDataBase.addClientes(cliente.displayName, cliente.email);
        localStorage.removeItem('registroCliente');
       // this.CFDataBase.getDataToUser();
      }
    })
      .catch(err => alert("error al registrarse >" + err));
  }



}
