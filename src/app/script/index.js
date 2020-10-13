document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByClassName('testForm')[0];
    form.addEventListener('submit', handleFormSubmit);
});

const handleFormSubmit = async (event) => {
    // Stop the form from submitting
    event.preventDefault();

    const form = document.getElementsByClassName('testForm')[0];
    const body = JSON.stringify(toObject(form));
    console.log(body);

    const response = await fetch('http://localhost:6789/users/login', {
        method: 'POST',
        body: body
      });
      console.log(await response.json());
};



function toObject(form) {
    var obj = Object.create(null);

    function assign(name, value) {
        if (obj[name] === undefined) {
            obj[name] = value;
        } else if (Array.isArray(obj[name])) {
            obj[name].push(value);
        } else {
            obj[name] = [obj[name], value];
        }
    }

    Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (field.name && !field.disabled && (['file', 'reset', 'button'].indexOf(field.type) === -1)) {
            if (field.type === 'select-multiple') {
                Array.prototype.slice.call(field.options).forEach(function (option) {
                    if (option.selected) {
                        assign(field.name, option.value);
                    }
                })
            } else if (field.type === 'checkbox' || field.type === 'radio') {
                if (field.checked) {
                    assign(field.name, field.value);
                }
            } else {
                assign(field.name, field.value);
            }
        }
    })

    return obj;
};
