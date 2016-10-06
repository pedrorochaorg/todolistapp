# Todo List Exercise


Todo List Exercise is the name given to an skill test exercise developed by Pedro Rocha during it's free time.
This exercise is based in the popular framework Express powered by the powerfull NodeJS Programing language. The versions used to build and necessary to run this exercise are:

  - [NodeJS 4.4.7][nodejs]
  - [NPM 3.10.5][npm]
  - [Bower][bower]
  - [Gulp][gulp]
  - [Compass][compass]
  - [Ruby][ruby]
  - [MongoDB][mongo]

Has requested by the test examinatores, this exercise has to be able to :

  - Add, Edit, Remove Users through a REST API;
  - List todos ordered by their groups,
  - Add, Remove, Edit, Close todos.
  - Propagate changes in real time to all connected users


### Development Notes,
The API has been built on top of Express Framework .
The AngularJS webapp has been scafolded using [Yeoman][yo] with the Angular [generator][yoangular].



## Aplication Folder Structure

This folder has the following structure ( Only folders that have been modified will be referenced, all others are just Scafolded by the default by the generatores ):
  - `app` ( NodeJS Express App Files )
    -  `controllers` ( Express Routes/Controllers )
        -  `api.js` ( Contains all API routes and Controllers )
        -  `index.js` ( Routes/Controllers that render the website index page ( todo dashboard ) )
        -  `login.js` ( Routes/Controllers that render the login view and methods to login the users )
        -  `logout.js` ( Routes/Controllers that render the logout view and methods to logout the users )
    -  `models` ( Mongoose MongoDB Models )
        -  `Todo.js` ( Todo Mongoose MongoDB Data Model  )
        -  `User.js` ( User Mongoose MongoDB Data Model  )
    -  `views` ( APP Views )
        -  `error.ejs` ( Error message view template  )
        -  `footer.ejs` ( Template/View part, contains all the HTML needed to end each app view )
        -  `header.ejs` ( Template/View part, contains all the HTML needed to init each app view )
        -  `index.ejs` (  Template/View part, contains all the HTML of the TODO view )
        -  `login.ejs` (  Template/View part, contains all the HTML of the Login view )
 - `config` (APP Config files, and Express initialization code)
    -  `config.js` ( APP setup settings )
    -  `express.js` ( Express Framework initialization )
 - `docs` (APIDOCJS auto generated folder, containing API Documentation/User Manual)
 - `public` (Contains all static files to be served by express)
    -  `bower_components` ( Bootstrap Assets )
    -  `images` ( App image Files )
    -  `scripts` ( App Javascript Files )
        -  `vendor.564a3fab.js` ( Third Party Minified Javascript Libraries )
        -  `scripts.6082fa41.js` ( Application Javascript Files )
    -  `styles` ( App CSS Files )
        -  `vendor.d41d8cd9.css` ( Third Party Minified CSS Classes )
        -  `main.56b31c3f.css` ( Application CSS Classes )
    -  `404.html` ( 404 Error page )
    -  `favicon.ico` ( Favicon )
    -  `robots.txt` ( Robots file )
 - `webappdev` ( Web APP Development Files )
    -  `app` ( Web APP scripts, styles, images and views )
        -  `images` ( Folder containg the webapp image assets )
        -  `scripts` ( Folder containing the webapp Angular JS Files )
            -  `controllers` ( Folder containing the webapp Angular JS Controllers )
                -  `createtodo.js` ( Controller that enables todo Creation )
                -  `todolist.js` ( Controller that contains all needed actions and methods for a todo list )
            -  `directives` ( Folder containing the webapp Angular JS Directives )
                -  `jsondata.js` ( Parse JSON Data from script file into angular $scope  )
            -  `services` ( Folder containing the webapp Angular JS Services )
                -  `apidata.js` ( This service is responsible for all the Communications between this webapp and our API. This service returns a promisse for each method )
                -  `socket.js` ( This service is responsible for creating a socket.io connection with the server to receive real time data updates )
            -  `app.js` ( AngularJS APP Startup   )
        -  `styles` ( WebAPP SCSS Files )
            -  `main.scss` ( WebAPP SCSS main File )
        -  `favicon.ico` ( Web APP Favicon )
        -  `404.html` ( 404 Error page )
        -  `index.html` ( WebAPP Main Index File )
        -  `login.html` ( WebAPP Login Page File )
        -  `robots.txt` ( Robots file )
    -  `.bowerrc` ( Bower repository settings )
    -  `.gitattributes` ( Git encoding attributes )
    -  `.gitignore` ( Git ignore settings )
    -  `.jscsrc` ( ... )
    -  `.jshintrc` ( jshint settings file )
    -  `.yo-rc.json` ( Yeoman install settings )
    -  `bower.json` ( Bower Dependencies file )
    -  `Gruntfile.js` ( Grunt CLI tasks )
    -  `package.json` ( NodeJS NPM package list)
 -  `.bowerrc` ( Bower repository settings )
 -  `.gitignore` ( Git ignore settings )
 -  `bower.json` ( Bower Dependencies file )
 -  `app.js` ( App Startup Script )
 -  `gulpfile.js` ( Gulp CLI tasks )
 -  `package.json` ( NodeJS NPM package list)

##Installing Dependencies
This app requires some dependencies to run properly, Express is on of them.
To install all dependecies run the following in your bash , inside the project root folder:


```sh
$ npm install
```



##Databases
This app requires the use of a MongoDB database, for the app to run you have to install MongoDB and run it, the server must allow connections from anonymous users.



## Running the APP

To start the webserver and run the app, just type the following in your shell, while located on your app's root folder:

```sh
$ gulp
```

And finaly open the following url in your browser

 - [http://localhost:3000][localhost]

Please notice that your firewall may block this communication, allow communications on the port 3000.


##WebSite Development Notes
To run the WebAPP in development mode, you are required to do a couple of more initialization steps.
The WebAPP uses bower to manage it's dependencies, and requires some NPM Modules to be built and tested.

###Dependencies

  - [NodeJS 4.4.7][nodejs]
  - [NPM 3.10.5][npm]
  - [Bower][bower]
  - [Grunt][grunt]
  - [Compass][compass]
  - [Ruby][ruby]

To install some of these dependecies ( Grunt, Bower, Compass *( Ruby First! )* ), you have to open your shell inside the Project Root folder and type the following command:


```sh
$ cd webappdev
$ npm install -g grunt-cli bower
$ gem install compass

```

###Setup Dev Environment

After installing the dependecies listed above, you need to run the following commands:

Installs all required npm modules

```sh
$ npm install
```

Installs all required bower dependencies

```sh
$ bower install --save
```

###Run Dev Server
To run the webserver and see the APP Running, type in the <Project Root>/webappdev:

```sh
$ grunt serve
```

###Building the Website
To build the website you need to run the following grunt task

```sh
$ grunt build
```

Please note that changes made on the index.html and login.html file, have to be manually merged with the files present at <ProjectRoot>/app/views/ , this files contain ejs template tags that allow the webapp to work with server data.







License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [mongo]: <https://www.mongodb.com/>
   [yo]: <http://yeoman.io>
   [yoangular]: <https://github.com/yeoman/generator-angular#readme>
   [localhost]: <http://localhost:3000>
   [nodejs]: <https://nodejs.org/en/>
   [npm]: <https://www.npmjs.com/>
   [bower]: <https://bower.io/>
   [gulp]: <http://gulpjs.com/>
   [grunt]: <http://gruntjs.com/>
   [compass]: <https://rubygems.org/gems/compass/versions/1.0.3>
   [ruby]: <http://rubyinstaller.org/downloads/>
