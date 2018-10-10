import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
require('./landing-page.css');

export class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            redirect: false,
            zipcode: null,
            error: ''
        }
    }
    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }
    
    seeEventList(e) {
        e.preventDefault();
        const zipcode = this.input.value;
        this.setState({error: ''});

        if (zipcode.length !== 5) {
            return this.setState({
                error: 'This zip code is not long enough'
            })
        }
        return this.setState({
            redirect: true,
            zipcode
        })  
    }

    render() {
        let error;

        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }
        
        if (this.state.redirect) {
            return <Redirect to={"/peek/"+this.state.zipcode} />
        }

        if (this.state.error) {
            error = 'Not a zipcode';
        }

        return (
            <div className="landing-page">
                {this.state.redirect}
                <h1 className="landing-title">HearBuds</h1>
                <p className="landing-page-text">
                    We're revolutionizing the concert going experience. Find out who's going or someone to go with. 
                </p>
                <form className='landing-form'>
                    <input ref={input => this.input = input} className="zipcode-search-box" type="text" placeholder={error ? error : 'zipcode'}></input>
                    <button type="submit" className="zipcode-search-button" onClick={(e) => this.seeEventList(e)}>Go</button>
                </form>
            </div>
        );
    }
    
    
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser != null
});

export default connect(mapStateToProps)(LandingPage);
