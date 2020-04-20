import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { URL_SERVICES } from '../../config/config';
import { BussinessPartner } from '../../models/bussiness-partner.model';

@Injectable({
  providedIn: 'root'
})
export class BussinessPartnerService {

  constructor(
    public http: HttpClient
  ) { }

  cargarSociosComerciales( all?: boolean ) {

    let url: string;

    if (!all) {
      url = URL_SERVICES + '/bussiness-partners';
    } else {
      url = URL_SERVICES + '/bussiness-partners/?all=' + all;
    }

    return this.http.get(url);

  }

  obtenerSocioComercial( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners/' + bp.id;

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );
  }

  obtenerClienteBp( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners/' + bp.id + '/customer';

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );
  }

  obtenerTecnicoBp( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners/' + bp.id + '/technical';

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );
  }

  crearSocioComercial( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners';

    return this.http.post(url, bp)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al crear el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }

  actualizarSocioComercial( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners/' + bp.id;

    return this.http.put(url, bp)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      }),
                      catchError(err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al actualizar el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }

  borrarSocioComercial( bp: BussinessPartner ) {

    const url = URL_SERVICES + '/bussiness-partners/' + bp.id;

    return this.http.delete(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      }),
                      catchError(err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al borrar el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }
}
