import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuth = useSelector(state=>state.isAuth.isAuth);
    const isLoged= localStorage.getItem("isAuth")
    console.log(isLoged);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoged?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;