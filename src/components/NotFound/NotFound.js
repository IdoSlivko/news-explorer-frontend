import './NotFound.css';

function NotFound() {

	return (
		<div className="notFound__container">
			<div className="notFound__icon"></div>
			<h3 className="notFound">Nothing found</h3>
			<p className="notFound__text">Sorry, but nothing matched your search terms.</p>
		</div>
	);
}

export default NotFound;
