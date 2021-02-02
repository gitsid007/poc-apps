import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserDataService {
    errorMsg = new Subject<any>();

    constructor(private http: HttpClient) { };

    postUserData(userData: {}) {
        this.http.post(
            'https://angular-demo-app-f62e7-default-rtdb.firebaseio.com/userdata.json',
            userData,
            { observe: 'response' }
        ).subscribe((response) => {
            console.log(response);
        }, (error) => {
            this.errorMsg.next(error.statusText);
        });
    }

    getUserData() {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('pretty', 'print');

        return this.http.get('https://angular-demo-app-f62e7-default-rtdb.firebaseio.com/userdata.json',
            {
                headers: new HttpHeaders({ "Sample-Header": "GET" }),
                params: queryParams
            }
        ).pipe(map(responseData => {
            const userDataList = [];
            for (let key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    userDataList.push({ ...responseData[key], id: key });
                }
            }
            return userDataList;
        }));
    }

    deleteUserData() {
        return this.http.delete('https://angular-demo-app-f62e7-default-rtdb.firebaseio.com/userdata.json');
    }

}