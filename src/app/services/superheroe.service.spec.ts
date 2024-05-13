import { TestBed, inject } from '@angular/core/testing'; // Importa las funciones y clases necesarias para realizar pruebas unitarias en Angular
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importa las clases necesarias para simular solicitudes HTTP en pruebas unitarias

import { SuperheroeService } from './superheroe.service'; // Importa el servicio SuperheroeService que se va a probar

describe('SuperheroeService', () => { // Describe el conjunto de pruebas para el servicio SuperheroeService
  let service: SuperheroeService; // Declara una variable para el servicio SuperheroeService
  let httpMock: HttpTestingController; // Declara una variable para el controlador de pruebas HTTP

  beforeEach(() => { // Antes de cada prueba
    TestBed.configureTestingModule({ // Configura el entorno de pruebas
      imports: [HttpClientTestingModule], // Importa los módulos necesarios para las pruebas HTTP
      providers: [SuperheroeService] // Provee el servicio SuperheroeService en el entorno de pruebas
    });
    service = TestBed.inject(SuperheroeService); // Obtiene una instancia del servicio SuperheroeService
    httpMock = TestBed.inject(HttpTestingController); // Obtiene una instancia del controlador de pruebas HTTP
  });

  afterEach(() => { // Después de cada prueba
    httpMock.verify(); // Verifica que no haya solicitudes pendientes en el controlador de pruebas HTTP
  });

  it('should be created', () => { // Prueba para verificar si el servicio se ha creado correctamente
    expect(service).toBeTruthy(); // Verifica que el servicio no sea nulo
  });

  it('should send a POST request to add a superhero', inject( // Prueba para verificar si se envía una solicitud POST para agregar un superhéroe
    [HttpTestingController, SuperheroeService], // Inyecta el controlador de pruebas HTTP y el servicio SuperheroeService
    (httpMock: HttpTestingController, service: SuperheroeService) => { // Función de prueba con las instancias inyectadas
      const superheroData = { nombre_real: 'Clark Kent', nombre_heroe: 'Superman' }; // Datos del superhéroe
      const mockResponse = { id: 1, ...superheroData }; // Respuesta simulada del servidor

      service.addSuperheroe(superheroData).subscribe((response) => { // Llama al método para agregar un superhéroe y suscribe a la respuesta
        expect(response).toEqual(mockResponse); // Verifica si la respuesta es igual a la respuesta simulada
      });

      const req = httpMock.expectOne('http://localhost:3000/superheroe'); // Espera una solicitud POST a la URL especificada
      expect(req.request.method).toBe('POST'); // Verifica que el método de la solicitud sea POST
      req.flush(mockResponse); // Simula la respuesta del servidor
    }
  ));

  // Repite el mismo proceso para las otras pruebas (envío de solicitudes PUT, DELETE y GET)
});
