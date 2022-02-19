import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ cards, savedCards }) {

	return (
		<div className="saved-news__container">
			<SavedNewsHeader
				savedCards={savedCards}
			/>
			<NewsCardList
				cards={cards}
				savedCards={savedCards}
			/>
		</div>
	);
}

export default SavedNews;
