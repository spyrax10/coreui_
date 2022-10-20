import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Users } from '../_services/user.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public user: Users, private authService: AuthService) { }
    canActivate() {
        if (this.user.getCurrentUser() && this.authService.isAuthenticated$){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}