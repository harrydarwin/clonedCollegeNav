import { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
   render() { 
       return (
           <header>
               <h1>College Navigator</h1>
               <form>
                   <input type="text" placeholder='Enter City' id='citySearch' />
                   <label className='srOnly' htmlFor="citySearch">Please enter a city to search</label>

                   <legend>Search Radius</legend>
                   <input type="radio" id='shortRadius' name='radius' value='5000' />
                   <label htmlFor="shortRadius">5KM</label>
                   <input type="radio" id='mediumRadius' name='radius' value='10000' />
                   <label htmlFor="mediumRadius">10KM</label>
                   <input type="radio" id='longRadius' name='radius' value='25000' />
                   <label htmlFor="longRadius">25KM</label>

                   <legend>School Type</legend>
                   <input type="radio" id='university' name='schoolType' value='4bf58dd8d48988d1ae941735' />
                   <label htmlFor="university">University</label>
                   <input type="radio" id='college' name='schoolType' value='4bf58dd8d48988d1a2941735' />
                   <label htmlFor="college">College</label>
                   <input type="radio" id='tradeSchool' name='schoolType' value='4bf58dd8d48988d1ad941735' />
                   <label htmlFor="tradeSchool">Trade School</label>

                   <button type='submit'>Find Me Schools!</button>
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
}

export default Header;