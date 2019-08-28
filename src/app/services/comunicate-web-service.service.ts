import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../interfaces/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class ComunicateWebServiceService {

  constructor(
    private Http : Http
    ){}

    /**
     * Send to WebService PHP Notification Data to generate Notifications Push.
     * @param Notification Get Json of type Notification.
     */
  WebServiceFCM(Notification? : Notificacion){
    return this.Http.get("http://cristianestudio.com/assets/WebServiceFCM.php?token="+Notification.token+"&title="+Notification.title+"&body="+Notification.body+"&icon="+Notification.icon);
  }
}
