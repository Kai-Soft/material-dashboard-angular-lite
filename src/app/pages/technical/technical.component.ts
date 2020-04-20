import { Component, OnInit } from '@angular/core';

// Models
import { Technical } from '../../models/technical.model';

// Services
import { TechnicalService } from '../../services/technical/technical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {

  technicians: Technical[] = [];
  technical: Technical = new Technical('', null);

  modalUpdate = 'ocultar';
  cargando = true;

  constructor(
    public _technicalService: TechnicalService
  ) { }

  ngOnInit() {
    this.cargarTecnicos();
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.cargarTecnicos();
  }

  showModalUpdate(technical: Technical) {
    this.technical = technical;
    this.modalUpdate = '';
  }

  cargarTecnicos() {

    this.cargando = true;

    this._technicalService.cargarTecnicos()
                          .subscribe((resp: any) => {
                            this.technicians = resp.technicians;
                            this.cargando = false;
                          });
  }

  actualizarTecnico( technical: Technical ) {

    this._technicalService.actualizarTecnico(technical)
                        .subscribe( resp => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Técnico actualizado exitosamente',
                              text: 'Técnico Id: ' + technical.technicalIdCompany
                            });
                            this.cargarTecnicos()
                            this.hideModalUpdate();
                          });
  }

  borrarTecnico( technical: Technical ) {

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

        this._technicalService.borrarTecnico(technical)
                              .subscribe(borrado => {
                                this.cargarTecnicos();
                              });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El técnico ha sido eliminado',
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
