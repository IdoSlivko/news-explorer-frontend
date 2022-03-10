import React from "react";
import "./NewsCard.css";
import { Link, useLocation } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";

function NewsCard({ card, savedCards, onSaveCard, onDeleteCard }) {

  const location = useLocation();
  const isLoggedIn = React.useContext(LoggedInContext);

  const {
    urlToImage = card.image,
    publishedAt = card.date,
    title,
    content = card.description,
    text,
    source,
    url = card.link,
  } = card;

  const articleSource = source.name;
  
  const removeArticleClass = "news-card__label-box news-card__label news-card__label_trash";
  const markedArticleClass = "news-card__label-box news-card__label_save";

  const publishDate = new Date(publishedAt);
  const year = publishDate.getFullYear();
  const month = publishDate.toLocaleString('default', { month: 'long' });
  const day = publishDate.getDate();
  const publishedFormat = month + ' ' + day + ', ' + year;

  let upperKeyword = "";
  let markedAsSave = false;

  if (location.pathname === "/saved-news") {
    upperKeyword = card.keyword.charAt(0).toUpperCase() + card.keyword.slice(1);
  }

  function changeCardState() {
    if (markedAsSave) {
      onDeleteCard(card._id);
      markedAsSave = false;
    } else {
      onSaveCard(card);
    }
  }

  function deleteCard() {
    onDeleteCard(card._id);
  }

  function goToSignin() {
    onSaveCard(card);
  }

  // Check if card marches a card from savedCards and set its id
  if (savedCards.length > 0) {
    savedCards.find((savedCard) => {
      if (savedCard.title === card.title) {
        markedAsSave = true;
        card._id = savedCard._id;
      }
      return markedAsSave;
    });
  }

  return (
    <li className='news-card__container'>
      <div
        className='news-card__image'
        style={{ backgroundImage: `url(${urlToImage})` }}>
      </div>

      {location.pathname === "/saved-news" && (
        <div className='news-card__keyword-box'>
          <p className='news-card__keyword'>{upperKeyword}</p>
        </div>
      )}

      <button
        className={
          (isLoggedIn && location.pathname === "/saved-news")
            ? removeArticleClass
            : isLoggedIn && location.pathname === "/"
              ? markedAsSave
                ? markedArticleClass
                : "news-card__label-box news-card__label"
              : "news-card__label-box news-card__label"
        }
        type='button'
        title={
					isLoggedIn
						? (location.pathname === "/saved-news" ? undefined : "save article")
						: undefined
        }
        aria-label='save article'
        onClick={
          isLoggedIn
            ? ( location.pathname === "/" ? changeCardState : deleteCard )
            : goToSignin }
      >
      </button>

      <div
        className={
          isLoggedIn
            ? location.pathname === "/saved-news"
              ? "news-card__label-note"
              : "news-card__label-note news-card__label-note_disabled"
            : "news-card__label-note"
        }>
        <p className='news-card__label-text'>
          {location.pathname === "/saved-news"
            ? "Remove from saved"
            : "Sign in to save articles"}
        </p>
      </div>
      
      <Link className='news-card__article-link' to={{ pathname: url }} target="_blank">
        <div className='news-card__content'>
          <p className='news-card__date'>{publishedFormat}</p>
          <h3 className='news-card__title'>{title}</h3>
          <article className='news-card__text'>{content || text}</article>
          <p className='news-card__source'>{articleSource || source}</p>
        </div>
      </Link>
      
    </li>
  );
}

export default NewsCard;
