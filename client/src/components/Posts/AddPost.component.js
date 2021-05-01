import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useForm from "../../customHooks/useForm";
import AddPostValidationRules from "../../services/Validation/AddPostValidationRules";
import { createPost } from "../../services/PostsServices";
import NavBar from "../NavBar/NavBar.component"
import { Container, PageTitle } from "../Global.styledComponents"
import { Box, Label, Control, Field } from "../Auth/Auth.styledComponents"
import { InputRequirements, InputRequirement } from "../Posts/Post.styledComponents"
import "../Auth/Auth.css"

const Form = ({ connectedUser, onSubmit, authError }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendData, AddPostValidationRules);
  const [reqs, setReqs] = useState([])
  let reqInput = React.useRef();

  const removeReq = (i) => {
    const newReqs = [...reqs];
    newReqs.splice(i, 1);
    setReqs(newReqs);
  };

  const inputKeyDown = () => {
    const val = reqInput.value;
    console.log(val);
    if (val.length > 0) {
      if (reqs.find(req => req.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setReqs([...reqs, val]);
      reqInput.value = null;
    }
  }

  function sendData() {
    const data = {
      description: values.description,
      title: values.title,
      programmingLanguage: values.programmingLanguage,
      workHours: values.workHours,
      workPlace: values.workPlace,
      requirements: reqs
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
          <PageTitle>New Post</PageTitle>
          <Box>
            <form onSubmit={handleSubmit}>
              <Field>
                <Label>Post Title</Label>
                <Control>
                  <input autoComplete="off" className={`input ${errors.title && 'is-danger'}`} type="text" name="title" onChange={handleChange} value={values.title || ''} />
                  {errors.title && (
                    <p className="help is-danger">{errors.title}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Post Description</Label>
                <Control>
                  <textarea className={`input ${errors.description && 'is-danger'}`} name="description" rows="5" onChange={handleChange} value={values.description || ''} />
                  {errors.description && (
                    <p className="help is-danger">{errors.description}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Programming Language</Label>
                <Control>
                  <input className={`input ${errors.programmingLanguage && 'is-danger'}`} type="text" name="programmingLanguage" onChange={handleChange} value={values.programmingLanguage || ''} />
                  {errors.programmingLanguage && (
                    <p className="help is-danger">{errors.programmingLanguage}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Work Hours</Label>
                <Control>
                  <select className={`input ${errors.workHours && 'is-danger'}`} type="text" name="workHours" onChange={handleChange} value={values.workHours || ''} >
                    <option>Choose Work Hours</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                  </select>
                  {errors.workHours && (
                    <p className="help is-danger">{errors.workHours}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Work Place</Label>
                <Control>
                  <select className={`input ${errors.workPlace && 'is-danger'}`} type="text" name="workPlace" onChange={handleChange} value={values.workPlace || ''} >
                    <option>Choose Work Place</option>
                    <option value="Timisoara">Timisoara</option>
                    <option value="Bucharest">Bucharest</option>
                  </select>
                  {errors.workPlace && (
                    <p className="help is-danger">{errors.workPlace}</p>
                  )}
                </Control>
              </Field>
              <Field>
                <Label>Requirements</Label>
                <Control>
                  <input className={`input`} type="text" name="req" ref={c => { reqInput = c; }} />
                  <button type="button" onClick={inputKeyDown} className="button is-info">Add Requirement</button>
                  <InputRequirements>
                    {reqs.map((tag, i) => (
                      <InputRequirement key={tag}>
                        {tag}
                        <button type="button" onClick={() => { removeReq(i); }}>+</button>
                      </InputRequirement>
                    ))}
                  </InputRequirements>
                </Control>
              </Field>
              <button type="submit" className="button is-info">Add Post</button>
              <p className="help is-danger">{authError}</p>
            </form>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default () => {
  const [authError, setAuthError] = useState('');
  const history = useHistory();

  const handleSubmit = data => {
    createPost(data)
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        setAuthError(err.response.data.message)
      });
  };

  return <Form onSubmit={handleSubmit} authError={authError} />
};