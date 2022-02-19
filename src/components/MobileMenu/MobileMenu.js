import React from 'react';
import './MobileMenu.css';
import { Link, useLocation } from 'react-router-dom';

import { LoggedInContext } from "../../contexts/LoggedInContext";

function MobileMenu(props) {

	const isLoggedIn = React.useContext(LoggedInContext);
	const location = useLocation();

  return (
    <section className={`popup-mobile ${props.isOpen ? "popup-mobile_opened" : undefined}`}>
      <div className="popup-mobile__container">
				<button
					className="popup-mobile__close-button"
					type="button"
					aria-label="close modal"
					onClick={props.onClose}
				>
				</button>
				<div className="popup-mobile__header-container">
					<Link
						className="popup-mobile__header"
						to="/"
						onClick={props.onClose}>
						NewsExplorer
					</Link>
				</div>
				<div className="popup-mobile__navigation-box">
					<Link
						className="popup-mobile__homepage"
						to={location.pathname === "/saved-news" ? "/" : (isLoggedIn ? "/saved-news" : "/")}
						onClick={props.onClose}>
						{isLoggedIn ? (location.pathname === "/saved-news" ? "Home" : "Saved articles") : "Home"}
					</Link>
					<button
						className="popup-mobile__login"
						type="button"
						onClick={isLoggedIn ? props.onLogout : props.onLogin}
					>
					{isLoggedIn ? "Sign out" : "Sign in"}
					</button>
				</div>
      </div>
    </section>
  );
}

export default MobileMenu;
