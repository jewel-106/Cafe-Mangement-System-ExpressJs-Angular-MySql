import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
   
    return this.httpClient.post(this.url + '/user/signup', data);
  }
  forgotPassword(data: any) {
    return this.httpClient.post(this.url + '/user/forgotPassword/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  login(data: any) {
    return this.httpClient.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  checkToken() {
    return this.httpClient.get(this.url + '/user/checkToken');
  }
  changePassword(data: any) {
    return this.httpClient.post(this.url + '/user/changePassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getUsers() {
    return this.httpClient.get(this.url + '/user/get');
  }
  update(data: any) {
    return this.httpClient.patch(this.url + '/user/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getUserDetails() {
    return this.httpClient.get(this.url + '/user/getUserDetails/');
  }

  verifyOtp(data: any) {
    return this.httpClient.post(this.url + '/user/verifyOtp', data);
  }

  resetPassword(data: any) {
    return this.httpClient.post(this.url + '/user/resetPassword', data);
  }

  updateProfile(data: any) {
    return this.httpClient.put(this.url + '/user/updateProfile', data);
  }
}
