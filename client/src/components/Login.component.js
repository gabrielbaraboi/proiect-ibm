import React from 'react';
import axios from 'axios';

import { useHistory } from 'react-router';


const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} type={type}/>
      </div>
    );
});
const Form = ({onSubmit}) => {
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
      <form onSubmit={handleSubmit} >
        <Field ref={emailRef} label="Email:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
};
export default () =>
{

  const history = useHistory();
  const handleSubmit = data => {
    axios
    .post('http://localhost:9000/users/login',data,{withCredentials: true})
    .then(res => {
        console.log(res.data);
        history.push("/");
        
    })
  .catch(err => {console.log(err);});
};
    return (
        <div>
        <Form onSubmit={handleSubmit} />
        </div>
    )
}