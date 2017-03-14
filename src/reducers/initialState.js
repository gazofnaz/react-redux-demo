// Centralise declarations about what is in state.
// This helps keep track of what is in your entire store as a whole
// Makes it easier to visualise the store and app.
export default {
    authors: [],
    courses: [],
    numAjaxCallsInProgress: 0 // Display the dots when value is greater than zero
};