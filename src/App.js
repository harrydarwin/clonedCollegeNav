import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import firebase from './Firebase.js';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import './App.css';
import AddSchool from './AddSchool';
import Favourites from './Favourites.js';



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
      word: ""
    }
  }

  // handleFavouriteLength = (length) => {
  //   this.setState({
  //     favouriteLength: length
  //   }, console.log(this.state.favouriteLength))
  // }



 getData = () => {
   axios({
    method: 'GET',
    responseType: 'json',
    url: 'https://api.foursquare.com/v2/venues/search',
    params: {
      client_id:'SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF',
      client_secret:'EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF',
      near: this.state.cityInput + " " + this.state.countryInput,
      categoryId:this.state.schoolTypeId,
      radius:this.state.radius, //its in metres
      v: 20201205
            }
  }).then((res) => {
    console.log(res.data.response.venues);
    const dataArray = res.data.response.venues;

    // const filter = dataArray.filter((object => object.name.includes("University")))
    // console.log(filter);


    const filteredArray = dataArray.filter((object => {
      return object.name.includes("University") || object.categories[0].name === "Community College" || object.categories[0].name === "Trade School" && object.location.formattedAddress.length > 2})
    );
    console.log(filteredArray);

   
    // this.props.schoolResults[0].location.formattedAddress
    

    this.setState({
      schoolResults: filteredArray,
      // formattedAddress:
    })
    console.log(this.state.schoolResults[0].location.formattedAddress);

  }).catch ((err) => {
<<<<<<< HEAD
    console.log(err, 'It aint working');
    alert("Please enter a valid city and province/country")
=======
    Swal.fire({
      title: "No schools found",
      text: "Please Try Another City and Province/Country",
      icon: "error",
      confirmButtonText: "Ok",
    })
>>>>>>> 2330286a5ada5ebdcb9ac6ccd20742bc06d9a6a2
  })

   const dbRef = firebase.database().ref();
   dbRef.on('value', (data) => {
     const firebaseDataObj = data.val();
     const newSchoolObject = firebaseDataObj.NewSchools;

     let newSchoolArray = [];
     let userNewSchool;

     for (let schoolId in newSchoolObject) {
       userNewSchool = newSchoolObject [schoolId];
       userNewSchool.id = schoolId;
      //  userNewSchool.notes = this.state.schoolNotes
       newSchoolArray.push(userNewSchool);
     }
     //4bf58dd8d48988d1ae941735-University
     //  Community College- 4bf58dd8d48988d1a2941735
     //  Trade School- 4bf58dd8d48988d1ad941735
     let userSchoolType= '';
     if (this.state.schoolTypeId === '4bf58dd8d48988d1ae941735'){
       userSchoolType = 'University'
     } else if (this.state.schoolTypeId === '4bf58dd8d48988d1a2941735'){
       userSchoolType = 'Community College'
     } else if (this.state.schoolTypeId === '4bf58dd8d48988d1ad941735'){
        userSchoolType = 'Trade School'
     }
     console.log(userSchoolType, 'school type');
     console.log(this.state.cityInput, 'city type');


     const filteredNewSchoolArray = newSchoolArray.filter((object => {
      //  making inputs and comparison case sensitive

       const addedSchoolCity = object.schoolAddress[1].toLowerCase();
       const addedSchoolCountry = object.schoolAddress[2].toLowerCase();
       return (object.schoolType === userSchoolType && addedSchoolCity.includes(this.state.cityInput.toLowerCase()) && addedSchoolCountry.includes(this.state.countryInput.toLowerCase()))
     })
     );

     console.log(filteredNewSchoolArray, 'filtered school array');

     this.setState({
       newSchool: filteredNewSchoolArray
<<<<<<< HEAD
=======
       
>>>>>>> 2330286a5ada5ebdcb9ac6ccd20742bc06d9a6a2
     })
     console.log(this.state.newSchool, 'new school array');
   })
   city = this.state.cityInput;
   country = this.state.countryInput;
 }

 handleSubmit = (e) => {
   e.preventDefault();
   this.getData();
    //  const address = this.state.schoolResults[0].location.formattedAddress
    //  console.log(address)
  this.setState ({
    isActive: true,
  })
  console.log(this.state.isActive);
 }

 handleSchoolType = (e) => {
   this.setState({
     schoolTypeId: e.target.value
   })
 }

 handleRadius = (e) => {
   console.log(e.target.value)
   this.setState({
     radius: e.target.value
   })
 }

 handleCityInput = (e) => {
   console.log(e.target.value)
  this.setState({
    cityInput: e.target.value
  })
 }

 handleCountryInput = (e) => {
   this.setState({
     countryInput: e.target.value
   })
 }



  render() {
    return(
      <Router>
        
        <Header
        // schoolId={this.schoolTypeId}
        // radius={this.state.radius}
        // city={this.state.cityInput}
        schoolHandler={this.handleSchoolType}
        radiusHandler={this.handleRadius}
        handleCityInput={this.handleCityInput}
        handleCountryInput={this.handleCountryInput}
        submitHandler={this.handleSubmit}
        />
        <div className="wrapper">
        {/* <Favourites /> */}
        {this.state.isActive 
            ? <Route exact path="/project6CollegeNavigator" render={() => {
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
        }/> 
        : null 
        }

        <Route path="/addSchool" component={AddSchool} /> 
        <Route path="/favourites" component={Favourites} /> 
        {/* <Route path="/favourites" render={() => {
          return (
              <Favourites 
              getFavouritesLength = {() => {this.handleFavouriteLength()} } />
          )
        }
        }/> */}
         
         

        {/* <Route exact path="/school/:schoolID" component={SchoolDetails} /> */}
        
        

        </div>
      </Router>
    )
  }
}


export default App;
