import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.authService.isLoggedIn();

        if(isLoggedIn){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
        }
        console.log("Inside JwtInterceptor");
        return next.handle(req);
    }
}