import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
// import NotFound from '../NotFound/NotFound';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main({ cards, savedCards, isMobile }) {

	return (
		<div className="main">
			<SearchForm
				isMobile={isMobile}
			/>
			{/* <Preloader /> */}
			{/* <NotFound /> */}
			<NewsCardList
				cards={cards}
				savedCards={savedCards}
			/>
			<About />
		</div>
	);
}

export default Main;
