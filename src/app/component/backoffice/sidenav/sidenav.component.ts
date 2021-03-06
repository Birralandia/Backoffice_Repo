import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isMenu : boolean;

  constructor(
    private Router : Router
  ) { 
   this.isMenu = true;
  }

  ngOnInit() {
  }


  getRouterActive() : String{
   const rutaActual = this.Router.url;
    
    if(rutaActual.indexOf("/dashboard") !== -1){
      return "dashboard";
    }
    if(rutaActual.indexOf("/economy") !== -1){
      return "economy";
    }
    if(rutaActual.indexOf("/finanzas") !== -1){
      return "finanzas";
    }
    if(rutaActual.indexOf("/clientes") !== -1){
      return "clientes";
    }
    if(rutaActual.indexOf("/productos") !== -1){
      return "productos";
    }
    if(rutaActual.indexOf("/configuracion") !== -1){
      return "configuracion";
    }
    if(rutaActual.indexOf("/scanner") !== -1 || rutaActual.indexOf("/nueva-venta") !== -1){
      return "scanner";
    }
    if(rutaActual.indexOf("/notificacion") !== -1 || rutaActual.indexOf("/nueva-notificacion") !== 1){
      return "notificacion";
    }
   
    
  }
}
