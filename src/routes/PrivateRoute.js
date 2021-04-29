import React from 'react'; 
import { Route }  from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setLogInOut } from '../containers/App/actions';

const PrivateRoute = (props) => {
    const [auth, setAuth] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if(props.isLoggedIn && localStorage.token) {
        // if(localStorage.token) {

            console.log('isLogged && TOKEN')

            setAuth(true)
            setLoaded(true)
        } 
        else if(localStorage.token) {
            console.log('just TOKEN');

            props.setLogInOut(true);

            setAuth(true)
            setLoaded(true)

        }
        else {
            setLoaded(true)

            console.log('NO TOKEN');

            props.history.push("/")
        }
    },[props.isLoggedIn]); 

    return (
        <React.Fragment>
            {loaded && auth &&
            <Route
                {...props}
                component={props.component} /> } 
        </React.Fragment>
    );
} 
const mapStateToProps = state => ({
    isLoggedIn: state.app.isLoggedIn
})
export default withRouter(connect(mapStateToProps, { setLogInOut })(PrivateRoute));