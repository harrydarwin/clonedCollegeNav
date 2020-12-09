import { Component, Fragment } from 'react';
import firebase from './Firebase.js';


class SearchResults extends Component {

    constructor() {
        super();

        this.state = {
            // schoolName:'',
            // schoolAddress: []
            savedSchool: {
                schoolName: '',
                schoolAddress: []
            }
        }
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
            <Fragment>
                {
                this.props.schoolResults.map((schoolObj) => {
                    return(
                    <div>
                        <details key={schoolObj.id}>
                            <summary>{schoolObj.name}</summary>
                            <p>{schoolObj.location.formattedAddress}</p>
                        </details>
                        <button 
                        onClick={ () => {this.handleAddFav(schoolObj.name, schoolObj.location.formattedAddress)} }
                        >Add to favourites
                        </button>
                    </div>
                    )
                })
                }
            </Fragment>
            
        
        )
    }
}

export default SearchResults;