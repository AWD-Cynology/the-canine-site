import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    public constructor(private authService: AuthService){}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.authService.isLoggedIn();

        if(isLoggedIn){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
        }
        
        return next.handle(req);
    }
}