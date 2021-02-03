import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
// adding react scroll library
import { animateScroll as scroll, scroller } from "react-scroll";
import Swal from 'sweetalert2';
import axios from 'axios';
import firebase from './Firebase.js';
import mapboxgl from 'mapbox-gl';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import './App.css';
import AddSchool from './AddSchool';
import Favourites from './Favourites.js';
import Footer from './Footer.js';


let city = "";
let country = "";
let mapSearches = [];
let searchResults = [];
let filterOptions = [];
mapboxgl.accessToken = `pk.eyJ1IjoiaGFycnlndWxvaWVuIiwiYSI6ImNrazQ2bmFuYTE2c2MydnBiZW5mcDVnaHYifQ.QPjai4qdHOKRY8qHYt1QVw`;
const universityID = '4bf58dd8d48988d1ae941735';
const collegeID = '4bf58dd8d48988d1a2941735';
const tradeSchoolID = '4bf58dd8d48988d1ad941735';

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
      directMeHome: false,
      mapLocations: [],
      longLatLocations: [],
      locationCoordinates: [],
      filters: []
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
  this.categoriesToSearch(universityID, collegeID, tradeSchoolID);
   //Grab data from firebase
   this.fireBaseCall();
   //  scrolls to search results when API call is made
   this.scrollTo();
   
   // testArray.forEach(school => this.mapData(school));
   this.mapData(`${this.state.cityInput} ${this.state.countryInput}`)  
    
 }

 handleSubmit = (e) => {
   e.preventDefault();
   city = '';
   country = '';
   mapSearches = [];
   searchResults = [];
   filterOptions = [];
    this.setState({
      schoolResults: [],
      newSchool: []
    })
   this.getData();
   this.setState({
     directMeHome: true
   })
 }

//  handleSchoolType = (e) => {
//    this.setState({
//      schoolTypeId: e.target.value
//    })
//  }

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
      // let userSchoolType = this.convertCategoryIdToName();

      // filter firebase formatted school data by comparing school type with usr chosen school type and return results in an array
      // const filteredNewSchoolArray = this.compareUserInputAndCreateResultsArray(newSchoolArray, userSchoolType);
      mapSearches = [];
      //was filteredNewSchoolArray
      newSchoolArray.forEach(school => {
        this.userSchoolMapData(school);
      })
      
      //store results in state
      this.setState({
        newSchool: newSchoolArray
      });
    });
    // store in variables to pass as props
    city = this.state.cityInput;
    country = this.state.countryInput;
  }

//takes firebase schools objects, formats addresses + find and formats coordinates, then pushes to array mapSearches. 
  userSchoolMapData(query) {
    let eachSchool = query;
    eachSchool.address = query.schoolAddress.join();

    this.geoCodeCall(eachSchool.address)
      .then((res) => {
        //check for address (just error handling because firebase has a blank placeholder object)
        if(res.data.features.length > 0){
          //take first address in search results array and push to mapSearches array to be displayed
          eachSchool.coordinates =  res.data.features[0].center;
         
          mapSearches.push(eachSchool);
        }
      }).catch((err) => {
        this.setState({
          isActive: false,
        });
        Swal.fire({
          title: "Please Try Again",
          text: "We are experiencing technical difficulties",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
      

  }

  // Grab coordinates of current location (with geocodecall) and stores cooordinates in state to build initial map
  mapData(query) {
    this.geoCodeCall(query)
      .then((res) => {
        const possibleLocations = res.data.features;

        const ourLocation = possibleLocations[0].geometry.coordinates;
       
        this.setState({
          locationCoordinates: ourLocation
        })
      }).catch((err) => {
        
        Swal.fire({
          title: "Issue with request",
          text: "Please check you location and try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });;
  }

//translates addresses to long and lat coordinates
  geoCodeCall(query) {
    return axios({
      method: 'GET',
      responseType: 'json',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?`,
      params: {
        access_token: mapboxgl.accessToken,
      }
    });
  }


  //filters through array of schools comparing the category to the user-chosen type/category + location input 
  compareUserInputAndCreateResultsArray(newSchoolArray, userSchoolType) {
    return newSchoolArray.filter((object => {

      //  making inputs and comparison case sensitive
      const addedSchoolCity = object.schoolAddress[1].toLowerCase();
      const addedSchoolCountry = object.schoolAddress[2].toLowerCase();
      
      return ((object.schoolType === userSchoolType) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()) && addedSchoolCountry.includes(this.state.countryInput.toLowerCase())) || ((object.schoolType === userSchoolType) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()) && addedSchoolCity.includes(this.state.cityInput.toLowerCase()))
    })
    );
  }

  //takes user type choice (# ID) and converts to string word
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
  apiCall(schoolType) {
    // longLats = [];
    axios({
      method: 'GET',
      responseType: 'json',
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: 'SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF',
        client_secret: 'EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF',
        near: this.state.cityInput + " " + this.state.countryInput,
        categoryId: schoolType,
        radius: this.state.radius,
        v: 20201205
      }
    }).then((res) => {
      const dataArray = res.data.response.venues;

      const filteredArray = ourCategoryFilter(dataArray);

      //assign a markerColor to each school object based on its type
      colorTypePicker(filteredArray);
      // if(filteredArray) {
      //   filteredArray.forEach(school => {
      //     longLats.push(school)
      //   })
      filteredArray.forEach(school => {
        if(!filterOptions.includes(school.type)) {
          filterOptions.push(school.type)
        }
      })
      filteredArray.forEach(result => searchResults.push(result));
      this.setState({
        schoolResults: searchResults,
        isActive: true,
        filters: filterOptions
      });
        
        // console.log(filteredArray, longLats)
      // }

    }).catch((err) => {
      
      
      if (err == "Error: Request failed with status code 403"){
        this.setState({
          isActive: true,
          schoolResults: false
        });
      
        // this.fireBaseCall();
        // //  scrolls to search results when API call is made
        // this.scrollTo();

        // // testArray.forEach(school => this.mapData(school));
        // this.mapData(`${this.state.cityInput} ${this.state.countryInput}`)
        // Swal.fire({
        //   title: "Technical Difficulties",
        //   text: "Please Try Another City and Province/Country",
        //   icon: "error",
        //   confirmButtonText: "Ok",
        // });
    } else {
        this.setState({
          isActive: false,
        });
        Swal.fire({
          title: "No Schools Found",
          text: "Please Try Another City and Province/Country",
          icon: "error",
          confirmButtonText: "Ok",
        });
    }
    });
  }

  categoriesToSearch(...queries) {
    queries.forEach(query => {
      this.apiCall(query);
    })
  }


  render() {
    return(
      <Router>
        
        <Header
        // schoolHandler={this.handleSchoolType}
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
              location = {this.state.locationCoordinates}
              // mapPoints = {longLats}
              filters = {this.state.filters}
              schoolsAdded = {mapSearches}
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

function colorTypePicker(array) {

  array.forEach(object => {
  
    if (object.name.includes("University")) { object.markerColor = "#7261a3"; object.type = "University" }
    else if (object.categories[0].name == "Community College") { object.markerColor = "#5ca4a9"; object.type = "College" }
    else if (object.categories[0].name == "Trade School") { object.markerColor = "#e6af2e"; object.type = "Trade School" }
    else { object.markerColor = "#EDD2E0"; object.type = "" }
  })
}