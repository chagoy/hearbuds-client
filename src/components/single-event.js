import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getEvent} from '../actions/single-event';
import Comments from './comments';
import RSVPButton from './rsvp-button';

class SingleEvent extends React.Component {
    componentDidMount() {
        // action calls will go here
        this.props.dispatch(getEvent());
    }

    render() {
        return (
            // React Fragments work like divs to wrap elements
            // Link to React Fragment docs: 
            // https://reactjs.org/docs/fragments.html
            <React.Fragment>
                {/* this is all dummy data for now */}
                <h3>{this.props.event.name}</h3>
                <p>{this.props.event.venue}</p>
                <p>{this.props.event.address}, {this.props.event.city}</p>
                <img src={this.props.event.img} width="200px"></img>

                <RSVPButton />

                <Comments />

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        event: state.event.selectedEvent,
        username: state.auth.currentUser.username
    };
};

export default requiresLogin()(connect(mapStateToProps)(SingleEvent));
