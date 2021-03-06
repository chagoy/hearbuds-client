import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import { Link } from 'react-router-dom';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const zipLength = length({min:5, max:5});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

    onSubmit(values) {
        // grabs username, password and zipcode and from redux form
        const { username, password, zip, email } = values;

        // creates a user object 
        const user = {username, password, zip, email};
        
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        validate={[required, nonEmpty, isTrimmed]}
                        />
                    <label htmlFor="email">Email</label>
                    <Field
                        component={Input}
                        type="text"
                        name="email"
                        validate={[required, nonEmpty, isTrimmed]}
                        />
                    <label htmlFor="zip">Zip Code</label>
                    <Field
                        component={Input}
                        type="zip"
                        name="zip"
                        validate={[required, zipLength, isTrimmed]}
                        />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, passwordLength, isTrimmed]}
                        />
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matchesPassword]}
                        />
                    <div className="form-input">
                        <button
                            className="register-button"
                            type="submit"
                            disabled={this.props.pristine || this.props.submitting}>
                            Register
                        </button>
                    </div>
                    <div className='navigation-link'>
                        <Link className="login-link" to="/login">Login</Link>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
