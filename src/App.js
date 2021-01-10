import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
// adding react scroll library
import { animateScroll as scroll, scroller } from "react-scroll";
import Swal from 'sweetalert2';
import axios from 'axios';
import firebase from './Firebase.js';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import './App.css';
import AddSchool from './AddSchool';
import Favourites from './Favourites.js';
import Footer from './Footer.js';


let city = "";
let country = "";

class App extends Component {
  constructor() {
    super();

    this.state = {
      schoolResults: [],
      favourites: [],
      radius: '',
      schoolTypeId: '',
      cityInput: '',
      countryInput: '',
      formattedAddress: [],
      newSchool: [],
      favouriteLength: '',
      isActive: false,
      directMeHome: false
    }
  }

// scroll to element function
 scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

 getData = () => {
  //Grab data from API
   this.apiCall();
  //Grab data from firebase
   this.fireBaseCall();
  //  scrolls to search results when API call is made
  this.scrollTo();
 }


 handleSubmit = (e) => {
   e.preventDefault();
   this.getData();
   this.setState({
     directMeHome: true
   })
 }

 handleSchoolType = (e) => {
   this.setState({
     schoolTypeId: e.target.value
   })
 }

 handleRadius = (e) => {
   this.setState({
     radius: e.target.value
   })
 }

 handleCityInput = (e) => {
  this.setState({
    cityInput: e.target.value
  })
 }

 handleCountryInput = (e) => {
   this.setState({
     countryInput: e.target.value
   })
 }

  fireBaseCall() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      const newSchoolObject = firebaseDataObj.NewSchools;

      // create and store usable, formatted firebase data 
      let newSchoolArray = formatFirebaseData(newSchoolObject);
      // convert and store API school type id (long alphanumeric string) to english school type for usable comparison
      let userSchoolType = this.convertCategoryIdToName();

      // filter firebase formatted school data by comparing school type with usr chosen school type and return results in an array
      const filteredNewSchoolArray = this.compareUserInputAndCreateResultsArray(newSchoolArray, userSchoolType);

      //store results in state
      this.setState({
        newSchool: filteredNewSchoolArray
      });
    });
    // store in variables to pass as props
    city = this.state.cityInput;
    country = this.state.countryInput;
  }

  compareUserInputAndCreateResultsArray(newSchoolArray, userSchoolType) {
    return newSchoolArray.filter((object => {

      //  making inputs and comparison case sensitive
      const addedSchoolCity = object.schoolAddress[1].toLowerCase();
      const addedSchoolCountry = object.schoolAddress[2].toLowerCase();
      
      return ((object.schoolType === userSchoolType) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()) && addedSchoolCountry.includes(this.state.countryInput.toLowerCase())) || ((object.schoolType === userSchoolType) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()))
    })
    );
  }

  convertCategoryIdToName() {
    let userSchoolType = '';
    if (this.state.schoolTypeId === '4bf58dd8d48988d1ae941735') {
      userSchoolType = 'University';
    } else if (this.state.schoolTypeId === '4bf58dd8d48988d1a2941735') {
      userSchoolType = 'Community College';
    } else if (this.state.schoolTypeId === '4bf58dd8d48988d1ad941735') {
      userSchoolType = 'Trade School';
    }
    return userSchoolType;
  }

  // API call function which draws data from the API and handles errors if data is not found 
  apiCall() {
    axios({
      method: 'GET',
      responseType: 'json',
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: 'SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF',
        client_secret: 'EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF',
        near: this.state.cityInput + " " + this.state.countryInput,
        categoryId: this.state.schoolTypeId,
        radius: this.state.radius,
        v: 20201205
      }
    }).then((res) => {
      const dataArray = res.data.response.venues;


      const filteredArray = ourCategoryFilter(dataArray);



      this.setState({
        schoolResults: filteredArray,
        isActive: true
      });

    }).catch((err) => {
      this.setState({
        isActive: false
      });
      Swal.fire({
        title: "No schools found",
        text: "Please Try Another City and Province/Country",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
  }




  render() {
    return(
      <Router>
        
        <Header
        schoolHandler={this.handleSchoolType}
        radiusHandler={this.handleRadius}
        handleCityInput={this.handleCityInput}
        handleCountryInput={this.handleCountryInput}
        submitHandler={this.handleSubmit}
        />
        <div className="wrapper">
        {this.state.isActive 
            ? <Route exact path="/searchResults" render={() => {
          return (
            <>
            <SearchResults 
              schoolResults = {this.state.schoolResults}
              schoolsAdded = {this.state.newSchool}
              userCityInput = {city}
              userCountryInput = {country}
              />
            </>
          )
        }
         }/>  : null 
      } 

        <Route path="/addSchool" component={AddSchool} /> 
        <Route path="/favourites" component={Favourites} /> 
        </div>
        <Footer />
      </Router>
    )
  }
}


export default App;



// Formats user input schools from firebase into identical objects with ID's and pushes formatted objects to new array
function formatFirebaseData(newSchoolObject) {
  let newSchoolArray = [];
  let userNewSchool;

  for (let schoolId in newSchoolObject) {
    userNewSchool = newSchoolObject[schoolId];
    userNewSchool.id = schoolId;

    newSchoolArray.push(userNewSchool);
  }
  return newSchoolArray;
}

// Function to filter our data by category type matching the user selection - ie: university, college or trade school 
function ourCategoryFilter(dataArray) {
  return dataArray.filter((object => {
    return object.name.includes("University") || object.categories[0].name === "Community College" || object.categories[0].name === "Trade School" && object.location.formattedAddress.length > 2;
  })
  );
}

