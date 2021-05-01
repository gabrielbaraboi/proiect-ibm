import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useForm from "../../customHooks/useForm";
import LoginValidationRules from "../../services/Validation/LoginValidationRules";
import { login } from "../../services/UserServices";
import NavBar from "../NavBar/NavBar.component"
import { Container, PageTitle } from "../Global.styledComponents"
import { Box, Label, Control, Field } from "./Auth.styledComponents"
import "./Auth.css"

const Form = ({ onSubmit, authError }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendData, LoginValidationRules);

  function sendData() {
    const data = {
      email: values.email,
      password: values.password
    }
    onSubmit(data);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Container>
          <PageTitle>Login</PageTitle>
          <Box>
            <form onSubmit={handleSubmit}>
              <Field>
                <Label>Email Address</Label>
                <Control>
                  <input autoComplete="off" className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Password</Label>
                <Control>
                  <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} />
                  {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
                </Control>
              </Field>
              <button type="submit" className="button is-info">Login</button>
              <p className="help is-danger">{authError}</p>
            </form>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default ({ parentCallback }) => {
  const [authError, setAuthError] = useState('');
  const history = useHistory();

  const handleSubmit = data => {
    login(data)
      .then(res => {
        parentCallback(res.data.user);
        history.push("/");
      })
      .catch(err => {
        setAuthError(err.response.data.message)
      });
  };

  return <Form onSubmit={handleSubmit} authError={authError} />
};