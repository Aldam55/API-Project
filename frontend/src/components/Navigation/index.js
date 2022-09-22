// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
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
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='navwrapper'>
      <div className='navbar'>
        <div className='leftbuttons'>
          <div id='home'>
            <NavLink exact to="/" >
              <img id='home-logo' src='https://i.imgur.com/bKJG6DC.png'></img>
            </NavLink>
          </div>
        </div>
        <div className='rightbuttons'>
              {sessionUser &&
          <div className='createspot'>
            <div className='testcreatespot'>
                <NavLink id='hidepurple' to='/spots/create'>Host a Spot</NavLink>
            </div>
          </div>
              }
          <div id='login'>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
