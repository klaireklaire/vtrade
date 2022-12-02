import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
/*
  **npm install react-icons --save**
  Icons used for navigation menu when size of website is too small
*/
import './navbar.css';

const Menu = () => (
  <>
    <p><a href="#Housing">Housing</a></p>
    <p><a href="#Goods">Goods</a></p>
    <p><a href="#Jobs">Jobs</a></p>
    <p><a href="#Personals">Personals</a></p>
    <p><a href="#Services">Services</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="vtrade__navbar">
      <div className="vtrade__navbar-links">
        <div className="vtrade__navbar-links_home">
          {
            //VTRADE: button to lead back to homepage
          }
          <button>VTRADE</button>
        </div>
        <div className="vtrade__navbar-links_container">
          {
            //List to different pages shown on the top bar
          }
          <Menu />
        </div>
      </div>
      <div className="vtrade__navbar-sign">
          {
            //buttons to log in and to post
          }
        <button type="button" className='vtrade__navbar-sign_log'>Log In</button>
        <button type="button" className='vtrade__navbar-sign_post'>Post</button>
      </div>
      <div className="vtrade__navbar-menu">
        {
          /*
            Show either RiCloseLine (react icon) or RiMenu3Line (react icon)
            depending on if you clicked the icon or not to show or hide the icon 
          */
        }
        {toggleMenu
          ? <RiCloseLine color="#000" size={30} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000" size={30} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        /*
          When the icon to toggle 'Menu' is clicked and the size of the screen is
          to small to fit the 'Menu' on the top bar 
        */
        <div className="vtrade__navbar-menu_container slide-in-right">
          <div className="vtrade__navbar-menu_container-links">
            <Menu />
          </div>
          <div className="vtrade__navbar-menu_container-links-sign">
            <button type="button" className='vtrade__navbar-menu_container-links-sign_log'>Log In</button>
            <button type="button" className='vtrade__navbar-menu_container-links-sign_post'>Post</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;