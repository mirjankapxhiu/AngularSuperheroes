import { async, ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las funciones y clases necesarias para realizar pruebas unitarias en Angular
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa las clases para simular un MatDialogRef y datos del diálogo
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'; // Importa clases para manejar formularios y formularios reactivos en Angular
import { EmpAddEditComponent } from './emp-add-edit.component'; // Importa el componente que se va a probar
import { CoreService } from '../core/core.service'; // Importa el servicio CoreService
import { SuperheroeService } from '../services/superheroe.service'; // Importa el servicio SuperheroeService
import { of } from 'rxjs'; // Importa la función 'of' de RxJS para crear observables de valores

describe('EmpAddEditComponent', () => { // Describe el conjunto de pruebas para el componente EmpAddEditComponent
  let component: EmpAddEditComponent; // Declara una variable para el componente
  let fixture: ComponentFixture<EmpAddEditComponent>; // Declara una variable para el fixture del componente
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EmpAddEditComponent>>; // Declara una variable para simular un MatDialogRef
  let empServiceSpy: jasmine.SpyObj<SuperheroeService>; // Declara una variable para simular un SuperheroeService
  let coreServiceSpy: jasmine.SpyObj<CoreService>; // Declara una variable para simular un CoreService

  beforeEach(async(() => { // Antes de cada prueba asíncrona
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']); // Crea un objeto simulado de MatDialogRef con el método 'close'
    const empServiceSpyObj = jasmine.createSpyObj('SuperheroeService', ['addSuperheroe', 'updateSuperheroe']); // Crea un objeto simulado de SuperheroeService con los métodos 'addSuperheroe' y 'updateSuperheroe'
    const coreServiceSpyObj = jasmine.createSpyObj('CoreService', ['openSnackBar']); // Crea un objeto simulado de CoreService con el método 'openSnackBar'

    TestBed.configureTestingModule({ // Configura el entorno de pruebas
      declarations: [ EmpAddEditComponent ], // Declara el componente EmpAddEditComponent
      imports: [ ReactiveFormsModule ], // Importa los módulos necesarios para las pruebas
      providers: [ // Define los proveedores de servicios simulados
        FormBuilder, // Proveedor para FormBuilder
        { provide: MatDialogRef, useValue: dialogRefSpyObj }, // Proveedor para simular MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Proveedor para simular datos de diálogo
        { provide: SuperheroeService, useValue: empServiceSpyObj }, // Proveedor para simular SuperheroeService
        { provide: CoreService, useValue: coreServiceSpyObj } // Proveedor para simular CoreService
      ]
    })
    .compileComponents(); // Compila los componentes del módulo

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EmpAddEditComponent>>; // Obtiene la instancia simulada de MatDialogRef
    empServiceSpy = TestBed.inject(SuperheroeService) as jasmine.SpyObj<SuperheroeService>; // Obtiene la instancia simulada de SuperheroeService
    coreServiceSpy = TestBed.inject(CoreService) as jasmine.SpyObj<CoreService>; // Obtiene la instancia simulada de CoreService
  }));

  beforeEach(() => { // Antes de cada prueba
    fixture = TestBed.createComponent(EmpAddEditComponent); // Crea un componente del tipo EmpAddEditComponent
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios
  });

  it('should create', () => { // Prueba para verificar si el componente se ha creado correctamente
    expect(component).toBeTruthy(); // Verifica que el componente no sea nulo
  });

  it('should initialize form with default values', () => { // Prueba para verificar si el formulario se inicializa con valores predeterminados
    expect(component.empForm.get('nombre_real')).toBeTruthy(); // Verifica si el campo 'nombre_real' del formulario existe
    // Agrega más expectativas para otros controles del formulario
  });

  it('should call addSuperheroe service method when form is submitted for new superhero', () => { // Prueba para verificar si se llama al método addSuperheroe del servicio cuando se envía el formulario para un nuevo superhéroe
    const formValue = { // Valores del formulario
      nombre_real: 'John Doe',
      // Agrega otros valores del formulario
    };
    component.empForm.setValue(formValue); // Establece los valores del formulario
    empServiceSpy.addSuperheroe.and.returnValue(of({})); // Configura el método addSuperheroe del servicio para devolver un observable de un objeto vacío
    component.onFormSubmit(); // Llama al método onFormSubmit del componente
    expect(empServiceSpy.addSuperheroe).toHaveBeenCalledWith(formValue); // Verifica si el método addSuperheroe del servicio se llamó con los valores del formulario
    expect(coreServiceSpy.openSnackBar).toHaveBeenCalledOnceWith('El super héroe se registró correctamente'); // Verifica si el método openSnackBar del servicio se llamó con un mensaje específico
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true); // Verifica si el método close de MatDialogRef se llamó con un argumento específico
  });
});
