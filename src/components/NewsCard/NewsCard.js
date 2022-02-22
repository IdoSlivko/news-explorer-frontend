import React from "react";
import "./NewsCard.css";
import { useLocation } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";

function NewsCard(props) {
  
  const location = useLocation();
  const isLoggedIn = React.useContext(LoggedInContext);
  const userId = 1;
  const { image, date, title, text, source, owner } = props.card;
  const savedByUser = owner === userId;

  let upperKeyword = "";

  const removeArticleClass = "news-card__label-box news-card__label news-card__label_trash";
  const markedArticleClass = "news-card__label-box news-card__label_save";

  if (location.pathname === "/saved-news") {
    upperKeyword = props.card.keyword.charAt(0).toUpperCase() + props.card.keyword.slice(1);
  }

  return (
    <li className='news-card__container'>
      <div
        className='news-card__image'
        style={{ backgroundImage: `url(${image})` }}>
      </div>

      {location.pathname === "/saved-news" && (
        <div className='news-card__keyword-box'>
          <p className='news-card__keyword'>{upperKeyword}</p>
        </div>
      )}

      <button
        className={
          isLoggedIn && savedByUser
            ? location.pathname === "/saved-news"
              ? removeArticleClass
              : markedArticleClass
            : "news-card__label-box news-card__label"
        }
        type='button'
        title={
					isLoggedIn
						? (location.pathname === "/saved-news" ? undefined : "save article")
						: undefined
        }
        aria-label='save article'
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

      <div className='news-card__content'>
        <p className='news-card__date'>{date}</p>
        <h3 className='news-card__title'>{title}</h3>
        <article className='news-card__text'>{text}</article>
        <p className='news-card__source'>{source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
