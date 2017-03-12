import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {

    constructor(props, context) {
        super(props, context);
        // setup local state for the form
        this.state = {
            // create new object, assign all the properties from old to new
            course: Object.assign({}, props.course),
            errors: {}
        };
    }

    // Don't define new functions inside a render call, it impacts performance
    render() {
        return (
            <CourseForm
                allAuthors={[]}
                course={this.state.course}
                errors={this.state.errors}
            />
        );
    }
}

/**
 * The props object in the constructor must have a course object
 *
 * @type {{course: *}}
 */
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

    // not sure why we do this
    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    return {
        course: course
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// Connect is a higher order function that does some more magic and creates container components
// Connect will inject a dispatcher by default to this.props.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);