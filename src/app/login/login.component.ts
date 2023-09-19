import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { user, userMainData } from '../common.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data!: userMainData[];

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private mainService:MainServiceService) {
    // Initialize the form and add form controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginButtonClicked(){
    console.log(this.loginForm.value)
  }

  ngOnInit() {
    this.mainService.getData().subscribe((data) => {
      this.data = data;
      console.log('in ts', this.data)
    });
  }

}
