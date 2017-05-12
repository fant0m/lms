import {UserService} from "./users/shared/user.service";
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar } from '@angular/material';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TitleService } from './shared/title.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {
    title: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private location: Location,
        private snackBar: MdSnackBar,
        private titleService: TitleService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this.titleService.setTitle(event['title']);
                this.titleService.setDescription(event['description']);
            });

        this.titleService.title.subscribe((value: string) => {
            this.title = value;
        });
    }

    onLogout(): void {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
