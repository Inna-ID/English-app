import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as LinkRouterDom } from "react-router-dom";

interface LinkRendererProps {
   text: string,
   path: string,
   classNameParam: string
}

const useStyles = makeStyles ({
   root: {
      paddingBottom: '1px',
      '&:hover, &:active': {
        textDecoration: 'none',
      },
   },
});

const LinkRenderer: React.FC<LinkRendererProps> = (props) => {
   const classes = useStyles();

   return (
      <Link 
         component={LinkRouterDom}
         variant="body1"
         to={props.path}
         className={`${classes.root} ${props.classNameParam}`}
      >
         {props.text}
      </Link>
   )
}

export default LinkRenderer;