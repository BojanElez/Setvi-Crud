import { FC } from 'react';
import { TextField } from '@mui/material';

type InputProp = {
	onChange?: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  defaultValue?: string | undefined;
	placeholder: string;
  variant: 'filled';
  id: string | undefined;
  name: string;
	type: string;
}

export const Input:FC<InputProp> = ({...otherProps}) => {
  return (
    <>
      <TextField {...otherProps} />
    </>
  )
}