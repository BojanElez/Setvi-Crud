import Button from '@mui/material/Button/Button';
import { ButtonProps } from '@mui/material/Button/Button';

export const ButtonComponent = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) => {
  const {buttonLabel, ...otherProps } = props;
  return (
    <>
      <Button {...otherProps}>{buttonLabel}</Button>
    </>
  )
}
