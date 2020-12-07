import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header.js';
import Search from './Search.js';



// Create a reusable header containing a search bar, receiving the user's input of location/city
// inside the header will contain 2 radio submits that will take the user's radius and school type

// create a axios call to the API inside a event listener (button), using the user's Input as a parameter for the location
// The axios call will you use the parameter "category" with the value schools, to get the majority of universities/colleges and trade schools

// create a navigation bar that contains a link to favourite schools and add new school

// create a results section that will contain the search results from the city/location user's input
// stretch goal, create a map that will show the different schools(possibly google maps?)
// create an event function that allows for schools in the search results to be added to a favouriteList array

// create a component called FavouriteSchools and display the schools that are listed in the favouriteList array
// display the details name, address, 



class App extends Component {
  render() {
    return(
      <Router>
        
        <Header />

        {/* <Route exact path="/" component={SearchResults} /> */}

        {/* <Route exact path="/school/:schoolID" component={SchoolDetails} /> */}
        


        <Search />
      </Router>
    )
  }
}


export default App;
