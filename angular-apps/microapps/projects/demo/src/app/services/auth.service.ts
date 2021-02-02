import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from "rxjs/Operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    kind: String;
    idToken: String;
    email: String;
    refreshToken: String;
    expiresIn: String;
    localId: String;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { };

    signUp(data: any) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwwQnDb6PkZC6LvZxgW9fnidPxWOeGuRA',
            {
                email: data.email,
                password: data.password,
                returnSecureToken: true
            }
        )
        .pipe(catchError((errorResponse) => {
            if (errorResponse) {
                let errorMessage = 'Authentication Failed !!'
                return throwError(errorMessage);
            }
        }
        ));
    }
}