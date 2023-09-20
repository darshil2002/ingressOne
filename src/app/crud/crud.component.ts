import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { user,userMainData } from '../common.interface';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {

  data!: userMainData[];
  authToken : any

  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['name','last_name','address','birth_date','phone','email','action'];

  constructor(private mainService:MainServiceService,private _matDailog:MatDialog){}
  
  ngOnInit(){
    this.mainService.getData().subscribe((data) => {
      this.data = data;
      console.log('Data to show', this.data)
      this.authToken = localStorage.getItem('authToken');
      console.log('Token '+ this.authToken)
      this.dataSource=new MatTableDataSource(data)
    });
  }

  openDailog(){
    // console.log('working')
    this._matDailog.open(AddEditComponent)
  }

  editEmployee(data:any){
    this._matDailog.open(AddEditComponent,{data})
    console.log(data)
  }
  deleteUser(id:any){
    console.log('id is ', id )
    //api/clients/{client}

    this.mainService.deleteUser(id).subscribe(
      response => {
        // Handle the success response
        console.log('Client deleted successfully:', response);
      },
      error => {
        // Handle the error response
        console.error('Error deleting client:', error);
      }
    );
    this.mainService.updateData()

  }
}
