import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private CFDataBase : GetDataCloudFirestoreService
  ) { 
    this.CFDataBase.formData = {
      uid: null,
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: false,
      password: '',
	    tipoUsuario:''
    }
  }

  ngOnInit() {
    
  }


  loginAuth(user,pass){
    console.log(user);
    console.log(pass);
    this.CFDataBase.SignIn(user,pass);
  }

}
