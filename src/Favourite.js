import { Component } from 'react';
import firebase from './Firebase.js';
import Swal from 'sweetalert2'

class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            schoolNotes: '',
            schoolId: ''
        }
    }

    removeSchool = (schoolRef) => {
        const dbFavouritesRef = firebase.database().ref('Favourites');
        dbFavouritesRef.child(schoolRef).remove();
        Swal.fire({
            title: "Institution Removed",
            text: "Your favourite list has been updated",
            icon: "success",
            confirmButtonText: "Ok",
        })
    }

    handleAddNotes = (schoolId) => {
        const dbFavouritesRef = firebase.database().ref('Favourites')
        dbFavouritesRef.child(schoolId).update({ schoolNotes: this.state.schoolNotes });
       this.setState({
           schoolNotes: ''
       })
        Swal.fire({
            title: "Note Added",
            text: "Added",
            icon: "success",
            confirmButtonText: "Ok",
        })
    }

   render() { 
       const {id, schoolName, schoolAddress, schoolNotes} = this.props.school;
       return (
           
           <li key={id} className="favoritesFlex">
                   <h3>{schoolName}</h3>
                   <p>{schoolAddress}</p>
                   <p><span>Notes: </span>{schoolNotes}</p>
                   <label htmlFor="notes" className="srOnly">Notes: type below to add</label>
                   <textarea placeholder="Type here to add notes" value={this.state.schoolNotes} name="notes" id="notes" onChange={(event) => this.setState({schoolNotes: event.target.value, schoolId: id })}></textarea>
                   <div className="buttonFlex">
                   <button onClick={() => { this.handleAddNotes(id) }}>Add Notes</button>
                   <button onClick={() => { this.removeSchool(id) }}>Remove School</button>
                   </div>
               </li>
           
           )
   }
}
export default Favourite;