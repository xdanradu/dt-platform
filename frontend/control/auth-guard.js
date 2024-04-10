if(!localStorage.getItem('token')){
    document.location = '../index.html';
} else {
    console.log('User is logged in');
    socket.emit('auth', { username: localStorage.getItem('username'), token: localStorage.getItem('token')});
}