import { Component, Fragment } from 'react';
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




class SearchResults extends Component {
    componentDidMount(){
        
    }
    
    render(){
        return(
            <Fragment>
                {
                this.props.schoolResults.map((schoolObj) => {
                    return(
                    // console.log(schoolObj, schoolObj.name, schoolObj.location.formattedAddress)
                <div key={schoolObj.id}>
                    <p>{schoolObj.name}</p>
                    <p>{schoolObj.location.formattedAddress}</p>
                </div>
                    
                    )
                })
                }
            </Fragment>
            
        
        )
    }
}

export default SearchResults;