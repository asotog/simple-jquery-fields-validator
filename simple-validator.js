
function SimpleValidator(configuration) {
	this.configuration = configuration;
	this.initialize();
}

SimpleValidator.prototype = {
	configuration: null,
	
	emailPattern: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/i,
	
	INVALID_FIELD_FORMAT: ['<span class="info-validation-label error">', '{message}', '</span>'],
    INVALID_MESSAGE_INDEX: 1,
	
	initialize: function() {
	
	},
	
    /**
     * Validates form fields, also display a message 
     * on each field to show which is incorrect
     * 
     * @param Array formFields An array with the form fields to be validated
     * @param Node fieldsContainer fields parent node
     * @param Function function to execute additional validation over other fields
     * 
     * @return boolean  true if are valid and false if not
     */
	areFieldsValid: function(formFields, fieldsContainer, additionalFieldsValidationFunction) {
        var valid = true;
        fieldsContainer.find('span.info-validation-label').remove(); // remove validation messages if it has
       
        if (typeof additionalFieldsValidationFunction == 'function') {
            valid = additionalFieldsValidationFunction();
        }

        for (var i = 0; i < formFields.length; i++) {
            if (formFields[i].type == 'email' && !this.isValidEmail(formFields[i].node.val())) {
                this.INVALID_FIELD_FORMAT[this.INVALID_MESSAGE_INDEX] = formFields[i].message;
                formFields[i].node.parent().append(this.INVALID_FIELD_FORMAT.join(''));
                valid = false;
            }
            if (formFields[i].type == 'empty-text' && formFields[i].node.val() <= 0) {
                this.INVALID_FIELD_FORMAT[this.INVALID_MESSAGE_INDEX] = formFields[i].message;
                formFields[i].node.parent().append(this.INVALID_FIELD_FORMAT.join(''));
                valid = false;
            }
        }
        return valid;
    },
    
    /**
     * Validates if text is an email or not
     * 
     * @param text
     * @returns {Boolean} true if its correct email
     */
    isValidEmail: function (text) {
        return (text.search(this.emailPattern) != -1);
    }
	
};




