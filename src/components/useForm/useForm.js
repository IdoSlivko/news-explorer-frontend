import React, { useCallback } from 'react';

function useForm() {

  const [ values, setValues ] = React.useState({ email: '', password: '', name: '' });
  const [ errors, setErrors ] = React.useState({});
  const [ isValid, setIsValid ] = React.useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
		const sanitizedValue = value.replace( /[*|"<>[\](){}`';:&$=+]+/, '' );
    setValues({...values, [name]: sanitizedValue});
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [ setValues, setErrors, setIsValid ]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export default useForm;
