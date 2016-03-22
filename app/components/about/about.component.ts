// import {Component, View} from 'angular2/core';
// import {RouteParams} from 'angular2/router';

// @Component({
//     selector: 'about'
// })
// @View({
//     template: `
// 		Welcome to the about page! This is the ID: {{id}}
// 	`
// })
// export class About {
//     id: string;
//     constructor(params: RouteParams) {
//         this.id = params.get('id');
//     }

//     ngOnInit () {
//         console.log('hello `About` component');
//     }
// }

import {Component} from 'angular2/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  template: `patrick@AngularClass.com`
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }

}
