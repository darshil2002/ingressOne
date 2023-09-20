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

    onSubmit(){
    let formValue=this.formGroup.value;
    console.log(' data is +++++', formValue)
    if(this.formGroup.valid){
      this.mainServ.postEmployee(formValue).subscribe({
        next:()=>{
          // alert('employee added succsessfully ')
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
