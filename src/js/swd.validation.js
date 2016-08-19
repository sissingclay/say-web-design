/**
 * Created by claysissing on 18/08/2016.
 */
function EmailValidation () {
    
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    
    return {
        validateEmail: validateEmail
    };
};

function ValidateForm (element) {
    
    //Validates that form elements are not empty
    var ele         = document.querySelector(element),
        eleElements = ele.elements,
        eleLength   = ele.elements.length,
        i,
        isVaild     = true,
        validation,
        isEmailValid;
    
    for(i=0; i < eleLength; i++) {
        
        validation = eleElements[i].getAttribute('data-parsley-trigger');
        
        if (validation === 'email') {
            
            isEmailValid = EmailValidation(eleElements[i].value);
            
            if (!isEmailValid) {
                $(eleElements[i]).addClass('parsley-error');
                isVaild = false;
            }
        } else {
            
            if(eleElements[i].value === null ||
                eleElements[i].value === "") {
                
                if(!eleElements[i].value) {
                    $(eleElements[i]).addClass('parsley-error');
                }
                
                isVaild = false;
            }
        }
    }
    
    return isVaild;
};

export { ValidateForm };