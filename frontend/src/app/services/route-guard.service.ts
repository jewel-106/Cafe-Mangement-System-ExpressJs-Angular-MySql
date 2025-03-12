

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get expected roles from route data
    const expectedRoleArray = route.data.expectedRole;

    // Check if token exists
    const token: any = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    // Decode token
    let tokenPayload: any;
    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      console.error("Error decoding token:", err); // Debugging
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    // Check if user role is allowed
    const checkRole = expectedRoleArray.includes(tokenPayload.role);

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true; // Allow navigation
      }
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}


// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { ActivatedRouteSnapshot, Router } from '@angular/router';
// import { SnackbarService } from './snackbar.service';
// import {jwtDecode} from 'jwt-decode';
// import { GlobalConstants } from '../shared/global-constants';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService {

//   constructor(public auth:AuthService,public router:Router,private snackbarService:SnackbarService) { }

//   canActivate(route:ActivatedRouteSnapshot):boolean{
//     let expectedRoleArray = route.data;
//     expectedRoleArray = expectedRoleArray.expectedRole;

//     const token:any = localStorage.getItem('token');
//     var tokenPayload:any;
//     try{
//       tokenPayload = jwtDecode(token);
//     }catch(err){
//       localStorage.clear();
//       this.router.navigate(['/']);
//     }

//     let checkRole = false;

//     for(let i=0;i<expectedRoleArray.length;i++){
//       if(expectedRoleArray[i]==tokenPayload.role){
//         checkRole = true;
//       }
//     }

//     if(tokenPayload.role=='user' || tokenPayload.role == 'admin'){
//       if(this.auth.isAuthenticated() && checkRole){
//         return true;
//       }
//       this.snackbarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
//       this.router.navigate(['/cafe/dashboard']);
//       return false;
//     }
//     else{
//       this.router.navigate(['/']);
//       localStorage.clear();
//       return false;
//     }
//   }
// }
