import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

/**
 * This component will wrap all other components, and likely contain headers, footers,
 * and other reusable things
 */
class App extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                />
                {this.props.children}
            </div>
        );
    }
}

/**
 * This component must have some children which will be passed in from the router
 */
App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

/**
 * Check if there is an active ajax call
 *
 * @param state
 * @param ownProps
 * @returns {{loading: boolean}}
 */
function mapStateToProps(state, ownProps) {
    return {
        loading: state.numAjaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);