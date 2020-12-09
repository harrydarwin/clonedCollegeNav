import { Component, Fragment } from 'react';
import firebase from './Firebase.js'

class Favourites extends Component {
    constructor() {
        super();
        this.state ={
            favourites: []
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
                favouritesArray.push(userFavourite);
            }
            this.setState({
                favourites: favouritesArray
            })
        })
    }

    removeSchool = (schoolRef) => {
        const dbFavouritesRef = firebase.database().ref('Favourites');
        const name = schoolRef.schoolName;
        dbFavouritesRef.child(schoolRef).remove();
    }




   render() { 
       console.log(this.state.favourites);
       return (
           <Fragment>
               <h2>Favourites!</h2>
               <ul>
               {
                   this.state.favourites.map((school) => {
                       return(
                        <li key={school.id}>
                            <h3>{school.schoolName}</h3>
                            <p>{school.schoolAddress}</p>
                            <button onClick={() => {this.removeSchool(school.id)} }>Remove School</button>
                        </li>
                       )
                   })
               }
               </ul>
           </Fragment>
       )
   }
}
export default Favourites;