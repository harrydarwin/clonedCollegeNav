import React, { Component, useRef } from 'react';
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
        const sectionRef = useRef();
    }

    componentDidMount() {
        console.log(this.sectionRef)
        // this.sectionRef.current.scrollIntoView();
    }

    handleAddFav = (name, address) => {
        // console.log(name, address);

        // this.setState({
        //     schoolName: name,
        //     schoolAddress: address,
        // })
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
            <section ref={this.sectionRef}>
                <h2>Your search results for {this.props.userCityInput}, {this.props.userCountryInput}</h2>
                {
                this.props.schoolResults.map((schoolObj) => {
                    return(
                    <div className="schoolResults" ref={this.sectionRef}>
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
            </section>
            
        
        )
    }
}

export default SearchResults;