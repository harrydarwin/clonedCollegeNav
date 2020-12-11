import React, { Component, Fragment } from 'react';
import firebase from './Firebase.js';


class SearchResults extends Component {

    constructor() {
        super();

        this.state = {
            savedSchool: {
                schoolName: '',
                schoolAddress: [],
            }
        }
        this.sectionRef = React.createRef();
    }

    // componentDidMount() {
    //     console.log(this.sectionRef.current)
    //     this.sectionRef.current.scrollIntoView();
    // }

    handleAddFav = (name, address) => {
        const dbFavouritesRef = firebase.database().ref('Favourites')
        const favouriteSchool = {
            schoolName: name,
            schoolAddress: [...address],
            schoolNotes: ''
        }
        dbFavouritesRef.push(favouriteSchool);
    }
    
    render(){
        return(
            <section>
                <div className="combinedSchools">
                <div className="searchedSchools">
                <h2>Your search results for <span>{this.props.userCityInput}, {this.props.userCountryInput}</span></h2>
                {
                this.props.schoolResults.map((schoolObj) => {
                    return(
                    <div className="schoolResults">
                        <details key={schoolObj.id}>
                            <summary>{schoolObj.name}</summary>
                                <p>{schoolObj.location.formattedAddress.join(', ')}</p>
                        </details>
                        <button 
                        onClick={ () => {this.handleAddFav(schoolObj.name, schoolObj.location.formattedAddress)} }
                        >Add to favourites
                        </button>
                    </div>
                    )
                })
                }
                </div>
                <div className="addedSchool">
                <h2>User's Added Institutions</h2>
                {
                this.props.schoolsAdded.map((newSchoolObj) => {
                    return(
                    <div className="schoolResults">
                        <details key={newSchoolObj.id}>
                            <summary>{newSchoolObj.schoolName}</summary>
                                <p>{newSchoolObj.schoolAddress.join(', ')}</p>
                        </details>
                        <button 
                        onClick={ () => {this.handleAddFav(newSchoolObj.schoolName, newSchoolObj.schoolAddress)} }
                        >Add to favourites
                        </button>
                    </div>
                    )
                })
                }
                </div>
                </div>
            </section>
            
        
        )
    }
}

export default SearchResults;