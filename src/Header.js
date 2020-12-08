import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const { schoolId, radius, city, schoolHandler, radiusHandler, handleCityInput, handleCountryInput, submitHandler } = props;
        return (
            <header>
                <h1>College Navigator</h1>
                <form action='submit' onSubmit={submitHandler}>
                    <input onChange={handleCityInput} type="text" placeholder='Enter City' id='citySearch' required/>
                    <label className='srOnly' htmlFor="citySearch">Please enter a city to search</label>

                    <input onChange={handleCountryInput} type="text" placeholder='Enter Country' id='countrySearch'/>
                    <label className="srOnly" htmlFor="countrySearch">Please enter the country the city is in</label>

                    <legend>Search Radius</legend>
                    <input onChange={radiusHandler} type="radio" id='shortRadius' name='radius' value='5000' />
                    <label htmlFor="shortRadius">5KM</label>
                    <input onChange={radiusHandler} type="radio" id='mediumRadius' name='radius' value='10000' />
                    <label htmlFor="mediumRadius">10KM</label>
                    <input onChange={radiusHandler} type="radio" id='longRadius' name='radius' value='25000' />
                    <label htmlFor="longRadius">25KM</label>

                    <legend>School Type</legend>
                    <input onChange={schoolHandler} type="radio" id='university' name='schoolType' value='4bf58dd8d48988d1ae941735' />
                    <label htmlFor="university">University</label>
                    <input onChange={schoolHandler} type="radio" id='college' name='schoolType' value='4bf58dd8d48988d1a2941735' />
                    <label htmlFor="college">College</label>
                    <input onChange={schoolHandler} type="radio" id='tradeSchool' name='schoolType' value='4bf58dd8d48988d1ad941735' />
                    <label htmlFor="tradeSchool">Trade School</label>

                    <button>Find Me Schools!</button>
                </form>
                <nav>
                    <ul>
                        <li>USERNAME!!!!</li>
                        <li>
                            <NavLink activeClassName="active" exact to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/favourites">Favourite Schools</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/addSchool">Add School</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
}

export default Header;