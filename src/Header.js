import { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import firebase from './Firebase'



class Header extends Component{

    constructor() {
        super();

        this.state={
            favouriteLength:[],
            redirect: false
        }
    }

    componentDidMount() {

        const dbRef = firebase.database().ref();

        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            const favouritesObject = firebaseDataObj.Favourites;
            let newFavouriteArray = [];
            let favouriteSchool;

            for (let favourite in favouritesObject) {
                favouriteSchool = favouritesObject[favourite];
                newFavouriteArray.push(favouriteSchool);
            }

            this.setState({
                favouritesLength: newFavouriteArray.length - 1
            })
        })
    }

    setRedirect = () => {
        this.setState({
            redirect:true
        })
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            this.setState({
                redirect: false
            })
            return <Redirect exact to="/searchResults" />
        }
    }

    render() {    
    const { schoolHandler, radiusHandler, handleCityInput, handleCountryInput, submitHandler } = this.props;
        return (
            <header>
                <h1>College Navigator</h1>
                <form action='submit' onSubmit={submitHandler}>
                    <div className="wrapper">

                    
                    <div className="cityInputs">
                    <input onChange={handleCityInput} type="text" placeholder='City' id='citySearch' required/>
                    <label className='srOnly' htmlFor="citySearch">Please enter a city to search</label>

                    <input onChange={handleCountryInput} type="text" placeholder='Province/State OR Country' id='countrySearch' required/>
                    <label className="srOnly" htmlFor="countrySearch">Please enter the country the city is in</label>
                    </div>
                    
                    <div className="radiusInputs">
                        <legend>Search Radius</legend>
                        <div>
                            <input onChange={radiusHandler} type="radio" id='shortRadius' name='radius' value='5000' required/>
                            <label htmlFor="shortRadius">5KM</label>
                            <input onChange={radiusHandler} type="radio" id='mediumRadius' name='radius' value='10000' />
                            <label htmlFor="mediumRadius">10KM</label>
                        </div>

                        <div>
                            <input onChange={radiusHandler} type="radio" id='longRadius' name='radius' value='25000' />
                            <label htmlFor="longRadius">25KM</label>
                            <input onChange={radiusHandler} type="radio" id='xlongRadius' name='radius' value='50000' />
                            <label htmlFor="xlongRadius">50KM</label>
                        </div>
                    </div>
                    
                    <div className="schoolTypeInputs">
                        <legend>School Type</legend>
                        <input onChange={schoolHandler} type="radio" id='university' name='schoolType' value='4bf58dd8d48988d1ae941735' required/>
                        <label htmlFor="university">University</label>
                        <input onChange={schoolHandler} type="radio" id='college' name='schoolType' value='4bf58dd8d48988d1a2941735' />
                        <label htmlFor="college">College</label>
                        <div>
                            <input onChange={schoolHandler} type="radio" id='tradeSchool' name='schoolType' value='4bf58dd8d48988d1ad941735' />
                            <label htmlFor="tradeSchool">Trade School</label>
                        </div>
                    </div>
                    {this.renderRedirect()}
                    <button onClick={this.setRedirect}>Find Schools!</button>
                    </div>
                </form>
                <nav>
                    <ul>
                        <li>
                            <NavLink activeClassName="active" to="/searchResults">Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/favourites">Favourite Schools ({this.state.favouritesLength})</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/addSchool">Add School</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;