/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

function onReady(){
    var signup = document.getElementById('signup');
    var signupSelect = signup.elements['state'];
    var option;
    var state;

    for(var i = 0; i < usStates.length; i++) {
        option = document.createElement('option');
        state = usStates[i];
        option.value = state.code;
        option.innerHTML = state.name;
        signupSelect.appendChild(option);
    }

    signup.addEventListener('change', onChange);

    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function(){
        if(window.confirm("Are you sure you want to leave this page?")){
            window.location = 'http://www.google.com';
        }
    });

    signup.addEventListener('submit', onSubmit);
}

function onChange(){
    var occupation = document.getElementById('occupation');
    var field = document.getElementById('occupationOther');

    if(occupation.value == 'other'){
        field.style.display = 'block';
    } else {
        field.style.display = 'none';
    }
}

function onSubmit(evt) {
    var valid = validateForm(this);

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city','state', 'zip', 'birthdate'];
    var valid = true;

    try {
        if (document.getElementById('occupationOther').style.display == 'block') {
            requiredFields.push('occupationOther');
        }

        for (var i = 0; i < requiredFields.length; i++) {
            valid &= validateRequiredField(form.elements[requiredFields[i]]);
        }

        valid &= validateZip();
        valid &= validateAge();

        return valid;
    }
    catch(exception) {
        displayError(exception);
    }
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var fieldValid = value.length > 0;

    if(fieldValid){
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid';
    }

    return fieldValid;
}

function validateZip(){
    var zip = document.getElementById('zip');
    var zipRegExp = new RegExp('^\\d{5}$');
    var zipValid = zipRegExp.test(zip.value);

    if(zipValid){
        zip.className = 'form-control';
    } else {
        zip.className = 'form-control invalid';
    }

    return zipValid;
}

function validateAge(){
    var dob = document.getElementById('birthdate');
    var age = new Date(dob.value);
    var ageValid = moment().diff(age, 'years') >= 13;

    if(ageValid){
        dob.className = 'form-control';
        document.getElementById('birthdateMessage').innerHTML = '';
    } else {
        dob.className = 'form-control invalid';
        document.getElementById('birthdateMessage').innerHTML = 'You must be over 13 years old to sign up.';
    }

    return ageValid;
}

document.addEventListener('DOMContentLoaded', onReady);