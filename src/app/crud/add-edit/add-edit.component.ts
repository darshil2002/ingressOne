import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MainServiceService } from 'src/app/main-service.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {

  formGroup!:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _dailogRef:DialogRef<AddEditComponent>,
    private mainServ:MainServiceService
    ){}
    // @Inject(MAT_DIALOG_DATA) public data: any

    formatDate(inputDate: any) {
      // console.log('input date is', inputDate);
    
      if (inputDate instanceof Date) {
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        // console.log('formatted date is', formattedDate);
        return formattedDate;
      } else {
        // console.error('Invalid inputDatE');
        return ''; 
      }
    }
    
    
    onSubmit(){
    let formValue=this.formGroup.value;
    formValue.birth_date= this.formatDate(formValue.birth_date)
    // console.log('date val is',formValue.birth_date)
   
    if(this.formGroup.valid){
      this.mainServ.postEmployee(formValue).subscribe({
        next:()=>{
          // alert('employee added !')
          this._dailogRef.close()
          this.mainServ.updateData()
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      name:'',
      last_name:'',
      address:'',
      birth_date:'',
      phone:'',
      education:'',
      email:'',
    })
    
    // this.formGroup.patchValue(this.data)
  }

  closeDailog(){
    this._dailogRef.close()
  }
}
