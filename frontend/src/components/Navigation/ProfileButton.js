// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useImperativeHandle } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  // if (!user) {
  //   sessionLinks = (
  //     <div className="profile-dropdown">
  //       <div className="user-dropdown">
  //         <div className="user-dropdown">
  //           <div className="dropdown-links">
  //             <LoginFormModal />
  //           </div>
  //           <div className="dropdown-links">
  //             <SignupFormModal />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // } else {
  //   sessionLinks = (
  //     <div className="profile-dropdown">
  //       <div className="user-dropdown">
  //         <div>{user.username}</div>
  //         <div>{user.email}</div>
  //         <div className="dropdown-links">
  //           <NavLink id='hidepurple' to='/spots/current'>Your Spots</NavLink>
  //         </div>
  //         <div className="dropdown-links">
  //           <NavLink id='hidepurple' to='/reviews/current'>Your Reviews</NavLink>
  //         </div>
  //         <div>
  //           <div onClick={logout}>Log Out</div>
  //         </div>
  //       </div>
  //     </div>)
  // }

  return (
    <>
      <div className="menu-wrapper">
        <div className='menu-container'>
          <button className='menu-button' onClick={openMenu}>
            <i className="fa-solid fa-bars"></i>
            <img className='rock-menu-icon' src='https://i.imgur.com/C3HkZ6J.png' alt='rock' />
          </button>
        </div>
      </div>
      {showMenu &&
        <div className="profile-dropdown">
          <div className="user-dropdown">
            <div className='dropdown-text'>
              <div className="dropdown-text-rows">
                {user.username}
              </div>
              <div className="dropdown-text-rows dropdown-email">
                {user.email}
              </div>
            </div>
            <div className="dropdown-links-wrapper">
            <div className="dropdown-links your-spots">
              <NavLink className='dropdown-button' id='hidepurple' to='/spots/current'>Your Spots</NavLink>
            </div>
            <div className="dropdown-links" id='your-reviews'>
              <NavLink className='dropdown-button' id='hidepurple' to='/reviews/current'>Your Reviews</NavLink>
            </div>
            <div className="dropdown-links" id='logout-button'>
              <div onClick={logout}>Log Out</div>
            </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ProfileButton;
