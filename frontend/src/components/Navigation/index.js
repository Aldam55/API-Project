// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navwrapper'>
    <div className='navbar'>
      <div id='home'>
        <NavLink exact to="/">Home</NavLink>
      </div>
        <div id='login'>
        {isLoaded && sessionLinks}
        </div>
        <div className='createspot'>
          <NavLink to='/spots/create'>Create a Spot</NavLink>
        </div>
    </div>
    </div>
  );
}

export default Navigation;
