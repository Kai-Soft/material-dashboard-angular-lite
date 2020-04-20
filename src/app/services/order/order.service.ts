import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { URL_SERVICES } from '../../config/config';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public http: HttpClient
  ) { }

  cargarOrdenes() {

    const url = URL_SERVICES + '/orders';

    return this.http.get(url);

  }

  obtenerOrden( order: Order ) {

    const url = URL_SERVICES + '/orders/' + order.id;

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );
  }

  crearOrden( order: Order ) {

    const url = URL_SERVICES + '/orders';

    // TODO: agregar funcionalidad de usuarios, por el momento seteamos un usuario activo
    order.user = '17fd033d-2742-4b28-ac84-b361882ee456';

    return this.http.post(url, order)
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

  actualizarOrden( order: Order ) {

    const url = URL_SERVICES + '/orders/' + order.id;

    return this.http.put(url, order)
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

  borrarOrden( order: Order ) {

    const url = URL_SERVICES + '/orders/' + order.id;

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
