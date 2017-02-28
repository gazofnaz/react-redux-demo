import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {

    constructor( props, context ){
        super( props, context );

        this.state = {
            course: {
                title: ""
            }
        };

        // We need to bind this here so we can use "this" to get the state in these methods
        // Otherwise "this" is bound to the input from where they are called
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    onTitleChange(event){
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({
                course: course
            }
        );
    }

    onClickSave(){
        // Nice and verbose!
        this.props.dispatch(
            courseActions.createCourse(
                this.state.course
            )
        );
    }

    // corn row. Would be nice to separate template from logic a little bit
    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    // Don't define new functions inside a render call, it impacts performance
    render(){
        return(
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>

                {/* By default "this" here refers to the input object*/}
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title}
                />

                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave}
                />

            </div>
        );
    }
}

/**
 * I feel like this was defined somewhere as a requirement...
 * @type {{}}
 */
CoursesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired
};

/**
 * Returns the properties we'd like to see exposed in our project
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

// Connect is a higher order function that does some more magic and creates container components
// Connect will inject a dispatcher by default to this.props.
export default connect(mapStateToProps)(CoursesPage);

// longer version
// const temp = connect(mapStateToProps, mapDispatchToProps)
// export default temp(CoursesPage);
