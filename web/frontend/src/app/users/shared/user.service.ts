import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User} from "./user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private url = 'http://localhost:8000/';
    private user: User;

    constructor(private http: Http) {
        this.user = this.getUser();
    }

    register(email: string, username: string, password: string): Promise<any> {
        const data = JSON.stringify({'email': email, 'username': username, 'password': password});
        return this.http
            .post(this.url + 'register', data, {headers: this.headers})
            .toPromise()
            .then(response => {
                const result = response.json();
                this.setToken(result.token);
                return result.message;
            })
            .catch(this.handleError);
    }

    login(email: string, password: string): Promise<any> {
        let h = new Headers();
        h.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = new URLSearchParams();
        body.set('_username', email);
        body.set('_password', password);

        return this.http
            .post(this.url + 'login', body.toString(), {headers: h})
            .toPromise()
            .then(response => {
                const result = response.json();
                this.setToken(result.token);
                return result.message;
            })
            .catch(this.handleError);
    }

    getUserInfo(): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.getToken());

        return this.http
            .get(this.url + 'api/user', {headers: headers})
            .toPromise()
            .then(reponse => reponse.json())
            .catch(this.handleError);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
        this.user = this.getUser();
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        let payload;

        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        if (this.isLoggedIn()) {
            if (this.user.roles.indexOf('ROLE_ADMIN') > -1) {
                return true;
            }
        }

        return false;
    }

    getUser(): User {
        if (this.isLoggedIn()) {
            const token = this.getToken();
            const payload =  window.atob(token.split('.')[1]);
            const obj = JSON.parse(payload);

            return new User(obj.email, obj.username, obj.roles);
        }

        return null;
    }

    logout() {
        localStorage.removeItem('token');
        this.user = null;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}