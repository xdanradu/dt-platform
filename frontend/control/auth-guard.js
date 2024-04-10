if(!localStorage.getItem('token')){
    document.location = '../index.html';
} else {
    console.log('User is logged in');
}