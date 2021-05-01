export default function AddPostValidationRules(values) {
  let errors = {};

  if (!values.title) {
    errors.title = 'Title is required';
  } else if (values.title.length < 5) {
    errors.title = 'Title must be 5 or more characters';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 5) {
    errors.description = 'Description must be 5 or more characters';
  }

  if (!values.workHours) {
    errors.workHours = 'Work hours is required';
  } 

  if (!values.workPlace) {
    errors.workPlace = 'Work place is required';
  } 

  if (!values.programmingLanguage) {
    errors.programmingLanguage = 'Programming language is required';
  } 

  return errors;
};