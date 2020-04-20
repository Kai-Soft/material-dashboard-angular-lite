import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Models
import { Order } from '../../models/order.model';
import { Customer } from '../../models/customer.model';
import { Technical } from '../../models/technical.model';

// Services
import { OrderService } from '../../services/order/order.service';
import { CustomerService } from '../../services/customer/customer.service';
import { TechnicalService } from '../../services/technical/technical.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  order: any = new Order(null, null, 0, '', '', null, null);
  customers: Customer[] = [];
  technicians: Technical[] = [];

  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';

  constructor(
    public _orderService: OrderService,
    public _customerService: CustomerService,
    public _technicalService: TechnicalService
  ) { }

  ngOnInit() {
    this.cargarOrdenes();
    this.cargarClientes();
    this.cargarTecnicos();
  }

  hideModalCreate() {
    this.order.creationDate = null;
    this.order.executionDate = null;
    this.order.dayOfService  = 0;
    this.order.customer = null;
    this.order.technical = null;
    this.order.theoryDescription = null;
    this.modalCreate = 'ocultar';
    this.cargarOrdenes();
  }

  showModalCreate() {
    this.modalCreate = '';
  }

  hideModalUpdate() {
    this.order.id = null;
    this.order.creationDate = null;
    this.order.executionDate = null;
    this.order.dayOfService = null;
    this.order.customer = null;
    this.order.technical = null;
    this.order.theoryDescription = null;
    this.modalUpdate = 'ocultar';
    this.cargarOrdenes();
  }

  showModalUpdate( order: Order ) {
    this.order.id = order.id;
    this.order.creationDate = order.creationDate;
    this.order.executionDate = order.executionDate;
    this.order.dayOfService = order.dayOfService;
    this.order.customer = order.customer.id;
    this.order.technical = order.technical.id;
    this.order.theoryDescription = order.theoryDescription;
    this.modalUpdate = ''
  }

  cargarOrdenes() {

    this.cargando = true;

    this._orderService.cargarOrdenes()
                      .subscribe((resp: any) => {
                        this.orders = resp.orders;
                        this.cargando = false;
                      });
  }

  cargarClientes() {

    this._customerService.cargarClientes()
                          .subscribe((resp: any) => {
                            this.customers = resp.customers;
                          });
  }

  cargarTecnicos() {

    this._technicalService.cargarTecnicos()
                            .subscribe((resp: any) => {
                              this.technicians = resp.technicians;
                            });
  }

  crearOrden( order: Order ) {

    this._orderService.crearOrden(order)
                      .subscribe( resp => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Orden de servicio creada exitosamente',
                          text: 'Creada el: ' + order.creationDate
                        });
                        this.hideModalCreate();
                      });
  }

  actualizarOrden( order: Order ) {

    this._orderService.actualizarOrden(order)
                      .subscribe( resp => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Orden de servicio actualizada exitosamente'
                        });
                        this.hideModalUpdate();
                      });
  }

  borrarOrden( order: Order ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: 'Desea eliminar este recurso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Deseo hacerlo!',
      cancelButtonText: 'No, canelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._orderService.borrarOrden(order)
          .subscribe(borrado => {
            this.cargarOrdenes();
          });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La orden de servicio ha sido eliminada',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu recurso está a salvo ;)',
          'error'
        )
      }
    });

  }

}
