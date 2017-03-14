import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {

    // when the page is first constructed it takes the course value from props and assigns it to state.
    // this becomes a problem when visiting the page directly because there are no props at that time,
    // due to the ajax requests taking time to complete.
    constructor(props, context) {
        super(props, context);
        // setup local state for the form
        this.state = {
            // create new object, assign all the properties from old to new
            course: Object.assign({}, props.course),
            errors: {},
            // adding some local state here, because global saving state is overkill
            saving: false
        };

        // bind proper this context when update course state is called
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    /**
     * Function will run when props have changed, but also may run at other times too
     * as react is a bit paranoid about things changing.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        // Check if the course id has changed to avoid unnecessary changes
        if(this.props.course.id != nextProps.course.id) {
            // We got to the course page directly, so we need to update the props on the page
            // to populate the form
            this.setState({course: Object.assign({}, nextProps.course)});
        }
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

    /**
     * Event change handler for saving a course
     * Where does the event come from?
     * @param event
     */
    saveCourse(event){
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            // So promises are actually useful. Delay the redirect until save is complete
            .then( () => this.redirect() );
    }

    /**
     * At what point do we admit that this class is messy as hell?
     */
    redirect() {
        this.setState({saving: false});
        // redirect after success for a nicer experience
        this.context.router.push('/courses');
    }

    // Don't define new functions inside a render call, it impacts performance
    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
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
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

/**
 * Pulls in the react router context so router is available as this.context.router
 *
 * Context is a global state used by libraries, but should be avoided by users
 *
 * @type {{router: *}}
 */
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

/**
 * 'Private' method to fetch course by id.
 *
 * Used to populate the form for the current course management page
 *
 * @param courses
 * @param id
 * @returns {*}
 */
function getCourseById(courses, id) {
    // find our course in the provided list of courses
    const course = courses.filter(course => course.id == id);
    if(course) return course[0]; // filter returns an array
    return null;
}

/**
 *
 * @param state
 * @param ownProps
 * @returns {{course: {id: string, watchHref: string, title: string, authorId: string, length: string, category: string}, authors: Array}}
 */
function mapStateToProps(state, ownProps) {

    // Fetch the course id from the url
    const courseId = ownProps.params.id; // id is from '/course/:id'

    // by default we load an empty course. We apply correct values below if the course exists
    // Wouldn't san interface be nice here?
    let course = {
        id:         '',
        watchHref:  '',
        title:      '',
        authorId:   '',
        length:     '',
        category:   ''
    };

    // Check that courses have loaded before making the request to filter by id
    if (courseId && state.courses.length > 0){
        course = getCourseById(state.courses, courseId);
    }

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