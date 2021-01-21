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
      marginTop: 15,
      '& > *': {
         marginTop: theme.spacing(2),
         marginBottom: theme.spacing(2),
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
   const [isEmailValid, setIsEmailValid] = useState(false)
   const [emailErrorText, setEmailErrorText] = useState('');
   const [password, setPassword] = useState('');
   const [isPasswordValid, setIsPasswordValid] = useState(false);
   const [passwordErrorText, setPasswordErrorText] = useState('');
   const classes = useStyles();

   const submitHandler = async () => {
      if(! validateForm()) {
         return;
      }
      const user = {
         email,
         password
      }
      console.log(`user email: ${email}, user password: ${password}`)
      //await fetchPostData('/api/auth/login', user, successCallback, errorCallback);
   }
   // const successCallback = (result: object) => {
   //    history.push('/other_page');
   // };
      // const errorCallback = ({message}: string) => {
   //    console.log(message);
   // };

   const validateForm = () => {
      if(email !== '' && password !== '') {
         ///setIsEmailValid  setIsPasswordValid
         return true;
      } else {
         console.log('check creds');
         ///setIsEmailValid  setIsPasswordValid
         return false;
      }
   }

   return (
      <div className="form-wrap">
      <Typography variant="h4" component="h1" className="main-title">
      Login
      </Typography>
      <form className={classes.root} autoComplete="off">
         <InputRenderer 
            id="login-email"
            name='email'
            type='email'
            label="E-mail"
            value={email}
            changeValueCallback={setEmail}
            // isValid={isEmailValid}
            // setIsValid={setIsEmailValid}
            errorText={emailErrorText}
            // setErrorText={setEmailErrorText}
         />
         <InputRenderer
            id="login-password"
            name='password'
            type='password'
            label="Password"
            value={password}
            changeValueCallback={setPassword}
            errorText={passwordErrorText}
         />
         <ButtonRenderer text="Login" submitHandler={submitHandler}/>
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
