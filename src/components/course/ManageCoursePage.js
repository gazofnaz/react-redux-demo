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

        // bind proper this context when update course state is called
        this.updateCourseState = this.updateCourseState.bind(this);
    }

    /**
     * Event change handler for all fields in the form
     *
     * @param event
     * @returns {ShallowWrapper|*|ReactWrapper}
     */
    updateCourseState(event){
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    // Don't define new functions inside a render call, it impacts performance
    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
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
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
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

    /**
     * Author data is in the wrong format for a select box
     * mapStateToProps is the best place to format data for that requirement
     *
     * @type {Array}
     */
    const authorsFormattedForDropdown = state.authors.map(author => {
       return {
          value: author.id,
          text: author.firstName + ' ' + author.lastName
       };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
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