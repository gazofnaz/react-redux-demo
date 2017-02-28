// This is an action
export function createCourse(course){
    return {
        type: "CREATE_COURSE",
        // in ES6 this means course: course. Sugaaaa
        course
    }
}