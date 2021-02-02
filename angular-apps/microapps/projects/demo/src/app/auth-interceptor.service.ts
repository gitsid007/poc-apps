import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Provide In app module 
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Interceptor called');
        // Immutable hence clone
        const modifiedReq = req.clone({headers: req.headers.append('Auth', 'ABC-XYZ')});
        return next.handle(modifiedReq);
    }
}