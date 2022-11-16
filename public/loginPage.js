'use strict';

const userform = new UserForm();

userform.loginFormCallback = data => {
    ApiConnector.login(data, response => response.success ? location.reload() : userform.setLoginErrorMessage(response.error));
    // {
    //     response.success ? location.reload() : userform.setLoginErrorMessage(response.error);
        // if (response.success) {
        //     location.reload();
        // } else {
        //     userform.setLoginErrorMessage(response.error);
        // }
    // });
}

userform.registerFormCallback = data => {
    ApiConnector.register(data, response => response.success ? location.reload() : userform.setRegisterErrorMessage(response.error));
    // {
    //     response.success ? location.reload() : userform.setRegisterErrorMessage(response.error); 
        // if (response.success) {
        //     location.reload();
        // } else {
        //     userform.setRegisterErrorMessage(response.error);
        // }
    // });
}
