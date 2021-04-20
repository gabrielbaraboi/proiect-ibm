import React from 'react';
import { useHistory } from 'react-router';
import { login } from "../services/UserServices";
import NavBar from "./NavBar/NavBar.component";

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
  const passwordRef = React.useRef();
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    onSubmit(data);
  };
  return (
    <div>
      <NavBar></NavBar>
    <form onSubmit={handleSubmit} >
      <Field ref={emailRef} label="Email:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};


export default ({ parentCallback}) => {
  const handleSubmit = data => {
    login(data)
      .then(res => {
        parentCallback(res.data.user);
        history.push("/");
      })
      .catch(err => { console.log(err); });
      
  };

  const history = useHistory();
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
};