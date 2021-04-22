import React, { useState } from 'react';
import useForm from "../../customHooks/useForm";
import RegisterValidationRules from "../../services/RegisterValidationRules";
import { useHistory } from 'react-router';
import { register } from "../../services/UserServices"
import NavBar from "../NavBar/NavBar.component";
import { Container, PageTitle } from "../Global.styledComponents"
import { Box, Label, Control, Field } from "./Auth.styledComponents"
import "./Auth.css";

const Form = ({ onSubmit }) => {
  const [role, setRole] = useState('student');

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendData, RegisterValidationRules);

  function sendData() {
    const data = {
      email: values.email,
      password: values.password,
      role: role,
    };

    if (role === 'company') {
      data.companyName = values.companyName
    }
    if (role === 'student') {
      data.firstName = values.firstName
      data.lastName = values.lastName
      data.DoB = values.DoB
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
          <PageTitle>Register</PageTitle>
          <Box>
            <form onSubmit={handleSubmit}>
              <input type="radio" className={`input-radio`} value={values.role || 'student'} name="role" id="student" onChange={e => setRole(e.target.value)} checked={role === "student"} />
              <label htmlFor="student">Student</label>
              <input type="radio" className={`input-radio`} value={values.role || 'company'} name="role" id="company" onChange={e => setRole(e.target.value)} checked={role === "company"} />
              <label htmlFor="company">Company</label>
              {role === "student" &&
                <>
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
                    <Label>First Name</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.firstName && 'is-danger'}`} type="text" name="firstName" onChange={handleChange} value={values.firstName || ''} />
                      {errors.firstName && (
                        <p className="help is-danger">{errors.firstName}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Last Name</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.lastName && 'is-danger'}`} type="text" name="lastName" onChange={handleChange} value={values.lastName || ''} />
                      {errors.lastName && (
                        <p className="help is-danger">{errors.lastName}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Date Of Birth</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.DoB && 'is-danger'}`} type="date" name="DoB" onChange={handleChange} value={values.DoB || ''} />
                      {errors.DoB && (
                        <p className="help is-danger">{errors.DoB}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Password</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} />
                      {errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Confirm Password</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.confirmPassword && 'is-danger'}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} />
                      {errors.confirmPassword && (
                        <p className="help is-danger">{errors.confirmPassword}</p>
                      )}
                    </Control>
                  </Field>
                  <button type="submit" className="button is-info">Register</button>
                </>
              }
              {role === "company" &&
                <>
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
                    <Label>Company Name</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.companyName && 'is-danger'}`} type="text" name="companyName" onChange={handleChange} value={values.companyName || ''} />
                      {errors.companyName && (
                        <p className="help is-danger">{errors.companyName}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Password</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} />
                      {errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Confirm Password</Label>
                    <Control>
                      <input autoComplete="off" className={`input ${errors.confirmPassword && 'is-danger'}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} />
                      {errors.confirmPassword && (
                        <p className="help is-danger">{errors.confirmPassword}</p>
                      )}
                    </Control>
                  </Field>
                  <button type="submit" className="button is-info">Register</button>
                </>
              }
            </form>
          </Box>
        </Container>
      </main>
    </>
  );
};


export default () => {
  const handleSubmit = data => {
    register(data)
      .then(() => {
        history.push("/login");
      })
      .catch(err => { console.log(err); });
  };

  const history = useHistory();

  return <Form onSubmit={handleSubmit} />
}