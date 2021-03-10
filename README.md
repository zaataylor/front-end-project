# Front End Project

## Overview
Create an application to retrieve food truck information for the Charlotte area. Please find the requirements outlined below. These are just basic guidelines and extra features are always encouraged. Please use your best judgement for how to design and implement it.

## Requirements
### Language
Choose either AngularJS or ReactJS to build this project. Finish one of the below courses or any other courses you find relevant before attempting the project. As certain features will require the use of a state management library, below the course references you will find documentation for a suggested library.
- [AngularJS Course](https://frontendmasters.com/courses/angular-9/)
  - [NgRX Documentation](https://ngrx.io/docs)
- [ReactJS Course](https://frontendmasters.com/courses/complete-react-v5/)
  - Functional components with React Hooks lead to simpler, cleaner code. Many projects are now utilizing this pattern instead of traditional                           React Class components, so it is very beneficial to become familiar with these.
    - [Intro to React Hooks](https://reactjs.org/docs/hooks-intro.html)
    - [React Hooks Cheat Sheet](https://www.freecodecamp.org/news/react-hooks-cheatsheet)
    - [Converting class components to functional components](https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks)
  - [Redux Documentation](https://redux.js.org/basics/basic-tutorial/)

### Basics 
<i>Yelp API</i>
- Setup a Yelp API Account
- Fetch food truck data from Yelp API by sending “food truck” as a search parameter

<i>Login and Signup</i>
- There should be an authentication system included in the form of login or signup pages/modals that will store users credentials 
- User will not be able to navigate to other pages until the user has been logged in
- This can be approached in several ways. Recommended :
  - Firebase db to store login credentials
  - Google OAuth

<i>Map Visualization</i>
- Find a suitable map library for visualizing the locations of the food trucks on a map in the browser
- Visualize Yelp API food trucks locations on the map with some kind of marker (dot, pin, logo)
- Map points are clickable and open a page or popup with food truck information Yelp provides
- Give a path for the user to return to the map view from food truck view without clicking back button
- The map should be draggable and results should refresh upon dragging

<i>Search and Filter</i>
- Add a search function based on name, cuisine type, etc.
- Add filter that can hide or show depending on name, cuisine type, etc.
  - This can be switches, search boxes, check boxes, etc.

<i>Favorites List</i>
- Give the user the option to favorite specific food truck from the food truck view
- Display favorite marker in the food truck view if a particular food truck is already in the favorites list
- Maintain the favorites list in the application state with a state management library
  - Do not store them in a database or file
- Create a page that lists favorites
  - User can add or remove favorites from this page
  
<i>Mobile Responsiveness</i>
- This application should be responsive to a number of different screen sizes
  - Tablets: 1024x768
  - Mobile: 360x640

<i>Unit Testing</i>
- There should be an appropriate amount of unit testing to ensure that all aspects of the application are working properly and to discover and address any potentially problematic edge cases.
  - Recommended Frameworks for React: Jest, Mocha
  - Recommended Frameworks for Angular: Jasmine
  
<i>Documentation</i>
- Documentation should be included
  - Providing an explanation of the uses of the application
  - Detailing how to start up and navigate the application
## Things We Do Not Expect
- We do not expect this application to be visually well-designed, though it should be functional. 
