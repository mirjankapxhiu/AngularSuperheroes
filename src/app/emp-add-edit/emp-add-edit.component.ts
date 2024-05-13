import { Component, Inject, OnInit } from '@angular/core'; // Importa los decoradores y clases necesarias desde Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa las clases necesarias para trabajar con formularios reactivos
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa las clases necesarias para trabajar con diálogos modales
import { CoreService } from '../core/core.service'; // Importa el servicio CoreService para mostrar notificaciones
import { SuperheroeService } from '../services/superheroe.service'; // Importa el servicio SuperheroeService para agregar o actualizar superhéroes

@Component({
  selector: 'app-emp-add-edit', // Selector del componente
  templateUrl: './emp-add-edit.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./emp-add-edit.component.scss'], // Ruta al archivo de estilos del componente
})
export class EmpAddEditComponent implements OnInit { // Definición de la clase del componente
  empForm: FormGroup; // FormGroup para el formulario de superhéroes

  superpoderes: string[] = [ // Lista de superpoderes disponibles
    "Vuelo",
    "Fuerza sobrehumana",
    "Invulnerabilidad",
    "Regeneración rápida",
    "Super velocidad",
    "Telepatía",
    "Telequinesis",
    "Invisibilidad",
    "Control del tiempo",
    "Manipulación elemental",
  ];

  constructor(
    private _fb: FormBuilder, // Inyección del servicio FormBuilder para construir formularios
    private _empService: SuperheroeService, // Inyección del servicio SuperheroeService para manejar superhéroes
    private _dialogRef: MatDialogRef<EmpAddEditComponent>, // Inyección del servicio MatDialogRef para trabajar con diálogos modales
    @Inject(MAT_DIALOG_DATA) public data: any, // Inyección de datos del diálogo modal
    private _coreService: CoreService // Inyección del servicio CoreService para mostrar notificaciones
  ) {
    this.empForm = this._fb.group({ // Inicialización del formulario de superhéroes
      nombre_real: ['', Validators.required], // Campo para el nombre real del superhéroe
      nombre_heroe: ['', Validators.required], // Campo para el nombre del superhéroe
      ano_primera_aparicion: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]], // Campo para el año de primera aparición del superhéroe
      gender: ['', Validators.required], // Campo para el género del superhéroe
      superpoderes: ['', Validators.required], // Campo para los superpoderes del superhéroe
    });
  }

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    if (this.data) { // Si hay datos, establece los valores del formulario con los datos proporcionados
      this.empForm.patchValue(this.data);
    }
  }

  onFormSubmit() { // Método que se ejecuta al enviar el formulario
    if (this.empForm.valid) { // Si el formulario es válido
      this.capitalizeFirstLetter('nombre_real'); // Capitaliza la primera letra del nombre real del superhéroe
      this.capitalizeFirstLetter('nombre_heroe'); // Capitaliza la primera letra del nombre del superhéroe
      if (this.data) { // Si hay datos, actualiza el superhéroe
        this._empService.updateSuperheroe(this.data.id, this.empForm.value).subscribe({ // Llama al método de actualización del servicio
          next: (val: any) => { // Si la llamada es exitosa
            this._coreService.openSnackBar('El superheroe se modifico correctamente'); // Muestra una notificación de éxito
            this._dialogRef.close(true); // Cierra el diálogo modal con un valor verdadero
          },
          error: (err: any) => { // Si hay un error en la llamada
            console.error(err); // Registra el error en la consola
          },
        });
      } else { // Si no hay datos, agrega un nuevo superhéroe
        this._empService.addSuperheroe(this.empForm.value).subscribe({ // Llama al método de adición del servicio
          next: (val: any) => { // Si la llamada es exitosa
            this._coreService.openSnackBar('El super héroe se registró correctamente'); // Muestra una notificación de éxito
            this._dialogRef.close(true); // Cierra el diálogo modal con un valor verdadero
          },
          error: (err: any) => { // Si hay un error en la llamada
            console.error(err); // Registra el error en la consola
          },
        });
      }
    } else { // Si el formulario no es válido
      alert('¡Todos los campos son obligatorios!'); // Muestra una alerta informando al usuario que todos los campos son obligatorios
    }
  }

  capitalizeFirstLetter(controlName: string) { // Método para capitalizar la primera letra de un control del formulario
    const value = this.empForm.get(controlName)?.value; // Obtiene el valor del control especificado
    if (typeof value === 'string' && value.length > 0) { // Si el valor es una cadena y no está vacío
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitaliza la primera letra del valor
      this.empForm.get(controlName)?.setValue(capitalizedValue); // Establece el valor capitalizado en el control del formulario
    }
  }
}
