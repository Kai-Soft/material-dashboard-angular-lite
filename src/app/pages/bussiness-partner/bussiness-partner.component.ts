import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Models
import { BussinessPartner } from '../../models/bussiness-partner.model';
import { Customer } from '../../models/customer.model';
import { Technical } from '../../models/technical.model';

// Services
import { BussinessPartnerService } from '../../services/bussiness-partner/bussiness-partner.service';
import { CustomerService } from '../../services/customer/customer.service';
import { TechnicalService } from '../../services/technical/technical.service';

@Component({
  selector: 'app-bussiness-partner',
  templateUrl: './bussiness-partner.component.html',
  styleUrls: ['./bussiness-partner.component.css']
})
export class BussinessPartnerComponent implements OnInit {

  bps: BussinessPartner[] = [];
  bp: BussinessPartner = new BussinessPartner('', '', '', '', 0);
  customer: Customer = new Customer('', null);
  technical: Technical = new Technical('', null);

  cargando = true;
  modalCreate = 'ocultar';
  modalUpdate = 'ocultar';
  modalCreateCustomer = 'ocultar';
  modalCreateTechnical = 'ocultar';
  all = false;

  constructor(
    public _bpService: BussinessPartnerService,
    public _customerService: CustomerService,
    public _technicalService: TechnicalService
  ) { }

  ngOnInit() {
    this.cargarSociosComerciales(this.all);
  }

  hideModalCreate() {
    this.modalCreate = 'ocultar';
    this.cargarSociosComerciales(this.all);
  }

  showModalCreate() {
    this.modalCreate = '';
  }

  hideModalCreateCustomer() {
    this.customer.customerIdCompany = null;
    this.customer.bussinessPartner = null;
    this.modalCreateCustomer = 'ocultar';
  }

  showModalCreateCustomer( bp: BussinessPartner ) {

    this._bpService.obtenerClienteBp(bp)
                    .subscribe((resp: any) => {
                      console.log(resp);
                      if (resp.message === 'OK') {
                        Swal.fire({
                          icon: 'info',
                          title: 'Ya existe!',
                          text: 'El socio comercial ya existe como cliente, solicite al administrador la activación del mismo'
                        });
                      } else {
                        this.customer.bussinessPartner = bp;
                        this.modalCreateCustomer = '';
                      }
                    });
  }

  hideModalCreateTechnical() {
    this.technical.technicalIdCompany = null;
    this.technical.bussinessPartner = null;
    this.modalCreateTechnical = 'ocultar';
  }

  showModalCreateTechnical(bp: BussinessPartner) {

    this._bpService.obtenerTecnicoBp(bp)
                    .subscribe((resp: any) => {
                      if (resp.message === 'OK') {
                        Swal.fire({
                          icon: 'info',
                          title: 'Ya existe!',
                          text: 'El socio comercial ya existe como técnico, solicite al administrador la activación del mismo'
                        });
                      } else {
                        this.technical.bussinessPartner = bp;
                        this.modalCreateTechnical = '';
                      }
                    });
  }

  hideModalUpdate() {
    this.bp.nit = null;
    this.bp.firstName = null;
    this.bp.lastName = null;
    this.bp.direction = null;
    this.bp.telephone = null;
    this.modalUpdate = 'ocultar';
    this.cargarSociosComerciales(this.all);
  }

  showModalUpdate( bp: BussinessPartner ) {
    this.bp = bp;
    this.modalUpdate = '';
  }

  cargarSociosComerciales( all?: boolean ) {

    this.cargando = true;

    this._bpService.cargarSociosComerciales( all )
                    .subscribe((resp: any) => {
                      this.bps = resp.bps;
                      this.cargando = false;
                      this.all = all;
                    });
  }

  cargarInactives( event ) {

    this.cargarSociosComerciales(event.target.checked);

  }

  obtenerSocioComercial( bp: BussinessPartner ) {

    this._bpService.obtenerSocioComercial(bp)
                    .subscribe((resp: any) => {
                      this.bp = resp.bp;
                    });
  }

  crearSocioComercial( bp: BussinessPartner ) {

    this._bpService.crearSocioComercial(bp)
                    .subscribe( resp => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Socio comercial creado exitosamente',
                        text: bp.firstName + ' ' + bp.lastName
                      });
                      this.hideModalCreate();
                    });

  }

  crearCliente( customer: Customer ) {

    this._customerService.crearCliente(customer)
                          .subscribe( resp => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Cliente creado exitosamente',
                              text: 'Customer Id: ' + customer.customerIdCompany
                            });
                            this.cargarSociosComerciales(this.all);
                            this.hideModalCreateCustomer();
                          });
  }

  crearTecnico( technical: Technical ) {

    this._technicalService.crearTecnico(technical)
                          .subscribe( resp => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Técnico creado exitosamente',
                              text: 'Técnico Id: ' + technical.technicalIdCompany
                            });
                            this.cargarSociosComerciales(this.all);
                            this.hideModalCreateTechnical();
                          });
  }

  actualizarSocioComercial( bp: BussinessPartner ) {

    this._bpService.actualizarSocioComercial(bp)
                    .subscribe( resp => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Socio comercial actualizado exitosamente',
                        text: bp.firstName + ' ' + bp.lastName
                      });
                      this.hideModalUpdate();
                    });
  }

  borrarSocioComercial( bp: BussinessPartner ) {

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

        this._bpService.borrarSocioComercial(bp)
                        .subscribe( borrado => {
                              console.log(borrado);
                              this.cargarSociosComerciales(this.all);
                            });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El socio comercial ha sido eliminado',
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
