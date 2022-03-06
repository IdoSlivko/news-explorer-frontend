import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
	cards,
	savedCards,
	cardListEndPoint,
	setListEndPoint,
	onSaveCard,
	onDeleteCard,
}) {

	const location = useLocation();

	function increaseCardListEndPoint() {
		setListEndPoint(cardListEndPoint + 3);
	}

	return (
		<div className="news-card-list">
			<div className="news-card-list__content">
				{ location.pathname === "/saved-news"
					? undefined
					: cards.length > 0 && <h3 className="news-card-list__header">Search results</h3>
					}
				{ (location.pathname === "/saved-news" && savedCards.length > 0) &&
					<ul className="news-card-list__container">
						{savedCards.map((card) => {
							return (
								<NewsCard
									card={card}
									key={savedCards.indexOf(card)}
									onSaveCard={onSaveCard}
									onDeleteCard={onDeleteCard}
									savedCards={savedCards}
								/>
							);
						})}
					</ul> }
				{ (location.pathname === "/" && cards.length > 0) &&
					<ul className="news-card-list__container">
						{cards.slice(0, `${cardListEndPoint}`).map((card) => {
							return (
								<NewsCard
									card={card}
									key={cards.indexOf(card)}
									onSaveCard={onSaveCard}
									onDeleteCard={onDeleteCard}
									savedCards={savedCards}
								/>
							);
						})}
					</ul> }
				{ location.pathname === "/saved-news" || cards.length < cardListEndPoint
					? undefined
					: cards.length > 0 && <button className="news-card-list__button" onClick={increaseCardListEndPoint}>Show more</button>
					}
			</div>
		</div>
	);
}

export default NewsCardList;
