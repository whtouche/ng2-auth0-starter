
import {Component, View, bind} from 'angular2/core';
import {ROUTER_PROVIDERS, RouterOutlet, RouteConfig, RouterLink, Location} from 'angular2/router';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import { Todo } from './components/todo/todo';
import { About } from './components/about/about';
import { Profile } from './components/profile/profile';

declare var Auth0Lock;

@Component({
    selector: 'my-app'
})
@View({
    // templateUrl: './app/app.html',
    template: `
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button"
                            class="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">ng2 play</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li [class.active]="isActive('')">
                            <a [routerLink]="['/Home']">Todo</a>
                        </li>
                        <li [class.active]="isActive('/about/Hello world')">
                            <a [routerLink]="['/About', {'id': 'Hello world'}]">About</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li *ngIf="loggedIn()" [class.active]="isActive('/profile')">
                            <a [routerLink]="['/Profile']">Profile</a>
                        </li>
                        <li>
                            <a href="#" *ngIf="!loggedIn()" (click)="login()">Login</a>
                        </li>
                        <li>
                            <a href="#" *ngIf="loggedIn()" (click)="logout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    { path: '/', component: Todo, as: 'Home' },
    { path: '/about/:id', component: About, as: 'About' },
    { path: '/profile', component: Profile, as: 'Profile' }
])
export class AppComponent {
    lock = new Auth0Lock('d6c1qdPMNTL71HE70YeeGevhW9cnIhin', 'whtouche.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    constructor(location: Location) {
        this.location = location;
    }

    login() {
        var self = this;
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            console.log(
                this.jwtHelper.decodeToken(id_token),
                this.jwtHelper.getTokenExpirationDate(id_token),
                this.jwtHelper.isTokenExpired(id_token)
            );

            self.loggedIn();
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        this.loggedIn();
    }

    loggedIn() {
        return tokenNotExpired();
    }

    isActive(path) {
        return this.location.path() === path;
    }
}