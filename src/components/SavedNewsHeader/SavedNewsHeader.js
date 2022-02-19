import React from "react";
import './SavedNewsHeader.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedCards }) {

	const userName = React.useContext(CurrentUserContext);
	// const userName = 'Elise';

	let keywords = '';
	const keywordsList = [];
	let uniqueKeywordsList = [];
	const uniqueKeywordsListUpper = [];

	savedCards.forEach(card => {
		keywordsList.push(card.keyword);
		uniqueKeywordsList = [...new Set(keywordsList)];
	});

	uniqueKeywordsList.forEach((item) => {
		const newItem = item.charAt(0).toUpperCase() + item.slice(1);
		uniqueKeywordsListUpper.push(newItem);
	});

	if (uniqueKeywordsListUpper.length > 2) {
		const twoFirstItems = uniqueKeywordsListUpper.slice(0, 2).join(", ").toString();
		keywords = twoFirstItems + ' and ' + (uniqueKeywordsListUpper.length - 2) + ' other';
	} else if (uniqueKeywordsListUpper.length <= 2) {
		keywords = uniqueKeywordsListUpper.join(", ").toString();
	}

	return (
		<div className="saved-news__header-container">
			<p className="saved-news">Saved articles</p>
			<h3 className="saved-news__header">{userName}, you have {savedCards.length} saved articles</h3>
			<p className="saved-news__keywords">By keywords: <b>{keywords}</b></p>
		</div>
	);
}

export default SavedNewsHeader;
