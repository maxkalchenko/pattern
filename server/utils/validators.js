// TODO: add messages

export const validateText = text => {
    return text.length > 0
        && text.length < 255;
}

export const validatePassword = (password, confirmPassword) => {
    return password.length > 6
        && password === confirmPassword
        && password.length < 255;
}

export const validateEmail = email => {
    let regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regexp.test(email);
}

export const validateUnique = (data, model, where, orWhere) => {
    let errors = {};
    const query = orWhere ? {
        where: { [where]: data[where] },
        orWhere: { [orWhere]: data[orWhere] }
    } : {
        where: { [where]: data[where] }
    };

    return model.query(query).fetch()
        .then(user => {
            if (user) {
                if (user.get(where) === data[where]) {
                    errors[where] = 'There is model with such ' + where;
                }

                if (user.get(orWhere) === data[orWhere]) {
                    errors[orWhere] = 'There is model with such ' + orWhere;
                }
            }

            return errors;
        });
}
