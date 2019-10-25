## senti-sum-search

### Purpose

The project is aimed to provide a demonstrable single page application using the public API made available by SentiSum.

### Technologies

Front end: ES6 + ReactJS + Redux
Bundler: Webpack
Runtime environment: Node.js

### Project structure

The project structure follows a standard one used in ReactJS + Redux.
package.json - project configuration
webpack.config.js - webpack configuration
public/ - files to be made publically available
src/ - codebase containing the core to render the project. Directories starting with "_" (Ex: _actions) are redux modules to handle events in the app. All other directories are redux components. index.js is the starting point in this directory.
README.md - you're reading me!

### (High level) Design

HomePage - The main component for the project. The HomePage will contain the search bar and two sections. 
Search Bar - An input field with a button that triggers the API invocation
Top50Secion - The first table, containing the top 50 strings pertaining to the users' search input
CompleteListSection - The second table, containing all the strings pertaining to the users' search input
SentiSumTable - A re-usable table component for the Top50Section & CompleteListSection

Redux design:
actions - search, tableNavigation
constants - search, tableNavigation

