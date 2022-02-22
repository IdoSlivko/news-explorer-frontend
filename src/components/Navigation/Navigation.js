import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

import { LoggedInContext } from "../../contexts/LoggedInContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Navigation(props) {

  const location = useLocation();
  const isLoggedIn = React.useContext(LoggedInContext);
  const userName = React.useContext(CurrentUserContext);

  const homeLinkActive = "navigation__home-box navigation__home-box_active";
  const homeLinkInactive = "navigation__home-box";

  const savedLinkActive = "navigation__saved-articles-box navigation__saved-articles-box_active";
  const savedLinkInactive = "navigation__saved-articles-box";

  function login() {
    props.onLogin();
  }

  function logout() {
    props.onLogout();
  }

  return (
    <nav className="navigation">
      <div
        className={
          location.pathname === "/saved-news"
						? homeLinkInactive
						: homeLinkActive
        }
      >
        <Link
          className={
            location.pathname === "/saved-news"
              ? "navigation__link navigation__link_active"
              : "navigation__link"
          }
          to="/"
        >
          Home
        </Link>
      </div>

      {isLoggedIn && (
        <div
          className={
            location.pathname === "/saved-news" ? savedLinkActive : savedLinkInactive
          }
        >
          <Link
           className={
              location.pathname === "/saved-news"
                ? "navigation__link navigation__link_active"
                : "navigation__link navigation__link_inactive"
            }
            to="/saved-news"
          >
            Saved articles
          </Link>
        </div>
      )}

      <div className="navigation__log-box">
        <button
          className={
            isLoggedIn
              ? location.pathname === "/saved-news"
                ? "navigation__logout navigation__logout_theme_dark"
                : "navigation__logout"
              : "navigation__login"
          }
          onClick={ isLoggedIn ? logout : login }>

          <div className={ isLoggedIn ? "navigation__logout-textbox" : undefined }>
            { isLoggedIn ? userName : "Sign in" }
          </div>

          {isLoggedIn && (
            <div
              className={
                location.pathname === "/saved-news"
                  ? "navigation__logout-icon navigation__logout-icon_theme_dark"
                  : "navigation__logout-icon"
              }>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
