/**
 *
 * @author Alejandro Soto
 * @description Basically adds some functionlity to validate simple fields
 *
 */
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
            if (typeof formFields[i].type == 'object') {
                var formFieldsValidatorsTypes = formFields[i].type;
                for (var j = 0; j < formFieldsValidatorsTypes.length; j++) {
                    valid = (!this.validateField(formFieldsValidatorsTypes[j].type, formFieldsValidatorsTypes[j].message, formFields[i].node, formFieldsValidatorsTypes[j])) ? false : valid;
                }
            } else {
                valid = (!this.validateField(formFields[i].type, formFields[i].message, formFields[i].node)) ? false : valid;
            }
        }
        return valid;
    },
    
    /**
     * Validate the field using a process for validation
     * 
     * @param String
     * @param Node
     * @param String
     * @param Object Additional params for config
     * 
     * @return Boolean
     */
    validateField: function(type, message, node, opts) {
        if (type == 'email' && !node.val()) {
            this.INVALID_FIELD_FORMAT[this.INVALID_MESSAGE_INDEX] = message;
            node.parent().append(this.INVALID_FIELD_FORMAT.join(''));
            return false;
        }
        if (type == 'empty-text' && node.val() <= 0) {
            this.INVALID_FIELD_FORMAT[this.INVALID_MESSAGE_INDEX] = message;
            node.parent().append(this.INVALID_FIELD_FORMAT.join(''));
            return false;
        }
        if (type == 'text-limit' && node.val().length > opts.textLength) {
            this.INVALID_FIELD_FORMAT[this.INVALID_MESSAGE_INDEX] = message;
            node.parent().append(this.INVALID_FIELD_FORMAT.join(''));
            return false;
        }
        return true;
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




