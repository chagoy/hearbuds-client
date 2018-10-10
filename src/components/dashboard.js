import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import EventList from './event-list';
import './dashboard.css';



export class Dashboard extends React.Component {


    render() {

        if (!this.props.loading && !this.props.match.params.zipcode && !this.props.username) {
            return <Redirect to="/" />;
        }

        return (
            <div className='dashboard'>
                <EventList zipcode={this.props.match.params.zipcode}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser,
        loading: state.auth.loading,
    };
};

export default connect(mapStateToProps)(Dashboard);

