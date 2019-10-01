import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/interfaces/productos';
import { GetDataCloudFirestoreService } from 'src/app/services/get-data-cloud-firestore.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  listProductos: Productos[];

  isNewProduct: boolean;
  isEditProduct: boolean;
  isMobile : boolean;

  tempProduct: Productos;



  constructor(
    private cloudFireseService: GetDataCloudFirestoreService
  ) {
    this.tempProduct = {
      nombre: '',
      precio: 0
    };
    this.isMobile = (window.innerWidth < 768) ? false : true;
  }

  ngOnInit() {
    this.getDataProductos();
  }

  getDataProductos() {
    this.cloudFireseService.getProductos()
      .subscribe(data => {
        const aux = [];
        try {
          data.docChanges().map(element => {
            aux.push({ uid: element.doc.id, nombre: element.doc.data().nombre, precio: element.doc.data().precio });
          });
        } catch {
          alert("¡Error! Porfavor volvé a intentarlo, si persiste el problema ponete en contacto con tu soporte");
        }
        this.listProductos = aux;
      });
  }

  guardarProducto() {
    if (this.tempProduct.nombre !== "" && this.tempProduct.nombre !== null) {
      if (this.tempProduct.precio !== 0 && this.tempProduct.precio !== null) {
        this.cloudFireseService.agregarProducto(this.tempProduct);
        this.getDataProductos();
        this.isNewProduct = false;
        this.resetProduct();

      }
    }
  }

  modificarProducto() {
    if (this.tempProduct.nombre !== "" && this.tempProduct.nombre !== null) {
      if (this.tempProduct.precio !== 0 && this.tempProduct.precio !== null) {
        this.cloudFireseService.updateProductos(this.tempProduct);
        this.isEditProduct = false;
        this.resetProduct();
      }
    }
  }

  resetProduct(){
    this.tempProduct = {
      nombre:"",
      precio:0
    }
  }

  borrar(uid ){
    this.cloudFireseService.deleteProductos(uid);
  }

}
