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

Note: index.jsx includes App.jsx, which in turn renders the components below, if required.

HomePage - The main component for the project. The HomePage will contain the search bar and two sections. 

Top50Secion - The first table, containing the top 50 strings pertaining to the users' search input. Top 50 currently determined by the number of occurences of the value searched by the user.

CompleteListSection - The second table, containing all the strings pertaining to the users' search input. A maximum of 100, a page size of 30 and buttons to navigate are provided in this section.

SentiSumTable (Not implemented) - A re-usable table component for the Top50Section & CompleteListSection.

### Basic flow

Upon launch senti-sum-search, the user will be directed to a webpage with the a navbar

### Run locally

Clone the project: git clone https://github.com/Nikhilnair48/senti-sum-search.git

Change directory: cd senti-sum-search

Install dependences: npm install

Run: npm start
