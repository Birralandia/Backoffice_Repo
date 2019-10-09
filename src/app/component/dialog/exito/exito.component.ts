import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss']
})
export class ExitoComponent implements OnInit {

  @Input() title;
  @Input() descripcion;

  @Output() cerrar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cerrarPopup(){
    this.cerrar.emit({true:true});
  }

}
