import React, { Component, Fragment } from 'react';
import firebase from './Firebase.js';
import Swal from 'sweetalert2'



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

    componentDidMount() {
        this.sectionRef.current.scrollIntoView();
    }
    
    
    


    removeSchool = (schoolRef) => {
        const dbFavouritesRef = firebase.database().ref('NewSchools');
        dbFavouritesRef.child(schoolRef).remove();
        Swal.fire({
            title: "Institution Removed",
            text: "thank you",
            icon: "success",
            confirmButtonText: "Ok",
        })
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

        Swal.fire({
            title: "Institution Added",
            text: "thank you",
            icon: "success",
            confirmButtonText: "Ok",
        })
    }
    
    render(){
        return(
            <section>
                <div className="combinedSchools">
                <div className="searchedSchools">
                <h2 ref={this.sectionRef}>Search results: <span>{this.props.userCityInput}, {this.props.userCountryInput}</span></h2>
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
                        <div className='buttonFlex'>
                            <button 
                            onClick={ () => {this.handleAddFav(newSchoolObj.schoolName, newSchoolObj.schoolAddress)} }
                            >Add to favourites
                            </button>
                            <button 
                            onClick={ () => {this.removeSchool(newSchoolObj.id)} }
                            >Remove School
                            </button>
                        </div>
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