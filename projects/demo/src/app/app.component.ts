import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['test', 'abc'];

  constructor(private formBuilder: FormBuilder) {};

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        'password': new FormControl(null, [Validators.required]),
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'address1': new FormControl(null, [Validators.required]),
        'address2': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'zipcode': new FormControl(null, [Validators.required])
        })
    });
  }

  // Form Array
  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls; 
  // }

  // custom validation
  forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
    return null;
    }
  }

  // custom async validation
  forbiddenEmails = (control: FormControl): Promise<any> | Observable<any> => {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( () => {
        if(control.value === "test@gmail.com") {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      },1500)
    })
    return promise;
  }

  // Form Array
  // onAddHobby() {
  //   const controls = new FormControl(null, Validators.required);
  //   (<FormArray>this.signupForm.get('hobbies')).push(controls);
  // }

  onSubmit() {
    console.log(this.signupForm, "FORM");
  }
}
