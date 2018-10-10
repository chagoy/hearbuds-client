import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import { Link } from 'react-router-dom';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        id="username"
                        validate={[required, nonEmpty]}
                        />
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        id="password"
                        validate={[required, nonEmpty]}
                        />
                    <div className="form-input">
                        <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                            Login
                        </button>
                        <p>Demo Credentials: username: <em>angelo</em> password: <em>password10</em></p>
                    </div>
                    <div className='navigation-link'>
                        <Link className="login-link" to="/login">Register</Link>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
