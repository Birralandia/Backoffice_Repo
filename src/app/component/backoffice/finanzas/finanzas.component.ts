import { Component, OnInit } from '@angular/core';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  mesesShow : any[];
  mesesIngresos : any[];
  valoresMes : any[];
  ventas : any[];
  lastFiveSells : any[];
  mayorIndex : any;
  cargarBarras : boolean;

  constructor(
    private CloudFirestoreService : GetDataCloudFirestoreService
  ) { 
    this.valoresMes = [];
    this.mesesShow = []
  }

  ngOnInit() {

    var f = new Date();
    const Meses = [ f.getMonth() + 1, f.getMonth(), f.getMonth() - 1, f.getMonth() - 2];
    Meses.reverse();
    const MesesName = ["Ener","Febr","Marz","Abri","Mayo","Juni","Juli","Agos","Sept","Octu","Novi","Dici"];
    this.mesesShow = [];
    this.ventas = [];
    this.mesesIngresos = [];
    this.cargarBarras = false;
    this.calculateMeses(Meses,MesesName) 
    this.calculateLastVentasGrafico(Meses)
  
  }

  calculateLastVentasGrafico(MesesNumber){
    this.CloudFirestoreService.getVentas()
    .subscribe(data => {
      this.ventas = data;
      this.ventas.forEach(element => {
        MesesNumber.forEach(numeroMes => {
          if(Number(element.fecha.split("/")[1]) === numeroMes){
            this.mesesIngresos.push(element);
          }
        });
      });

      let valuesAux1 = 0;
      let valuesAux2 = 0;
      let valuesAux3 = 0;
      let valuesAux4 = 0;

      
      this.mesesIngresos.forEach(element => {
        if(Number(element.fecha.split("/")[1]) === MesesNumber[0]){
          valuesAux1 = valuesAux1 + element.precio;
        }else if(Number(element.fecha.split("/")[1]) === MesesNumber[1]){
          valuesAux2 = valuesAux2 + element.precio;
        }else if(Number(element.fecha.split("/")[1]) === MesesNumber[2]){
          valuesAux3 += element.precio;
        }else if(Number(element.fecha.split("/")[1]) === MesesNumber[3]){
          valuesAux4 += element.precio;
        }
      });
      
      this.valoresMes = [Number(valuesAux1.toString()), Number(valuesAux2.toString()), Number(valuesAux3.toString()), Number(valuesAux4.toString())];
  
      let mayor = 0;

      for(let i = 0; i < this.valoresMes.length; i++){
          if (this.valoresMes[i] > mayor)
          {

              mayor = this.valoresMes[i];
              this.mayorIndex = i;
          };
      }
      
      this.cargarBarras = true;
    });
  }


  calculateMeses(Meses,MesesName){
    Meses.forEach(element => {
      this.mesesShow.push(MesesName[element-1]);
    });
  }

  calculateHeightBar(value){
    return (value * 100 / this.valoresMes[this.mayorIndex])*260/100+"px";
  }


}
