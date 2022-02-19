import './PopupWithForm.css';
import { Link } from 'react-router-dom';

function PopupWithForm(props) {

	const isValid = false;
	
	return (
		<section className={`popup ${props.isOpen ? 'popup_opened' : undefined}`}>
			<div className="popup__container">
				<button className="popup__close-button" type="button" aria-label="close modal" onClick={props.onClose}></button>
				<form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
					<h2 className="popup__title">{props.title}</h2>
					{props.children}
					<span className="popup__email-alert"></span>
					<button className={`popup__submit ${isValid ? 'popup__submit_active' : undefined}`} type="submit" disabled={isValid ? false : true}>{props.submitText}</button>
				</form>
				<div className="popup__log-change">
					<span className="popup__log-span">or&nbsp;</span>
					<Link className="popup__log-link" to="/" onClick={props.onLogChange}>{props.logText}</Link>
				</div>
			</div>
		</section>
	);
}

export default PopupWithForm;
