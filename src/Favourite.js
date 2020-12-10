import { Component } from 'react';
import firebase from './Firebase.js';

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
    }

    handleAddNotes = (schoolId) => {
        const dbFavouritesRef = firebase.database().ref('Favourites')
        dbFavouritesRef.child(schoolId).update({ schoolNotes: this.state.schoolNotes });
       this.setState({
           schoolNotes: ''
       })
    }

   render() { 
       const {id, schoolName, schoolAddress, schoolNotes} = this.props.school;
       return (
           <>
           <li key={id}>
               <h3>{schoolName}</h3>
               <p>{schoolAddress}</p>
               <p><span>Notes: </span>{schoolNotes}</p>
               <label htmlFor="notes">Notes</label>
               <textarea value={this.state.schoolNotes} name="notes" id="notes" onChange={(event) => this.setState({schoolNotes: event.target.value, schoolId: id })}></textarea>
               <button onClick={() => { this.handleAddNotes(id) }}>Add Notes</button>
               <button onClick>Edit Notes</button>
               <button onClick={() => { this.removeSchool(id) }}>Remove School</button>
           </li>
       
           
           <li key={id} className="favoritesFlex">
                   <h3>{schoolName}</h3>
                   <p>{schoolAddress}</p>
                   <p><span>Notes: </span>{schoolNotes}</p>
                   <label htmlFor="notes">Notes</label>
                   <textarea value={this.state.schoolNotes} name="notes" id="notes" onChange={(event) => this.setState({schoolNotes: event.target.value, schoolId: id })}></textarea>
                   <div className="buttonFlex">
                   <button onClick={() => { this.handleAddNotes(id) }}>Add Notes</button>
                   <button onClick={() => { this.removeSchool(id) }}>Remove School</button>
                   </div>
               </li>
            </>
           )
   }
}
export default Favourite;