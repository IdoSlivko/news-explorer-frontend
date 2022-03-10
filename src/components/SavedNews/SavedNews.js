import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ cards, savedCards, onSaveCard, onDeleteCard }) {

	return (
		<div className="saved-news">
			<SavedNewsHeader
				savedCards={savedCards}
			/>
			<NewsCardList
				cards={cards}
				savedCards={savedCards}
				onSaveCard={onSaveCard}
				onDeleteCard={onDeleteCard}
			/>
		</div>
	);
}

export default SavedNews;
