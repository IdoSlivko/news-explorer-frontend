import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ cards, savedCards }) {

	const location = useLocation();

	return (
		<div className="news-card-list">
			{ location.pathname === "/saved-news"
				? undefined
				: <h3 className="news-card-list__header">Search results</h3>
				}
			<ul className="news-card-list__container">
				{ location.pathname === "/saved-news"
						? savedCards.map((card) => {
							return (
								<NewsCard
									card={card}
									key={card._id}
								/>
							);
						})
						:
						cards.slice(0, 3).map((card) => {
							return (
								<NewsCard
									card={card}
									key={card._id}
								/>
							);
						})
					}
			</ul>
			{ location.pathname === "/saved-news"
				? undefined
				: <button className="news-card-list__button">Show more</button>
				}
		</div>
	);
}

export default NewsCardList;
