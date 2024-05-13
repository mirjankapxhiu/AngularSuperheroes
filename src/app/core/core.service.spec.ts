import { TestBed } from '@angular/core/testing'; // Importa la función TestBed para configurar el entorno de pruebas
import { CoreService } from './core.service'; // Importa el servicio que se va a probar

describe('CoreService', () => { // Inicia la descripción de las pruebas para el servicio CoreService
  let service: CoreService; // Declara una variable para contener una instancia del servicio

  beforeEach(() => { // Antes de cada prueba
    TestBed.configureTestingModule({}); // Configura el entorno de pruebas, en este caso no hay configuraciones adicionales
    service = TestBed.inject(CoreService); // Obtiene una instancia del servicio CoreService usando el inyector TestBed
  });

  it('should be created', () => { // Prueba para verificar si el servicio se ha creado correctamente
    expect(service).toBeTruthy(); // Verifica que la instancia del servicio no sea nula (es decir, que se haya creado correctamente)
  });
});
