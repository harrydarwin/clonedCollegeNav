import { Component } from 'react';
import axios from 'axios'

class Search extends Component {
    constructorDidMount(){
        axios({
            method: 'GET',
            responseType: 'json',
            url: 'https://api.foursquare.com/v2/venues/search',
            params: {
                client_id:'SMUUEFGVRENHIW3EQX5ICCFCTNQPPIWVXP21E2BQVRH421OF',
                client_secret:'EVNPHQ3EYKNQKZMOAKRVUTT0KDHXXGNUWUCY0LFZTVRE2BAF',
            }
        }).then((res) => {
            console.log(res);
        })
    }

    render(){
        return(
            <h1>Some stuff</h1>
        )
    }
}