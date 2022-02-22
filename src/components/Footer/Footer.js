import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {

	return (
		<footer className="footer">
			<div className="footer__copyright">© 2021 Supersite, Powered by News API</div>
			<nav className="footer__navbar">
				<div className="footer__homepage">
					<Link className="footer__link" to="/">Home</Link>
					<Link className="footer__link" to={{ pathname: "https://practicum.yandex.com/" }} target="_blank">Practicum by Yandex</Link>
				</div>
				<div className="footer__social">
					<Link className="footer__icon footer__git" to={{ pathname: "https://github.com/IdoSlivko/" }} target="_blank"></Link>
					<Link className="footer__icon footer__facebook" to={{ pathname: "https://www.facebook.com/" }} target="_blank"></Link>
				</div>
			</nav>
		</footer>
	);
}

export default Footer;
