import { useCallback, useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const handleChange = useCallback(target => {
    const { name, value } = target;
    const valuesInputed = Object.fromEntries(Object
      .entries(values)
      .filter(([key, value]) => key && value));
    const validateValues = { 
      ...valuesInputed,
      [name]: value 
    };
    validate && setError(validate(validateValues));
    setValues(values => ({ 
      ...values,
      [name]: value }));
  }, [validate]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setIsLoading(true);
    const newError = validate ? validate(values) : {};
    if (Object.values(newError).length === 0) {
      onSubmit && await onSubmit(values);
    }
    setError(newError);
    setIsLoading(false);
  }, [validate, onSubmit, values]);
  
  return {
    values,
    isLoading,
    error,
    handleChange,
    handleSubmit
  };
};

export default useForm;
