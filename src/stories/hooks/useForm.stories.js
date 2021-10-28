import React from 'react';
import useForm from '@hooks/useForm';

export default {
  title: 'Hook/useForm'
};

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

export const Default = () => {
  const { isLoading, error, handleSubmit, handleChange } = useForm({
    initialValues: {
      id: '',
      password: ''
    },
    async onSubmit(values) {
      await sleep(1000);
      alert(JSON.stringify(values));
    },
    validate({ id, password }) {
      const errors = {};
      if (!id) errors.id = 'id를 입력해주세요';
      if (!password) errors.password = '비밀번호를 입력해주세요';
      
      return errors;
    }
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>signUp</h1>
      <div>
        <input name="id" type="text" placeholder="ID" onChange={handleChange} />
        {error.id}
      </div>
      <div>
        <input name="password" type="password" placeholder="password" onChange={handleChange} />
        {error.password}
      </div>
      <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
  
};
