import { createContext, SetStateAction, useState } from 'react';
import { addData, Data } from '../api/API';
import { useValidator } from '../hooks/useValidation'
import { errorTypes } from '../utils/types/types';

type AddPostContextProviderProps = {
  children: React.ReactNode
}

export type AddPostContextType = {
  form: {
		title: string,
		body: string
	}
  setForm: React.Dispatch<SetStateAction<{ title: string; body: string; }>>
  onSubmitAddPosts: (event: React.FormEvent<HTMLFormElement>) => void,
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>
  errors: errorTypes
}

export const AddPostContext = createContext<AddPostContextType | null>(null);

export const AddPostProvider = ({children}: AddPostContextProviderProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm]= useState({
    title: '',
    body: ''
  });

  const { errors, validateForm } = useValidator(form);

  const onSubmitAddPosts = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });

    const postFormObj = {
      title: form.title,
      body: form.body,
      userId: 1,
    }
    if (isValid) {
      addData(Data.POSTS, postFormObj);
      setOpen(true);
    }

    return
  }

  return (
    <AddPostContext.Provider value={{form, setForm, onSubmitAddPosts, open, setOpen, errors}} >
      {children}
    </AddPostContext.Provider>
  )
}