import './SearchForm.css'

function SearchForm(props) {

	const isMobile = props.isMobile;
	const input = <input className="search__input" type="text" name="keyword" placeholder="Enter topic" maxLength={500} required />;

	return (
		<form className="search">
			<h1 className="search__title">What's going on in the world?</h1>
			<h3 className="search__subtitle">Find the latest news on any topic and save them in your personal account.</h3>
			<div className="search__box">
				{ isMobile ?
					<div className="search__input-box">
						{input}
					</div>
					:
					input
				}
				<button className="search__button" type="submit">Search</button>
			</div>
		</form>
	);
}

export default SearchForm;
