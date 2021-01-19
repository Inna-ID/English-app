import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputRenderer from '../Elements/InputRenderer';
import ButtonRenderer from '../Elements/ButtonRenderer';
import LinkRenderer from '../Elements/LinkRenderer';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 25,
      '& > *': {
         marginTop: theme.spacing(1),
         marginBottom: theme.spacing(1),
     },
     '& button': {
        marginTop: 20,
     }
   },
   question: {
      color: "#ccc"
   },
   link: {
      color: "#fff",
      marginLeft: 5,
      borderBottom: '1px solid #fff',
      letterSpacing: '1px'
   }
}));


const Login: React.FC = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const classes = useStyles();

   const submitHandler = (event: React.FormEvent) => {
      event.preventDefault();
   }

   const clickHandle = () => {
      if(email !== '' && password !== '') {
         console.log(`Log in with creds: \n ${email} \n ${password}`)
      } else {
         console.log('check creds');
      }
   }

   return (
      <div className="form-wrap">
      <Typography variant="h4" component="h1" className="main-title">
      Login
      </Typography>
      <form className={classes.root} autoComplete="off" onSubmit={submitHandler}>
         <InputRenderer 
            label="E-mail"
            value={email}
         />
         <InputRenderer 
            label="Password"
            value={password}
         />
         <ButtonRenderer text="Login" clickHandle={clickHandle}/>
      </form>
      <Box mt={2}>
         <Typography variant="body1" component="p" className={classes.question}>
            Do not have an account?
            <LinkRenderer text="Sign up" path="/signup" classNameParam={classes.link}/>
         </Typography>
      </Box>
      </div>
   );
}

export default Login;
