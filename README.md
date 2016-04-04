## Angular 2 Auth0 Express MongoDB CRUD Starter

This repo uses Angular 2 Beta 3.

### Getting Started

Go to [Auth0](https://auth0.com/) and create a new application (you'll need to create an account if you don't already have one - it's free)

The information you need can be found under the "Settings" tab after you create a new app - it will look like this:

![Auth0 Screenshot](app/assets/images/ng2-auth0-crud-starter.png)

Add your [Auth0](https://auth0.com/) account information to the following files:

#### Auth0.json

- secret = Client Secret
- audience = Client ID

#### app.ts

- On the "lock = new Auth0Lock" line, add your 'Client ID' and 'Domain'


Install the dependencies:

    $ npm install

Compile the TypeScript into JavaScript and create the bundle:

    $ npm run build

In **_separate_** terminal windows, run the mongo daemon, start the Express server, and start the webpack-dev-server:

    $ mongod
    $ npm run serve
    $ npm start

Navigate to [http://localhost:3000/](http://localhost:3000/)

## Contributing

Do you want to help? That would be great - this is still a work in progress. Check out the [issues](https://github.com/whtouche/ng2-auth0-starter/issues), there are definitely some things that I haven't figured out yet. Pull requests are welcome and encouraged.

## Acknowledgements

This project owes a ton to Ajden Towfeek, please check out his YouTube channel for some of the best instructional videos on Angular 2 that I have found:
- [https://www.youtube.com/channel/UCDS3sAwfomuOa0hRvd9De7A](https://www.youtube.com/channel/UCDS3sAwfomuOa0hRvd9De7A)
- [https://github.com/ajtowf](https://github.com/ajtowf)
- [https://twitter.com/ajtowf](https://twitter.com/ajtowf)
- [https://www.pluralsight.com/authors/ajden-towfeek](https://www.pluralsight.com/authors/ajden-towfeek)

## License

[WTFPL](LICENSE.md)