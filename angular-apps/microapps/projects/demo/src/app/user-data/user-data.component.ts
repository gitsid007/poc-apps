import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Component({
    selector: 'user-data-component',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, OnDestroy {

    userDataForm: FormGroup;

    statesList: any = ['Florida', 'New Jersey', 'Iowa', 'Texas'];
    forbiddenUserNames: any = ['test', 'abc'];
    userDataView: any = [];
    isLoading: boolean = false;
    errorMessage = null;

    private errorSub: Subscription;

    constructor(private http: HttpClient, private userDataService: UserDataService) { };

    ngOnInit() {
        // Subject - errorMsg
        this.errorSub = this.userDataService.errorMsg.subscribe((errorMsg) => {
            this.errorMessage = errorMsg;
        });

        this.userDataForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
                'address1': new FormControl(null, [Validators.required]),
                'address2': new FormControl(null, [Validators.required]),
                'city': new FormControl(null, [Validators.required]),
                'state': new FormControl(null, [Validators.required]),
                'zipcode': new FormControl(null, [Validators.required])
            })
        });
    }

    onSubmitUserData() { }


    onGetUserData() {
        this.isLoading = true;
        this.userDataService.getUserData().subscribe((userInfo) => {
            this.isLoading = false;
            this.userDataView = userInfo;
        }, (error) => {
            this.errorMessage = error.statusText;
        });
    }

    onDeleteUserData() {
        this.userDataService.deleteUserData().subscribe(() => {
            this.userDataView = [];
        })
    }

    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }


    // custom validation
    forbiddenNames = (control: FormControl): { [s: string]: boolean } => {
        if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
            return { 'nameIsForbidden': true };
        } else {
            return null;
        }
    }


    // Form Array
    // getControls() {
    //   return (<FormArray>this.signupForm.get('hobbies')).controls; 
    // }

    // Form Array
    // onAddHobby() {
    //   const controls = new FormControl(null, Validators.required);
    //   (<FormArray>this.signupForm.get('hobbies')).push(controls);
    // }

}