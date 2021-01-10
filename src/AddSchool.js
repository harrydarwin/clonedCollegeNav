import { Component, Fragment } from 'react';
import firebase from './Firebase.js';
import Swal from 'sweetalert2'

class AddSchool extends Component {
    constructor(){
        super();
        this.state = {
                schoolName:'',
                schoolType: '',
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
        
        //make a referance to the database
        const dbRef = firebase.database().ref('NewSchools')
        const userNewSchool = {
            schoolName:this.state.schoolName,
            schoolType:this.state.schoolType,
            schoolAddress: schoolFormattedAddress,
        };


        dbRef.push(userNewSchool);
        
        // create a notification for add push
        Swal.fire({
            title: "New institution added",
            text: "Thank You",
            icon: "success",
            confirmButtonText: "Ok",
            })

        // clear form
        this.setState({
            schoolName: '',
            schoolNote: '',
            schoolType: '',
            schoolAddress: {
                street: '',
                city: '',
                province: '',
                postalCode: '',
                country: ''
            }
        })
    }

    updateAddress = (event, property) =>{
        let schoolAddress = {...this.state.schoolAddress};
        schoolAddress[property] = event.target.value;
        this.setState({schoolAddress});
    }

    render(){
        return(
            <Fragment>
                <div className="addSchoolForm">
                    <form >
                        <label htmlFor="newSchoolName">School Name</label>
                        <input type="text" id="newSchoolName"
                            value={this.state.schoolName}
                            onChange={(event) => this.setState({ schoolName: event.target.value })} /><br />
                        <div className="schoolTypeInputs">
                            <legend>School Type</legend>
                            <input type="radio" id='newUniversity' name='schoolType'
                                value='University' required
                                checked={this.state.schoolType === "University"}
                                onChange={(event) => this.setState({ schoolType: event.target.value })} />
                            <label htmlFor="newUniversity">University</label>
                            <input type="radio" id='newCollege' name='schoolType'
                                value='Community College'
                                checked={this.state.schoolType === "Community College"}
                                onChange={(event) => this.setState({ schoolType: event.target.value })} />
                            <label htmlFor="newCollege">College</label>
                            <input type="radio" id='newTradeSchool' name='schoolType'
                                value='Trade School'
                                checked={this.state.schoolType === "Trade School"}
                                onChange={(event) => this.setState({ schoolType: event.target.value })} />
                            <label htmlFor="newTradeSchool">Trade School</label><br />
                        </div>
                        <div className="addressInputs">
                            <div className="addressInput">
                                <label htmlFor="newSchoolAddress">Address</label>
                                <input type="text" id="newSchoolAddress"
                                    value={this.state.schoolAddress.street}
                                    onChange={(event) => this.updateAddress(event, 'street')} />
                            </div>
                            <div className="addressInput">
                                <label htmlFor="newSchoolCity">City</label>
                                <input type="text" id="newSchoolCity"
                                    value={this.state.schoolAddress.city}
                                    onChange={(event) => this.updateAddress(event, 'city')} />
                            </div>
                            <div className="addressInput">
                                <label htmlFor="newSchoolProvince">Province</label>
                                <input type="text" id="newSchoolProvince"
                                    value={this.state.schoolAddress.province}
                                    onChange={(event) => this.updateAddress(event, 'province')} />
                            </div>
                            <div className="addressInput">
                                <label htmlFor="newSchoolPostal">Postal Code</label>
                                <input type="text" id="newSchoolPostal"
                                    value={this.state.schoolAddress.postalCode}
                                    onChange={(event) => this.updateAddress(event, 'postalCode')} />
                            </div>
                            <div className="addressInput">
                                <label htmlFor="newSchoolCountry">Country</label>
                                <input type="text" id="newSchoolCountry"
                                    value={this.state.schoolAddress.country}
                                    onChange={(event) => this.updateAddress(event, 'country')} />
                            </div>
                        </div>
                        <button className="addSchoolButton" onClick={this.addSchool}>Add new school</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default AddSchool;