import { Component, Fragment } from 'react';
import firebase from './Firebase.js';
import Favourite from './Favourite.js';

class Favourites extends Component {
    constructor() {
        super();
        this.state ={
            favourites: [],
            schoolNotes: '',
            schoolId: ''
        }
    }

    componentDidMount() {

        const dbRef = firebase.database().ref();

        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            const favouritesObject = firebaseDataObj.Favourites;

            let favouritesArray = [];
            let userFavourite;

            for (let schoolId in favouritesObject) {
                userFavourite = favouritesObject[schoolId];
                userFavourite.id = schoolId; 
                userFavourite.notes = this.state.schoolNotes
                favouritesArray.push(userFavourite);
            }
            this.setState({
                favourites: favouritesArray
            })
            console.log(this.state.favourites);
        })
    }

    // removeSchool = (schoolRef) => {
    //     const dbFavouritesRef = firebase.database().ref('Favourites');
    //     dbFavouritesRef.child(schoolRef).remove();
    // }

    // handleAddNotes = (schoolId) => {
    //     const dbFavouritesRef = firebase.database().ref('Favourites')
    //     dbFavouritesRef.child(schoolId).update({schoolNotes: this.state.schoolNotes});
    //     this.setState({
    //         schoolNotes:''
    //     })
    //     document.querySelector('textarea').value = '';
    // }


   render() { 
       console.log(this.state.favourites);
       return (
           <Fragment>
               <h2>Favourites!</h2>
               <ul>
               {
                   this.state.favourites.map((school) => {
                       console.log(school);
                       return(
                           <>
                           <Favourite 
                           school={school}
                           />
                        {/* <li key={school.id}>
                            <h3>{school.schoolName}</h3>
                            <p>{school.schoolAddress}</p>
                            <p><span>Notes: </span>{school.schoolNotes}</p>
                            <label htmlFor="notes">Notes</label>
                            <textarea name="notes" id="notes" onChange={(event) => this.setState({schoolNotes: event.target.value, schoolId: school.id})}></textarea>
                            <button onClick={() => {this.handleAddNotes(school.id)}}>Add Notes</button>
                            <button onClick={() => {this.removeSchool(school.id)} }>Remove School</button>
                        </li> */}
                        </>
                       )
                   })
               }
               </ul>
           </Fragment>
       )
   }
}
export default Favourites;