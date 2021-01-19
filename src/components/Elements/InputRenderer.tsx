import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
   TextField, Radio, RadioGroup, InputLabel, IconButton,
} from '@material-ui/core';

interface InputRendererProps {
   label: string,
   value: string
}

const CustomInput = withStyles({
   root: {
      '& input': {
         boxSizing: 'border-box',
         height: '44px',
         padding: '10px 14px',
         color: '#fff',
      },
      '& fieldset': {
         borderColor: '#fff',
         // '&:hover': {
         //    borderColor: 'rgba(255, 255, 255, .7)'
         // },
      },
      '&:hover $notchedOutline': {
         borderColor: 'rgba(255, 255, 255, .7)'
      },
      '&:focus': {
         
      }
   },
})(TextField);



const useStyles = makeStyles(() => ({
   root: {
      '& .MuiFormLabel-root': {
         color: '#fff',
      },
      '&:hover $notchedOutline': {
         borderColor: 'rgba(255, 255, 255, .7)'
      },
      '& input': {
         lineHeight: '1.24em'
      },
      '& label': {
         transform: 'translate(14px, 14px) scale(1)'
      }
   },
   // focused: {},
   notchedOutline: {}
}));

const InputRenderer: React.FC<InputRendererProps> = (props) => {
   const [value, setValue] = useState<string>('');
   const classes = useStyles();

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
   }

   const keyPressHandler = (event: React.KeyboardEvent) => {
      if(event.key === 'Enter') {
         setValue('')
         console.log(value);
      }
   }

   return (
      <>
         <CustomInput 
            id="outlined-basic"
            classes={{
               root: classes.root,
            }}
            InputProps={{
               classes: {
                  root: classes.root,
                  notchedOutline: classes.notchedOutline
               }
            }}
            // className={classes.root}
            label={props.label}
            variant="outlined"
            value={value}
            onChange={changeHandler}
            onKeyPress={keyPressHandler}
         />
      </>
   );
}

export default InputRenderer;
