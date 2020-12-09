import { Component, Fragment } from 'react';
import firebase from './Firebase.js';

class AddSchool extends Component {
    constructor(){
        super();
        this.state = {
                schoolName:'',
                schoolType: '',
                schoolNote: '',
                schoolAddress: {
                    street: '',
                    city: '',
                    province: '',
                    postalCode: '',
                    country: ''
                }
        };
        
        // this.submitNewSchool = this.submitNewSchool.bind(this);

    }

    addSchool = (e) => {
        e.preventDefault();
        
        
        let schoolFormattedAddress = [this.state.schoolAddress.street, 
            this.state.schoolAddress.city + " " + this.state.schoolAddress.province + " " + this.state.schoolAddress.postalCode,
            this.state.schoolAddress.country ];
        // console.log(schoolFormattedAddress, 'for');
        
        //make a referance to the database
        const dbRef = firebase.database().ref('NewSchools')
        const userNewSchool = {
            schoolName:this.state.schoolName,
            schoolType:this.state.schoolType,
            schoolAddress: schoolFormattedAddress,
            schoolNote: this.state.schoolNote
        };
        console.log(userNewSchool, 'newschool');
        dbRef.push(userNewSchool);
    }

    updateAddress = (event, property) =>{
        let schoolAddress = {...this.state.schoolAddress};
        schoolAddress[property] = event.target.value;
        this.setState({schoolAddress});
    }

    render(){
        return(
            <Fragment>
                <form >
                    <label htmlFor="newSchoolName">School Name</label>
                        <input type="text" id="newSchoolName"
                        value={this.state.schoolName}
                        onChange={(event) => this.setState({schoolName: event.target.value})}/><br/>
                    <legend>School Type</legend>
                        <input type="radio" id='university' name='schoolType' 
                        value='University' required 
                        checked={this.state.schoolType === "University"}
                        onChange={(event) => this.setState({ schoolType: event.target.value })}/>
                    <label htmlFor="university">University</label>
                        <input type="radio" id='college' name='schoolType'
                        value='Community College' 
                        checked={this.state.schoolType === "Community College"}
                        onChange={(event) => this.setState({ schoolType: event.target.value })}/>
                    <label htmlFor="college">College</label>
                        <input type="radio" id='tradeSchool' name='schoolType' 
                        value='Trade School'
                        checked={this.state.schoolType === "Trade School"}
                        onChange={(event) => this.setState({ schoolType: event.target.value })}/>
                    <label htmlFor="tradeSchool">Trade School</label><br/>
                    <label htmlFor="newSchoolAddress">Address</label>
                        <input type="text" id="newSchoolAddress"
                        value={this.state.schoolAddress.street}
                        onChange={(event) => this.updateAddress(event, 'street')}/>
                    <label htmlFor="newSchoolCity">City</label>
                        <input type="text" id="newSchoolCity" 
                        value={this.state.schoolAddress.city}
                        onChange={(event) => this.updateAddress(event, 'city')} /><br/>
                    <label htmlFor="newSchoolProvince">Province</label>
                    <input type="text" id="newSchoolProvince"
                        value={this.state.schoolAddress.province}
                        onChange={(event) => this.updateAddress(event, 'province')} />
                    <label htmlFor="newSchoolPostal">Postal Code</label>
                        <input type="text" id="newSchoolPostal" 
                        value={this.state.schoolAddress.postalCode}
                        onChange={(event) => this.updateAddress(event, 'postalCode')} />
                    <label htmlFor="newSchoolCountry">Country</label>
                        <input type="text" id="newSchoolCountry"
                        value={this.state.schoolAddress.country}
                        onChange={(event) => this.updateAddress(event, 'country')} /><br/>
                    <label htmlFor="addNote">Note</label>
                        <textarea
                        value={this.state.schoolNote}
                        onChange={(event) => this.setState({ schoolNote: event.target.value })}></textarea><br/>
                    <button onClick={this.addSchool}>Add new school</button>
                </form>
            </Fragment>
        )
    }
}

export default AddSchool;