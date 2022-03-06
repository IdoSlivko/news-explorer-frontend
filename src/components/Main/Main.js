import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import ServerError from '../ServerError/ServerError';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({
	cards,
	savedCards,
	isMobile,
	onSubmit,
	setPreLoader,
	onSearch,
	isNotFound,
	isServerError,
	cardListEndPoint,
	setListEndPoint,
	onSaveCard,
	onDeleteCard,
}) {

	return (
		<div className="main">
			<SearchForm
				isMobile={isMobile}
				onSubmit={onSubmit}
				setPreLoader={setPreLoader}
			/>
			{ onSearch && <Preloader /> }
			{ isNotFound && <NotFound /> }
			{ isServerError && <ServerError /> }
			<NewsCardList
				cards={cards}
				savedCards={savedCards}
				cardListEndPoint={cardListEndPoint}
				setListEndPoint={setListEndPoint}
				onSaveCard={onSaveCard}
				onDeleteCard={onDeleteCard}
			/>
			<About />
		</div>
	);
}

export default Main;
