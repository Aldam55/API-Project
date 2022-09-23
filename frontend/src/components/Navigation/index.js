// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const className = () => {
    if (showMenu) {
      return 'drop-menu-visible'
    } else {
      return 'drop-menu-hidden'
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <div className="menu-wrapper">
          <div className='menu-container'>
            <button className='menu-button' onClick={openMenu}>
              <i className="fa-solid fa-bars"></i>
              <img className='rock-menu-icon' src='https://i.imgur.com/C3HkZ6J.png' alt='rock' />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="profile-dropdown">
            <div className="user-dropdown">
              <div>
              <LoginFormModal />
              </div>
              <div>
              <SignupFormModal />
              </div>
            </div>
          </div>
        )} */}
        {/* <LoginFormModal></LoginFormModal> */}
        <div className='dropdown-menu'>
          <button className='drop' onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}>
            <i className="fa-solid fa-bars"></i>
            <img className='rock-menu-icon' src='https://i.imgur.com/C3HkZ6J.png' alt='rock' />
          </button>
          <div className={className()}>
            <div className='login-dropdown'>
              <div className='login-dropdown-button'>
                <div id='hidepurple'><LoginFormModal /></div>
              </div>
              <div className='login-dropdown-button'>
                <div id='hidepurple'><SignupFormModal /></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='navwrapper'>
      <div className='navbar'>
        <div className='leftbuttons'>
          <div id='home'>
            <NavLink exact to="/" >
              <img id='home-logo' src='https://i.imgur.com/bKJG6DC.png' alt='rocks'></img>
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
            {/* <ProfileButton user={sessionUser} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
