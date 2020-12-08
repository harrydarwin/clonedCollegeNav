import { Component } from 'react';
import axios from 'axios'


//Grab array of things and filter again for category name including university, college etc to get only schools/post secondary institutes




// categories
// College and University: 4d4b7105d754a06372d81259
    // encompasses the entire section of college universities(buildings and gyms etc.)

// a more detailed list inside of College and University category
    // Community College: 4bf58dd8d48988d1a2941735
    // General College & University: 4bf58dd8d48988d1a8941735
    // Trade School: 4bf58dd8d48988d1ad941735
    // University: 4bf58dd8d48988d1ae941735



class Search extends Component {
    componentDidMount(){
        console.log('ITS ATTACHED');
        axios({
            method: 'GET',
            responseType: 'json',
            url: 'https://api.foursquare.com/v2/venues/search',
            params: {
                client_id:'SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF',
                client_secret:'EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF',
                near: 'Toronto, Canada',
                categoryId:'4bf58dd8d48988d1ae941735',
                radius:'10000', //its in metres
                v: 20201205
            }
        }).then((res) => {
            console.log(res.data.response.venues);
        }).catch((err) => {
            console.log(err, 'It aint working');
        })
    }

    render(){
        return(
            <h1>Some stuff</h1>
        )
    }
}

export default Search;