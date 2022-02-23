import './NotFound.css';

function NotFound() {

	return (
		<div className="notFound">
			<div className="notFound__icon"></div>
			<h3 className="notFound__header">Nothing found</h3>
			<p className="notFound__text">Sorry, but nothing matched your search terms.</p>
		</div>
	);
}

export default NotFound;
