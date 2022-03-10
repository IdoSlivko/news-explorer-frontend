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

import newsApi from '../../utils/NewsApi';
import * as auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const token = localStorage.token;

  const [ isNotFound, setIsNotFound ] = React.useState(false);
  const [ onSearch, setOnSearch ] = React.useState(false);
  const [ isServerError, setIsServerError ] = React.useState(false);
  const [ errorMessage, setErrorMessage ] = React.useState('');
  
  const [ isMobile, setIsMobile ] = React.useState(false);
  const [ isPopupMobileOpen, setIsPopupMobileOpen ] = React.useState(false);
  const [ isPopupSigninOpen, setIsPopupSigninOpen ] = React.useState(false);
  const [ isPopupSignupOpen, setIsPopupSignupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(false);
  
  const history = useHistory();
  
  const [ cards, setCards ] = React.useState([]);
  const [ savedCards, setSavedCards ] = React.useState([]);
  // eslint-disable-next-line
  const [ searchKeyword, setSearchKeyword ] = React.useState('');
  const [ cardListEndPoint, setCardListEndPoint ] = React.useState(3);

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

  // Check for token --> set user info accordingly
  React.useEffect(() => {
    if (localStorage.token) {
      auth.checkToken(localStorage.token)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setIsLoggedIn(true);
      })
      .catch((error) => { console.log(error); });
    }
  }, [token]);

  // Updated token for MainApi to fetch saved articles
  React.useEffect(() => {
    const updatedToken = localStorage.getItem('token');
      mainApi._headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${updatedToken}`,
      };
    // }
  }, [token]);

  // Show user's saved articles
  React.useEffect(() => {
    if (localStorage.token) {
      mainApi.showSavedCards(localStorage.token)
      .then((res) => {
        if (res.length === 0) {
          console.log('There are no saved articles');
        }
        setSavedCards(res);
      })
      .catch((error) => { console.log(error); });
    }
  }, [token]);

  // Keep search keyword + articles when refreshing
  React.useEffect(() => {
    if (localStorage.articles) {
      setCards(JSON.parse(localStorage.getItem('articles')));
      setSearchKeyword(localStorage.getItem('keyword'));
    }
  }, []);

  function searchArticlesByKeyword(keyword) {
    newsApi.getArticles(keyword)
    .then((res) => {
      if (res.articles.length === 0) {
        setOnSearch(false);
        setIsNotFound(true);
        localStorage.removeItem('articles');
        localStorage.removeItem('keyword');
        setCards([]);
      } else {
        setOnSearch(false);
        setIsNotFound(false);
        setSearchKeyword(localStorage.setItem('keyword', keyword));
        localStorage.setItem('articles', JSON.stringify(res.articles));
        setCards(res.articles);
        setCardListEndPoint(3);
      }
    })
    .catch((error) => {
      setOnSearch(false);
      setIsServerError(true);
      localStorage.removeItem('articles');
      localStorage.removeItem('keyword');
      console.log(error);
    });
  }

  function initiatePreLoader(value) {
    setOnSearch(value);
  }

  function handleArticleList(newEndPoint) {
    setCardListEndPoint(newEndPoint);
  }

  function handleRegister(values, resetForm) {
    auth.register(values)
    .then(() => {
      setIsPopupSignupOpen(false);
      resetForm();
      setIsInfoTooltipOpen(true);
    })
    .catch((error) => {
			console.log(error);
      setErrorMessage(error.message.slice(6));
		});
  }
  
  function handleLogin(values, resetForm) {
    auth.authorize(values)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setIsPopupSigninOpen(false);
        resetForm();
        setIsLoggedIn(true);
      }
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.message.slice(6));
    });
  }

  function handleSaveCard(card) {
    isLoggedIn
    ? mainApi.saveArticleToAccount(card, localStorage.keyword)
      .then((res) => {
        const savedCard = {
          keyword: res.keyword,
          title: res.title,
          description: res.text,
          publishedAt: res.date,
          source: res.source,
          url: res.link,
          urlToImage: res.image,
          owner: res.owner,
          _id: res._id,
        }
        setSavedCards(savedCards => [...savedCards, savedCard]);
      })
      .catch((error) => { console.log(error); })
    : setIsPopupSigninOpen(true);
  }

  function handleDeleteCard(cardId) {
    mainApi.deleteArticleFromAccount(cardId)
    .then(() => {
      setSavedCards(savedCards.filter((savedCard) => savedCard._id !== cardId));
    })
    .catch(error => console.log(error));
  }

  function closeAllPopups() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPopupMobileOpen(false);
    setErrorMessage('');
  }

  function openLogin() {
    setIsPopupMobileOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPopupSignupOpen(false);
    setIsPopupSigninOpen(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
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
        isMobile={isMobile}
        onLogin={openLogin}
        onLogout={handleLogout}
        onClick={openMobileMenu}
      />

      <Switch>
        <ProtectedRoute path="/saved-news" loggedIn={isLoggedIn} openLogin={openLogin}>
          <SavedNews
            cards={cards}
            savedCards={savedCards}
            onSaveCard={handleSaveCard}
            onDeleteCard={handleDeleteCard}
          />
        </ ProtectedRoute>
        <Route path="/">
          <Main
            isMobile={isMobile}
            cards={cards}
            savedCards={savedCards}
            onSubmit={searchArticlesByKeyword}
            setPreLoader={initiatePreLoader}
            onSearch={onSearch}
            isNotFound={isNotFound}
            isServerError={isServerError}
            cardListEndPoint={cardListEndPoint}
            setListEndPoint={handleArticleList}
            onSaveCard={handleSaveCard}
            onDeleteCard={handleDeleteCard}
          />
        </Route>
      </Switch>

      <Footer />

      <Login
        isOpen={isPopupSigninOpen}
        onClose={closeAllPopups}
        onSignup={openSignup}
        onSubmit={handleLogin}
        errorMessage={errorMessage}
      />

      <Register
        isOpen={isPopupSignupOpen}
        onClose={closeAllPopups}
        onLogin={openLogin}
        onSubmit={handleRegister}
        errorMessage={errorMessage}
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
