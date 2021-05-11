import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
   TextField, Radio, RadioGroup, InputLabel, IconButton,
} from '@material-ui/core';

interface InputRendererProps {
   id: string,
   name: string,
   type: string,
   label: string,
   value: string,
   changeValueCallback(value: string): void,
   // isValid: boolean,
   errorText: string,
   tip?: string
   // setIsValid(): boolean
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
      },
      '& .MuiFormHelperText-contained': {
         marginLeft: 5,
         marginRight: 5,
         lineHeight: 1.24,
         color: '#ffbbb6'
      }
   },
})(TextField);



const useStyles = makeStyles(() => ({
   root: {
      '& .MuiFormLabel-root': {
         color: '#fff',
      },
      '&:hover $notchedOutline, &:focus $notchedOutline': {
         borderColor: 'rgba(255, 255, 255, .7)'
      },
      '&.Mui-focused $notchedOutline': {
         borderColor: 'rgba(255, 255, 255, .7)'
      },
      '& input': {
         lineHeight: '1.24em'
      },
      '& label': {
         transform: 'translate(14px, 14px) scale(1)'
      }
   },
   notchedOutline: {}
}));

const InputRenderer: React.FC<InputRendererProps> = (props) => {
   const [value, setValue] = useState<string>('');
   const classes = useStyles();
   const tip = props.tip ? props.tip : ' ';

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      props.changeValueCallback(event.target.value)
   }

   // const keyPressHandler = (event: React.KeyboardEvent) => {
   //    if(event.key === 'Enter') {
   //       setValue('')
   //       console.log(value);
   //    }
   // }

   return (
      <>
         <CustomInput 
            id={props.id}
            classes={{
               root: classes.root,
            }}
            InputProps={{
               classes: {
                  root: classes.root,
                  notchedOutline: classes.notchedOutline
               }
            }}
            name={props.name}
            type={props.type}
            label={props.label}
            variant="outlined"
            value={value}
            onChange={changeHandler}
            // onKeyPress={keyPressHandler}
            error={(props.errorText !== '' && props.errorText !== undefined)}
            helperText={props.errorText ? props.errorText : tip}
         />
         {/* <span className="error-text"></span> */}
      </>
   );
}

export default InputRenderer;
