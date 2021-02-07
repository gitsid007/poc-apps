import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    signupForm: FormGroup;
    error: String = null;
  
    constructor(private authService: AuthService, private router: Router) {};
  
    ngOnInit() {
  
      this.signupForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
          'password': new FormControl(null, [Validators.required])
      });
    }

  
    onSubmit() {
    //   console.log("FORM", this.signupForm.value);
      // POST Request
    this.authService.signUp(this.signupForm.value).subscribe((responseData) => {
        console.log("RESPONSE", responseData);
        this.router.navigate(['/survey']);
    }, (errorMessage) => {
        this.error = errorMessage;
    });
     this.signupForm.reset();
    }


        // custom async validation
        forbiddenEmails = (control: FormControl): Promise<any> | Observable<any> => {
            const promise = new Promise<any>((resolve, reject) => {
              setTimeout(() => {
                if (control.value === "test@gmail.com") {
                  resolve({ 'emailIsForbidden': true });
                } else {
                  resolve(null);
                }
              }, 1500)
            })
            return promise;
          }
  
}