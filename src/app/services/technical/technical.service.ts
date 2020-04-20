import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { URL_SERVICES } from '../../config/config';
import { Technical } from '../../models/technical.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicalService {

  constructor(
    public http: HttpClient
  ) { }

  cargarTecnicos() {

    const url = URL_SERVICES + '/technicians';

    return this.http.get(url);

  }

  obtenerTecnico( technical: Technical ) {

    const url = URL_SERVICES + '/technicians/' + technical.id;

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );

  }

  crearTecnico( technical: Technical ) {

    const url = URL_SERVICES + '/technicians';

    return this.http.post(url, technical)
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

  actualizarTecnico( technical: Technical ) {

    const url = URL_SERVICES + '/technicians/' + technical.id;

    return this.http.put(url, technical)
                    .pipe(
                      map((resp: any) => {
                      return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al actualizar el recurso'
                        });

                        return throwError(err);
                      })
                    );

  }

  borrarTecnico( technical: Technical ) {

    const url = URL_SERVICES + '/technicians/' + technical.id;

    return this.http.delete(url)
                    .pipe(
                      map((resp: any) => {
                      return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al eliminar el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }
}
