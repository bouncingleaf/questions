# questions

## What is this?
This is an app based on the application built during the Pluralsight course 
"Building a full stack app with React and Express". 
https://app.pluralsight.com/library/courses/react-express-full-stack-app-building

I'm using this as a project to teach myself React, and specifically how a React application can make use of Express and set up authentication. 

This README includes: 
* Requirements for running locally
* An overview of the structure of the application
* Packages used, and why
* Notes about what I'm learning

## Requirements for running locally

### Node and NPM

1. Run ***npm install*** from the top level folder. This will install the dependencies. 
2. Run ***npm run start-dev***. This will start both the back end server (on port 7777) and front end server (on port 8080)

### MongoDB

You will need a local MongoDB instance with a database called pluralsight, running as mongodb://localhost:27017/pluralsight.

For Windows, start MongoDB by navigating to the folder where MongoDB is installed, opening a command line, and executing ***mongod.exe***.

Initialize the database by running ***npm run initialize***. This will take the data from the csv and load it into the MongoDB database. 

## Structure of the application

* ***index.html*** has an element with the id "app" and a call to run bundle.js.
* ***webpack.config.js***, for the development mode, specifies an entry path of src/app/, an output path of dist/ and a filename of bundle.js with a public path of /.
* In src/app/, the default file ***index.jsx*** calls ReactDOM.render, passing in Main (from Main.jsx) and the element with the id "app".
* ***Main.jsx*** sets up a Router (with a history), a Provider (with a store), includes ConnectedNavigation, and establishes several Routes, including /dashboard and /task/:id.

## Packages used

### Dev dependencies:
 * babel - JavaScript compiler, including converting React JSX syntax
 * body-parser - for POST http requests
 * concurrently - to start up the web server and the front end dev server simultaneously
 * cors - cross origin request security
 * eslint - linter
 * express - receive http requests on the back end
 * mongodb - database
 * webpack - bundling

### Production dependencies
 * axios - sending http requests from the front end
 * history - manage browsing history
 * md5 - authentication
 * react - front end
 * redux - state management
 * saga - side effect management tool - allows us to mock back end
 * uuid - random id generator

## Lessons learned along the way

### 1. Redux helps us manage state
I hadn't worked with Redux before, so I wanted to make a quick summary of what I learned:

As it says on the React Redux website: React Redux "lets your React components read data from a Redux store, and dispatch actions to the store to update data."

* The ***Provider*** API mentioned above makes the Redux store available to the app.
* The ***connect*** function takes two arguments: mapStateToProps and mapDispatchToProps, both optional. It returns a function, and when you run that function on a component (such as TaskList) you get a connected component (such as ConnectedTaskList).
  * mapStateToProps describes which part of the store's data the component needs
  * mapDispatchToProps "is used for dispatching actions to the store". 

Here's an interesting blog article about mapDispatchToProps in function form or in object form: https://daveceddia.com/redux-mapdispatchtoprops-object-form/

### 2. Encountered two children with the same key

This bug was so clear in hindsight:

    Warning: Encountered two children with the same key, `{group.id}`. Keys should be unique so that components maintain their identity across updates.

I had key="{groupId}" instead of key={groupId} (it shouldn't have quotation marks). 

### 3. When to use curly braces on import?

I realized as I was following along with the Pluralsight tutorial that I didn't know why the presenter was sometimes using curly braces at import and sometimes not. Here's a good explanation: http://2ality.com/2014/09/es6-modules-final.html

### 4. Router

The tutorial doesn't really explain what "match" is or where it comes from (used in TaskDetail.jsx). I found a pretty good page on it (and other features of React's Router) here:
https://medium.freecodecamp.org/hitchhikers-guide-to-react-router-v4-4b12e369d10

### 5. Node, NPM, and Heroku
I had a discussion with a very helpful Puralsight'r here:
https://app.pluralsight.com/library/courses/react-express-full-stack-app-building/discussion

The short version of that discussion: My deploy to Heroku wasn't working. It would deploy but then immediately crash on the heroku side. I tracked it down to this: I had specified (in package.json) the version of Node that I was using locally, and this turned out to be a higher version of Node than the instructor was using in the React course. Somewhere between his version and mine, something had changed that was causing the deploy to Heroku to stop working. I narrowed it down to Node 10.9.0 vs. Node 10.10.0, which also happens to be where a change in the default version of NPM was made. So, this project is running Node 10.9.0, even though that is not the latest version available.