window.onload(makeJson());

function makeJson() {
    const form = document.getElementsByClassName('testForm')[0];
    form.addEventListener('submit', handleFormSubmit);
}

const handleFormSubmit = (event) => {
    // Stop the form from submitting since we’re handling that with AJAX.
    event.preventDefault();

    console.log(JSON.stringify(form, null, 4));
};
