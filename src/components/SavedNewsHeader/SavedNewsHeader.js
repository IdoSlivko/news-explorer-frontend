import React from "react";
import './SavedNewsHeader.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards }) {

	const user = React.useContext(CurrentUserContext);

	let keywords = '';
	const keywordsList = [];

	savedCards.forEach(card => { keywordsList.push(card.keyword); });
	  // eslint-disable-next-line
	const sortKeywordsList = keywordsList.reduce((recent, current) => (recent[current] = (recent[current] || 0) + 1, recent), {});
	const orderedKeywordsList = Object.keys(sortKeywordsList).sort((a,b) => sortKeywordsList[b] - sortKeywordsList[a]); 
	
	const orderedKeywordsListUpper = [];
	orderedKeywordsList.forEach((item) => {
		const newItem = item.charAt(0).toUpperCase() + item.slice(1);
		orderedKeywordsListUpper.push(newItem);
	});

	if (orderedKeywordsListUpper.length > 3) {
		const firstItems = orderedKeywordsListUpper.slice(0, 2).join(', ').toString();
		keywords = firstItems + ' and ' + (orderedKeywordsListUpper.length - 2) + ' other';
	} else if (orderedKeywordsListUpper.length <= 3) {
		keywords = orderedKeywordsListUpper.join(", ").toString();
	}

	return (
		<div className="saved-news-header__container">
			<p className="saved-news-header">Saved articles</p>
			<h3 className="saved-news-header__header">{user.name}, you have {savedCards.length} saved articles</h3>
			<p className="saved-news-header__keywords">By keywords: <b>{keywords}</b></p>
		</div>
	);
}

export default SavedNewsHeader;
