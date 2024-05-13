import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { SuperheroeService } from './services/superheroe.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre_real',
    'nombre_heroe',
    'ano_primera_aparicion',
    'gender',
    'superpoderes',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: SuperheroeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSuperheroeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSuperheroeList();
        }
      },
    });
  }

  getSuperheroeList() {
    this._empService.getSuperheroeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirmDelete(id: number) {
    if (confirm(`¿Está seguro de que desea eliminar este superhéroe? con ID ${id}`)) {

      this.deleteSuperheroe(id);
    }
  }

  deleteSuperheroe(id: number) {
    this._empService.deleteSuperheroe(id).subscribe({
      next: (res) => {
        if (res) {
          this._coreService.openSnackBar('El super héroe se borró correctamente', 'done');
          this.getSuperheroeList();
        } else {
          this._coreService.openSnackBar('Error al borrar el super héroe', 'error');
        }
      },
      error: (err) => {
        console.error(err);
        this._coreService.openSnackBar('Error al borrar el super héroe', 'error');
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSuperheroeList();
        }
      },
    });
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.getSuperheroeList();
  }
}
