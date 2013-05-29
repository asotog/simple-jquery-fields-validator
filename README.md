Simple jQuery Fields Validator
==============================

This component was created in order to provide an easy and fast use javascript validator from javascript code,
sometimes the available form validators does not fit with the requirements or the existent code, so this component
provides a validation with one method, useful for ajax calls when some validation is required

Uses cases
==========

### Instantiation
One single object instantiation is required to handle any particular validation:
```javascript
var validator = new SimpleValidator();
```

### Single validation
To validate, an object with the specific rules and configuration is needed, if you see in the following example,
an array is being specified, where each item in this array belong to one field, in this case only 1 field is being validated:
```javascript
var fieldsContainer = $('#fields');
var subjectTextField = $('#subject-input input');
var fieldsToValidate = [{node: subjectTextField, type: 'empty-text', message: 'Please enter a subject'}];
// if all fields valid
if (validator.areFieldsValid(fieldsToValidate, fieldsContainer)) {
    // do something
}
```

### Additional validation
When SimpleValidator does not provides the required validation, there is an alternative to use a callback, 
as third parameter in the areFieldsValid method:
```javascript
/* Extra validations */
function areValidEmails() {
  if  (EMAILS_LIST.length >= 0) {
    return true;
  }
  return false;
}

var fieldsContainer = $('#fields');
var subjectTextField = $('#subject-input input');
var fieldsToValidate = [{node: subjectTextField, type: 'empty-text', message: 'Please enter a subject'}];
// if all fields valid
if (validator.areFieldsValid(fieldsToValidate, fieldsContainer, areValidEmails)) {
    // do something
}
```

### Multiple validations over one field
Sometimes multiples validation are needed, for example a field is required but should not exceed n characters,
the following snippet illustrates that case:

If you can see there is a variation, now we have one item in the configuration array but it gets a bit complex,
because we are adding more than one validation to the same field
```javascript
var fieldsContainer = $('#fields');
var subjectTextField = $('#subject-input input');
var fieldsToValidate = [{type: [{type: 'text-limit',
                                             message: 'Subject exceeds 75 characters',
                                             textLength: 75}, 
                                            {type: 'empty-text',
                                             message: 'Please enter a subject'}], 
                                    node: subjectTextField}];
// if all fields valid
if (validator.areFieldsValid(fieldsToValidate, fieldsContainer)) {
    // do something
}
```

Validations Supported
=====================

Currently SimpleValidation supports only 3 ootb validations that can be specified in the configuration type property
which are the following: 'email', 'empty-text' and 'text-limit'

Contributing
============

1. Fork it.
2. Create a branch (`git checkout -b ...`)
3. Commit your changes (`git commit -am "..."`)
4. Push to the branch (`git push origin ...`)
5. Open a [Pull Request][1]







