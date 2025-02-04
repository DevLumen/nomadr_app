// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Demo from './demo-user';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const allVans = useSelector(state => state?.vans?.listOfVans);

  const allTitles = allVans.map(van => {
    return van.title;
  })

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className="become__host" to={'/host'}>Become a Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="login" to="/login">Log In</NavLink>
        <NavLink className="signup" to="/signup">Sign Up</NavLink>
        <Demo />
      </>
    );
  }

  return (
    <nav className='navbar'>
        <div className='logo'>
          {sessionUser && 
            <Link to={`/`}>
                <i className="fas fa-caravan">--<i className="fas fa-shuttle-van"></i></i>
            </Link>
          }
          {!sessionUser && <Link to={'/'}><h1>Nomadr.</h1></Link> }
        </div>
        <div className='group1'>
          {sessionUser &&
            <span>
              <NavLink className='vanstorent' to='/vans'>Rent a Van</NavLink>
            </span>
          }
        </div>
          {sessionUser && <SearchBar  allTitles={allTitles} allVans={allVans}/>}
        <div className='right-nav'>
          <div className='profile-icon'>{isLoaded && sessionLinks}</div>
        </div>
    </nav>
  );
}

export default Navigation;
