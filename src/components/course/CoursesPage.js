import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

/**
 * List all the courses
 */
class CoursesPage extends React.Component {

    constructor( props, context ){
        super( props, context );
        // I guess this is needed so the call in the render binds to this class and not "this" element which is clicked in the dom
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    // corn row. Would be nice to separate template from logic a little bit
    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage(){
        browserHistory.push('/course');
    }

    // Don't define new functions inside a render call, it impacts performance
    render(){

        // How do we know courses will always be props? Anyway, it keeps things shorter
        const {courses} = this.props;

        // This becomes quite clean
        return(
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}
                />
                <CourseList courses={courses}/>
            </div>
        );
    }
}

/**
 * I feel like this was defined somewhere as a requirement...
 * @type {{}}
 */
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

/**
 * Returns the properties we'd like to see exposed in our project, pulled from the current state
 *
 * Allows us to call this.props.courses
 *
 * @param state
 * @param ownProps
 */
function mapStateToProps(state, ownProps){
    return{
        // get course data from in the store, i.e. from in the reducer
        courses: state.courses
    };
}

/**
 * Determines what actions are available in the component
 *
 * Allows us to call this.props.createCourse() for dispatchers
 *
 * Once this is defined, connect will no longer inject a dispatch property to our component
 *
 */
function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(courseActions, dispatch)
    };
}

// Connect is a higher order function that does some more magic and creates container components
// Connect will inject a dispatcher by default to this.props.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// longer version
// const temp = connect(mapStateToProps, mapDispatchToProps)
// export default temp(CoursesPage);
