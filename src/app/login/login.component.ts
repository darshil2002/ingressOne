import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { user, userMainData } from '../common.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data!: userMainData[];

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private mainService:MainServiceService,
              private router: Router
              ) {
    // Initialize the form 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginButtonClicked(){
    console.log(this.loginForm.value)

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.mainService.login(email, password).subscribe((response) => {
      console.log('API response:', response); 
      if(response.success){
        // alert('right password')
        localStorage.setItem('authToken', response.data.token);
        this.router.navigate(['/crud']);
      }
    },
    (error) => {
      alert('Invalid UserName or Password'); 
    }
    );
  }

  ngOnInit() {
    this.mainService.getData().subscribe((data) => {
      this.data = data;
      console.log('in ts', this.data)
    });
  }

}
