import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const handleChange = ({ target }) => {
    const [name, value] = target;
    setValues({ 
      ...values,
      [name]: value 
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const newError = validate ? validate(values) : {};
    if (Object.values(newError).length === 0) {
      await onSubmit(values);
    }
    setError(newError);
    setIsLoading(false);
  };
  
  return {
    values,
    isLoading,
    error,
    handleChange,
    handleSubmit
  };
};

export default useForm;
