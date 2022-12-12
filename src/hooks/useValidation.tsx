import { useState } from 'react';
import { errorTypes, PostObjectType } from '../utils/types/types';
import {
  titleValidator,
  bodyValidator,
} from '../utils/validators';

type validateFormType = {
	errors: errorTypes
	field?: string | undefined
	form: PostObjectType
	forceTouchErrors?: boolean
}

const touchErrors = (errors: errorTypes) => {
  return Object.entries(errors).reduce((acc:any, [field, fieldError]) => {

    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useValidator = (form: PostObjectType) => {
  const [errors, setErrors] = useState({
    title: {
      dirty: false,
      error: false,
      message: '',
    },
    body: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }:validateFormType) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { title, body } = form;

    // Conditon for adding title error
    if (nextErrors.title.dirty && (field ? field === 'title' : true)) {
      const titleMessage = titleValidator(title);
      nextErrors.title.error = !!titleMessage;
      nextErrors.title.message = titleMessage;
      if (titleMessage) {
        isValid = false;
      }
    }

    // Conditon for adding body error
    if (nextErrors.body.dirty && (field ? field === 'body' : true)) {
      const bodyMessage = bodyValidator(body);
      nextErrors.body.error = !!bodyMessage;
      nextErrors.body.message = bodyMessage;
      if (bodyMessage) {
        isValid = false;
      }
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  return {
    validateForm,
    errors,
  };
};