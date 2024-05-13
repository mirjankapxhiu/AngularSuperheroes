import { Injectable } from '@angular/core'; // Importa el decorador Injectable para marcar la clase como un servicio
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar para mostrar notificaciones emergentes

@Injectable({
  providedIn: 'root', // Indica que este servicio estará disponible en toda la aplicación
})
export class CoreService { // Define la clase del servicio
  constructor(private _snackBar: MatSnackBar) {} // Define el constructor del servicio que inyecta MatSnackBar

  // Método para abrir un snackbar con un mensaje y una acción (por defecto, 'ok')
  openSnackBar(message: string, action: string = 'ok') {
    // Muestra un snackbar con el mensaje proporcionado y la acción, con una duración de 1000 ms y posición vertical arriba
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
