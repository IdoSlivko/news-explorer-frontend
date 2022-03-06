import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useForm from "../useForm/useForm";

function Register(props) {

	const { values, handleChange, errors, isValid, resetForm } = useForm();

	function handleSubmit(e) {
		e.preventDefault();
		props.onSubmit(values , resetForm);
	}

	return (

		<PopupWithForm
			isOpen={props.isOpen}
			onClose={props.onClose}
			title="Sign up"
			name="register"
			submitText="Sign up"
			onSubmit={handleSubmit}
			onLogChange={props.onLogin}
			logText="Sign in"
			isValid={isValid}
			errorMessage={props.errorMessage}
			>

			<h3 className="popup__input-subtitle">Email</h3>
			<input
				className="popup__input"
				type="email"
				name="email"
				value={values.email || ''}
				onChange={handleChange}
				placeholder="Enter email"
				required
			/>
			<span	className="popup__input-error-msg">{errors.email}</span>

			<h3 className="popup__input-subtitle">Password</h3>
			<input
				className="popup__input"
				type="password"
				name="password"
				value={values.password || ''}
				onChange={handleChange}
				placeholder="Enter password"
				minLength={3}
				required
			/>
			<span	className="popup__input-error-msg">{errors.password}</span>

			<h3 className="popup__input-subtitle">Username</h3>
			<input
				className="popup__input"
				type="text"
				name="name"
				value={values.name || ''}
				onChange={handleChange}
				placeholder="Enter your username"
				minLength={2}
				maxLength={30}
				required
			/>
			<span	className="popup__input-error-msg">{errors.username}</span>
		
		</PopupWithForm>
	);
}

export default Register;
