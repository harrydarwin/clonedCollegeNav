import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.js';
import SearchResults from './SearchResults.js';



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
      formattedAddress: []
    }
  }

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
      return object.categories[0].name === "University" || object.categories[0].name === "Community College" || object.categories[0].name === "Trade School"; })
    );
    console.log(filteredArray);

    // this.props.schoolResults[0].location.formattedAddress
    

    this.setState({
      schoolResults: filteredArray,
      // formattedAddress:
    })
    console.log(this.state.schoolResults[0].location.formattedAddress);

  }).catch ((err) => {
    console.log(err, 'It aint working');
  })
 }

 handleSubmit = (e) => {
   e.preventDefault();
   this.getData();
    //  const address = this.state.schoolResults[0].location.formattedAddress
    //  console.log(address)
    
   
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

        <Route exact path="/" render={() => {
          return (
              <SearchResults 
              schoolResults = {this.state.schoolResults} />
          )
        }
          }/>
          
          

        {/* <Route exact path="/school/:schoolID" component={SchoolDetails} /> */}
        
        

        
      </Router>
    )
  }
}


export default App;
