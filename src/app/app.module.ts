import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SidenavComponent } from './component/backoffice/sidenav/sidenav.component';
import { DashboardComponent } from './component/backoffice/dashboard/dashboard.component';
import { ContabilidadComponent } from './component/backoffice/contabilidad/contabilidad.component';
import { ClientesComponent } from './component/backoffice/clientes/clientes.component';
import { NotificacionComponent } from './component/backoffice/notificacion/notificacion.component';
import { NuevaNotificacionComponent } from './component/backoffice/notificacion/nueva-notificacion/nueva-notificacion.component';
import { FormsModule } from '@angular/forms';
import { ScancameraComponent } from './component/scancamera/scancamera.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NuevoRegistroComponent } from './component/scancamera/nuevo-registro/nuevo-registro.component';

import { GetDataCloudFirestoreService } from './services/get-data-cloud-firestore.service';


// FireBase Configuration
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroComponent } from './component/registro/registro.component';
import { AngularFireAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DashboardComponent,
    ContabilidadComponent,
    ClientesComponent,
    NotificacionComponent,
    NuevaNotificacionComponent,
    ScancameraComponent,
    NuevoRegistroComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ZXingScannerModule,
  
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers:[AngularFirestore,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
