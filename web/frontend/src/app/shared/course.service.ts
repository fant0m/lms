import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { UserService } from "../users/shared/user.service";
import {Course} from "./course";
import {Lesson} from "./lesson";

@Injectable()
export class CourseService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private url = 'http://localhost:8000/';

    constructor(private http: Http, private userService: UserService) { }

    getAdminCourses(): Promise<Course[]> {
        this.createAuthHeaders();

        return this.http
            .get(this.url + 'api/courses', {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(this.handleError);
    }

    getCourses(): Promise<Course[]> {
        this.createHeaders();

        return this.http
            .get(this.url + 'courses', {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(this.handleError);
    }

    getCourse(slug: string): Promise<Course> {
        this.createHeaders();

        return this.http
            .get(this.url + 'courses/' + slug, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    getLesson(id: number): Promise<Lesson> {
        this.createAuthHeaders();

        return this.http
            .get(this.url + 'api/lessons/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Lesson)
            .catch(this.handleError);
    }

    enroll(id: number): Promise<any> {
        this.createAuthHeaders();

        return this.http
            .get(this.url + 'api/enroll/' + id, {headers: this.headers})
            .toPromise()
            .then(response => response.json().message)
            .catch(this.handleError);
    }

    postComment(id: number, text: string): Promise<any> {
        this.createAuthHeaders();
        const data = JSON.stringify({'text': text});

        return this.http
            .post(this.url + 'api/comment/' + id, data, {headers: this.headers})
            .toPromise()
            .then(response => response.json().message)
            .catch(this.handleError);
    }

    create(form: any, file: File): Promise<any> {
        this.createAuthHeaders();
        this.headers.append('Accept', 'application/json');

        let formData: FormData = new FormData();
        formData.append('image', file, file.name);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);

        for (let i = 0; i < form.lessons.length; i++) {
            formData.append('lessons[' + i + '][title]', form.lessons[i].title);
            formData.append('lessons[' + i + '][content]', form.lessons[i].content);
        }

        return this.http
            .post(this.url + 'api/courses', formData, {headers: this.headers})
            .toPromise()
            .then(response => response.json().message)
            .catch(this.handleError);
    }

    private createAuthHeaders(): void {
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.userService.getToken());
    }

    private createHeaders(): void {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}
