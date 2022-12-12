import { createContext, SetStateAction, useEffect, useReducer, useState } from 'react';
import { AllPostsInitialState, FetchAllDataReducer, FetchDetailsActionTypes, IAllPosts } from '../reducers/post-details.reducer';
import { Data, deleteData, getDataByID, updateData } from '../api/API';
import { errorTypes } from '../utils/types/types';
import { useValidator } from '../hooks/useValidation';

type PostDetailContextProviderProps = {
  children: React.ReactNode
}

export type PostDetailContextType = {
  edit: boolean
  setEdit: React.Dispatch<SetStateAction<boolean>>
  form: {
		title: string,
		body: string
	},
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  setForm: React.Dispatch<SetStateAction<{ title: string; body: string; }>>
  state: IAllPosts
  dispatch: React.Dispatch<FetchDetailsActionTypes>
  setPostDetailID: React.Dispatch<React.SetStateAction<string>>
  onSubmitEdit: (event: React.FormEvent<HTMLFormElement>) => void,
  onSubmitDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  errors: errorTypes
}

export const PostDetailContext = createContext<PostDetailContextType | null >(null);

export const PostDetailProvider = ({children}: PostDetailContextProviderProps) => {
  const [postDetailID, setPostDetailID] = useState('');
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    body: ''
  });
  const [state, dispatch] = useReducer<(state: IAllPosts,  actions: FetchDetailsActionTypes) => (any)>(FetchAllDataReducer, AllPostsInitialState);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const postDetail = await getDataByID(Data.POSTS, postDetailID);
      dispatch({type: 'FECTH_SUCCESS_DATA_BY_ID', payload: postDetail})
    }
    fetchPostDetails();
  }, [postDetailID]);

  const resetEditField = () => {
    setForm({
      title: '',
      body: ''
    });
    setEdit(false);
  }

  const { errors, validateForm } = useValidator(form);

  // Can be imporved updated request works, but validation doesn't work properly
  const onSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid } = validateForm({form, errors, forceTouchErrors: true });
    setForm({
      title: form.title == '' ? state.data.title : form.title,
      body: form.body == '' ? state.data.body : form.body,
    });

    const editFormObj = {
      ...form,
      id: postDetailID,
      userId: 1
    }

    if (isValid) {
      updateData(Data.POSTS, editFormObj, postDetailID);
      resetEditField();
      setOpen(true);
    }
  }

  const onSubmitDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    deleteData(Data.POSTS, postDetailID);
    setOpen(true);
  }

  // Can be improved put values in single variable
  return (
    <PostDetailContext.Provider value={{edit, setEdit, form, setForm, state, dispatch, setPostDetailID, open, setOpen, errors, onSubmitEdit, onSubmitDelete}} >
      {children}
    </PostDetailContext.Provider>
  )
}