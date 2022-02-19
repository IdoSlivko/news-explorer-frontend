import './InfoTooltip.css';

function InfoTooltip(props) {

  return (
    <section className={`popup-tooltip ${props.isOpen ? "popup-tooltip_opened" : undefined}`}>
      <div className="popup-tooltip__container">
				<button className="popup-tooltip__close-button" type="button" aria-label="close modal" onClick={props.onClose}></button>
				<h3 className="popup-tooltip__confirmation">Registration successfully completed!</h3>
				<button className="popup-tooltip__login" type="button" onClick={props.onLogin}>Sign in</button>
      </div>
    </section>
  );
}

export default InfoTooltip;
