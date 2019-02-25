import React from 'react';
import SimpleSnackbar from './Snackbar';

const AppFooter = (props) => (<SimpleSnackbar showSnack={props.showSnack} message={props.messagenode }/>);

export default AppFooter;