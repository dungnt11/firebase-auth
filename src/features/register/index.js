import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Input } from 'antd';
import {
  setUsername,
  setPassword,
  registerAsync,
} from './store';

export function Register() {
  const register = useSelector((root) => root.register);
  const {
    email,
    password,
    error,
    loading,
  } = register;
  const dispatch = useDispatch();

  function changeEmail({ target }) {
    dispatch(setUsername(target.value));
  }

  function changePassword({ target }) {
    dispatch(setPassword(target.value));
  }

  async function registerFn() {
    await dispatch(registerAsync({ email, password }));
  }

  return (
    <div>
      <Input
        placeholder="Email"
        value={email}
        type="email"
        onChange={changeEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={changePassword}
      />

      <Button
        onClick={registerFn}
        type="primary"
        loading={loading}
      >
        Register
      </Button>
      { error ? (<Alert message={error} type="error" />) : null }
    </div>
  );
}
