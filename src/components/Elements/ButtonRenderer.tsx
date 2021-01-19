import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface ButtonRendererProps {
   text: string,
   clickHandle(): void
}

const CustomButton = withStyles({
   root: {
      boxShadow: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'rgba(255, 255, 255, .35)',
      borderColor: 'transparent',
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, .5)',
         borderColor: 'transparent',
         boxShadow: '2px 2px 20px 2px rgba(0, 0, 0, .1)'
      },
   },
})(Button);

const ButtonRenderer: React.FC<ButtonRendererProps> = (props) => {

   return (
      <CustomButton variant="contained" color="primary" onClick={props.clickHandle}>
         {props.text}
      </CustomButton>
   )
}

export default ButtonRenderer;