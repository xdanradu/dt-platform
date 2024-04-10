let rand = function() {
    return Math.random().toString(36).substr(2);
};

let token = function() {
    return rand() + rand(); 
};

exports.token = token;