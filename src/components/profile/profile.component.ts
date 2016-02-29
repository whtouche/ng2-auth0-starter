import {Component, View} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp} from 'angular2-jwt';

@Component({
	selector: 'profile'
})
@View({
	template: `
	 <img src="{{profile.picture}}" style="width: 50px" /> {{profile.name}}
   <h2>Chuck quote of the day</h2>
   {{quote}}
	`
})
@CanActivate(() => tokenNotExpired())
export class Profile {
  profile: any;
  quote: any;

  constructor(public authHttp: AuthHttp) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.getSecretThing();
    this.testApi();
  }

  getSecretThing() {
    this.authHttp.get('http://localhost:3002/api/quote')
      .subscribe(
        data => {
          console.log(data.json());
        //   this.quote = data.json();
        },
        err => console.log(err),
        () => console.log('Complete')
      );
  }
  testApi() {
    this.authHttp.get('http://localhost:3002/api/todo')
      .subscribe(
        data => {
          console.log(data.json().data);
          this.quote = data.json().info;
        },
        err => console.log(err),
        () => console.log('Todo!')
      );
  }
}
