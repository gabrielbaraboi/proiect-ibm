import React from 'react';

import { useHistory } from 'react-router';
import { register } from "../services/UserServices"

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} type={type} />
    </div>
  );
});

const Form = ({ onSubmit }) => {
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
    if(roleRef.current.value === 'company') {
      data.companyName = companynameRef.current.value
    }
    else if(roleRef.current.value === 'student') {
      data.firstName = firstnameRef.current.value
      data.lastName = lastnameRef.current.value
      data.DoB = dobRef.current.value
    }
    console.log(data)
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit} >
      <Field ref={emailRef} label="Email:" type="text" />
      <Field ref={firstnameRef} label="First name:" type="text" />
      <Field ref={lastnameRef} label="Last name:" type="text" />
      <Field ref={companynameRef} label="Company name:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <Field ref={dobRef} label="Date of birth:" type="date" />
      <select ref={roleRef}>
        <option>Choose Role</option>
        <option value='student'>Student</option>
        <option value='company'>Company</option>
      </select>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
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