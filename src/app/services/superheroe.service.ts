import { HttpClient } from '@angular/common/http'; // Importa el módulo HttpClient para realizar solicitudes HTTP
import { Injectable } from '@angular/core'; // Importa el decorador Injectable
import { Observable } from 'rxjs'; // Importa la clase Observable de RxJS para manejar datos asincrónicos

@Injectable({
  providedIn: 'root', // Indica que este servicio estará disponible en el ámbito de toda la aplicación
})
export class SuperheroeService { // Define la clase del servicio SuperheroeService
  constructor(private _http: HttpClient) {} // Inyecta el servicio HttpClient para realizar solicitudes HTTP

  addSuperheroe(data: any): Observable<any> { // Método para agregar un superhéroe
    return this._http.post('http://localhost:3000/superheroe', data); // Realiza una solicitud POST para agregar un superhéroe a la API
  }

  updateSuperheroe(id: number, data: any): Observable<any> { // Método para actualizar un superhéroe
    return this._http.put(`http://localhost:3000/superheroe/${id}`, data); // Realiza una solicitud PUT para actualizar un superhéroe en la API
  }

  getSuperheroeList(): Observable<any> { // Método para obtener la lista de superhéroes
    return this._http.get('http://localhost:3000/superheroe'); // Realiza una solicitud GET para obtener la lista de superhéroes desde la API
  }

  deleteSuperheroe(id: number): Observable<any> { // Método para eliminar un superhéroe
    return this._http.delete(`http://localhost:3000/superheroe/${id}`); // Realiza una solicitud DELETE para eliminar un superhéroe de la API
  }
}
