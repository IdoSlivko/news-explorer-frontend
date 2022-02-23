import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import MobileMenu from '../MobileMenu/MobileMenu';

import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import card01 from '../../images/card_01.jpg';
import card02 from '../../images/card_02.jpg';
import card03 from '../../images/card_03.jpg';
import card04 from '../../images/card_04.jpg';
import card05 from '../../images/card_05.jpg';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(true);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = React.useState("Elise");

  const [isMobile, setIsMobile] = React.useState(false);
  const [ isPopupMobileOpen, setIsPopupMobileOpen ] = React.useState(false);
  const [ isPopupSigninOpen, setIsPopupSigninOpen ] = React.useState(false);
  const [ isPopupSignupOpen, setIsPopupSignupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(true);
  const history = useHistory();

  const cards = [
    {
      image: card01,
      date: 'November 4, 2020',
      title: 'Everyone Needs a Special \'Sit Spot\' in Nature',
      text: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
      source: 'treehugger',
      owner: 1,
      _id: 1
    },
    {
      image: card02,
      date: 'February 19, 2019',
      title: 'Nature makes you better',
      text: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
      source: 'national geographic',
      owner: 1,
      _id: 2
    },
    {
      image: card03,
      date: 'October 19, 2020',
      title: 'Grand Teton Renews Historic Crest Trail',
      text: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
      source: 'National parks traveler',
      owner: 3,
      _id: 3
    },
    {
      image: card04,
      date: 'October 19, 2020',
      title: 'Nostalgic Photos of Tourists in U.S. National Parks',
      text: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
      source: 'national geographic',
      owner: 1,
      _id: 4
    },
    {
      image: card05,
      date: 'March 16, 2020',
      title: 'Scientists Don\'t Know Why Polaris Is So Weird',
      text: 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
      source: 'treehugger',
      owner: 1,
      _id: 5
    },
  ];

  const savedCards = [
    {
      image: card01,
      keyword: 'nature',
      date: 'November 4, 2020',
      title: 'Everyone Needs a Special \'Sit Spot\' in Nature',
      text: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
      source: 'treehugger',
      owner: 1,
      _id: 1
    },
    {
      image: card02,
      keyword: 'yellowstone',
      date: 'February 19, 2019',
      title: 'Nature makes you better',
      text: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
      source: 'national geographic',
      owner: 1,
      _id: 2
    },
    {
      image: card03,
      keyword: 'nature',
      date: 'October 19, 2020',
      title: 'Grand Teton Renews Historic Crest Trail',
      text: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
      source: 'National parks traveler',
      owner: 1,
      _id: 3
    },
    {
      image: card04,
      keyword: 'parks',
      date: 'October 19, 2020',
      title: 'Nostalgic Photos of Tourists in U.S. National Parks',
      text: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
      source: 'national geographic',
      owner: 1,
      _id: 4
    },
    {
      image: card05,
      keyword: 'photography',
      date: 'March 16, 2020',
      title: 'Scientists Don\'t Know Why Polaris Is So Weird',
      text: 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
      source: 'treehugger',
      owner: 1,
      _id: 5
    },
  ];

  React.useEffect(() => {
    window.addEventListener('resize', handleScreenResize);

    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  React.useEffect(() => {
    handleScreenResize();
  }, []);

  React.useEffect(() => {
    function closedByOverlay(e) {
      if (e.target.classList.contains('popup') ||
          e.target.classList.contains('popup-mobile') ||
          e.target.classList.contains('popup-tooltip')) {
        closeAllPopups();
      }
    };

    document.addEventListener('click', closedByOverlay);

    return () => {
      document.removeEventListener('click', closedByOverlay);
    };
  }, []);

  React.useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  function handleScreenResize() {
    if (window.innerWidth > 630) {
      setIsMobile(false);
      setIsPopupMobileOpen(false);
    } else {
      setIsMobile(true);
    }
  }

  function closeAllPopups() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPopupMobileOpen(false);
  }

  function openLogin() {
    setIsPopupMobileOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPopupSignupOpen(false);
    setIsPopupSigninOpen(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    closeAllPopups();
    history.push('/');
  }

  function openSignup() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(true);
  }

  function openMobileMenu() {
    setIsPopupMobileOpen(true);
  }

  return (
    <div className="page">

      <LoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>

      <Header
        onLogin={openLogin}
        onLogout={handleLogout}
        isMobile={isMobile}
        onClick={openMobileMenu}
      />

      <Switch>
        <Route path="/saved-news">
          <SavedNews
            cards={cards}
            savedCards={savedCards}
          />
        </Route>
        <Route path="/">
          <Main
            isMobile={isMobile}
            cards={cards}
            savedCards={savedCards}
          />
        </Route>
      </Switch>

      <Footer />

      <Login
        isOpen={isPopupSigninOpen}
        onClose={closeAllPopups}
        onSignup={openSignup}
      />

      <Register
        isOpen={isPopupSignupOpen}
        onClose={closeAllPopups}
        onLogin={openLogin}
        />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onLogin={openLogin}
        />

      <MobileMenu
        isOpen={isPopupMobileOpen}
        onClose={closeAllPopups}
        onLogin={openLogin}
        onLogout={handleLogout}
      />

      </CurrentUserContext.Provider>
      </LoggedInContext.Provider>

    </div>
  );
}

export default App;
