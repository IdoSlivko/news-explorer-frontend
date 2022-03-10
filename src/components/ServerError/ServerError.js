import './ServerError.css';

function ServerError() {

	return (
		<div className="server-error">
			<h3 className="server-error__header">Sorry, something went wrong during the request.</h3>
			<p className="server-error__text">There may be a connection issue or the server may be down.</p>
			<p className="server-error__text">Please try again later.</p>
		</div>
	);
}

export default ServerError;
