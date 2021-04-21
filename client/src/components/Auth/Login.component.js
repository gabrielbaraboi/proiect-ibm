import React from 'react';
import { useHistory } from 'react-router';
import useForm from "../../customHooks/useForm";
import validate from "../../services/ValidationRules";
import { login } from "../../services/UserServices";
import NavBar from "../NavBar/NavBar.component"
import { Container, PageTitle } from "../Global.styledComponents"
import { Box, Label, Control, Field } from "./Auth.styledComponents"
import "./Auth.css"

const Form = ({ onSubmit }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendData, validate);

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
              <button type="submit" className="button is-info is-fullwidth">Login</button>
            </form>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default ({ parentCallback }) => {
  const handleSubmit = data => {
    login(data)
      .then(res => {
        parentCallback(res.data.user);
        history.push("/");
      })
      .catch(err => { console.log(err); });
  };

  const history = useHistory();

  return <Form onSubmit={handleSubmit} />
};