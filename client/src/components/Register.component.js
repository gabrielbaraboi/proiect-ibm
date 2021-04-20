import React, { useState } from 'react';

import { useHistory } from 'react-router';
import { register } from "../services/UserServices"
// import NavBar from "./NavBar.component"
import NavBar from "./NavBar/NavBar.component";
import styled from "styled-components";
import { isUserData, getUserData } from "../services/localStorageManagment";

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} type={type} />
    </div>
  );
});

const Form = ({ onSubmit }) => {

  const [role, setRole] = useState('student');

  const emailRef = React.useRef();
  const firstnameRef = React.useRef();
  const lastnameRef = React.useRef();
  const companynameRef = React.useRef();
  const passwordRef = React.useRef();
  const roleRef = React.useRef();
  const dobRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };
    if (roleRef.current.value === 'company') {
      data.companyName = companynameRef.current.value
    }
    else if (roleRef.current.value === 'student') {
      data.firstName = firstnameRef.current.value
      data.lastName = lastnameRef.current.value
      data.DoB = dobRef.current.value
    }
    console.log(data)
    onSubmit(data);
  };


  return (
    <main>
      <NavBar></NavBar>
      <Container>
        <form onSubmit={handleSubmit} >
          <label>Choose role:</label>
          <input type="radio" ref={roleRef} value="student" name="role" id="student" onChange={e => setRole(e.target.value)} checked={role === "student"} />
          <label htmlFor="student">Student</label>
          <input type="radio" ref={roleRef} value="company" name="role" id="company" onChange={e => setRole(e.target.value)} checked={role === "company"} />
          <label htmlFor="company">Company</label>
          {role === "student" &&
            <React.Fragment>
              <Field ref={emailRef} label="Email:" type="text" />
              <Field ref={firstnameRef} label="First name:" type="text" />
              <Field ref={lastnameRef} label="Last name:" type="text" />
              <Field ref={dobRef} label="Date of birth:" type="date" />
              <Field ref={passwordRef} label="Password:" type="password" />
              <div>
                <button type="submit">Submit</button>
              </div>
            </React.Fragment>
          }
          {role === "company" &&
            <React.Fragment>
              <Field ref={emailRef} label="Email:" type="text" />
              <Field ref={companynameRef} label="Company name:" type="text" />
              <Field ref={passwordRef} label="Password:" type="password" />
              <div>
                <button type="submit">Submit</button>
              </div>
            </React.Fragment>
          }
        </form>
      </Container>
    </main>
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
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;