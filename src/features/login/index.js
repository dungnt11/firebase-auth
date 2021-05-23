import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Input } from 'antd';
import {
  setUsername,
  setPassword,
  loginAsync,
  getInfoUserAsync,
} from './store';

export function Login() {
  const login = useSelector((root) => root.login);
  const {
    email,
    password,
    error,
    loading,
  } = login;
  const dispatch = useDispatch();

  function changeEmail({ target }) {
    dispatch(setUsername(target.value));
  }

  function changePassword({ target }) {
    dispatch(setPassword(target.value));
  }

  async function loginFn() {
    const emailUserLogined = await dispatch(loginAsync({ email, password }));
    const res1 = await dispatch(getInfoUserAsync({ email: emailUserLogined.payload }));
    console.log(res1);
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
        onClick={loginFn}
        type="primary"
        loading={loading}
      >
        Login
      </Button>
      <Button onClick={() => console.log(login)}>get store</Button>
      { error ? (<Alert message={error} type="error" />) : null }
    </div>
  );
}
