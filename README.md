# questions
Questions full stack app

## What is this?
This is an app based on (so far, nearly identical to) the application built during the Pluralsight course 
"Building a full stack app with React and Express". 
https://app.pluralsight.com/library/courses/react-express-full-stack-app-building

I'm using this as a project to teach myself React, and specifically how a React application can make use of Express and set up authentication. So, I'm adding comments as I go, and making notes in this README about what I'm learning. 

## Structure of the application

* ***index.html*** has an element with the id "app" and a call to run bundle.js.
* ***webpack.config.js***, for the development mode, specifies an entry path of src/app/, an output path of dist/ and a filename of bundle.js with a public path of /.
* In src/app/, the default file ***index.jsx*** calls ReactDOM.render, passing in Main (from Main.jsx) and the element with the id "app".
* ***Main.jsx*** sets up a Router (with a history), a Provider (with a store), includes ConnectedNavigation, and establishes several Routes, including /dashboard and /task/:id.

## Redux helps us manage state
As it says on the React Redux website: React Redux "lets your React components read data from a Redux store, and dispatch actions to the store to update data."

* The ***Provider*** API mentioned above makes the Redux store available to the app.
* The ***connect*** function takes two arguments: mapStateToProps and mapDispatchToProps, both optional. It returns a function, and when you run that function on a component (such as TaskList) you get a connected component (such as ConnectedTaskList).
  * mapStateToProps describes which part of the store's data the component needs
  * mapDispatchToProps "is used for dispatching actions to the store". 

Here's an interesting blog article about mapDispatchToProps in function form or in object form: https://daveceddia.com/redux-mapdispatchtoprops-object-form/

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
### 1. Encountered two children with the same key

This bug was so clear in hindsight:

    Warning: Encountered two children with the same key, `{group.id}`. Keys should be unique so that components maintain their identity across updates.

I had key="{groupId}" instead of key={groupId} (it shouldn't have quotation marks). 

### 2. When to use curly braces on import?

I realized as I was following along with the Pluralsight tutorial that I didn't know why the presenter was sometimes using curly braces at import and sometimes not. Here's a good explanation: http://2ality.com/2014/09/es6-modules-final.html

### 3. Router

The tutorial doesn't really explain what "match" is or where it comes from (used in TaskDetail.jsx). I found a pretty good page on it (and other features of React's Router) here:
https://medium.freecodecamp.org/hitchhikers-guide-to-react-router-v4-4b12e369d10
