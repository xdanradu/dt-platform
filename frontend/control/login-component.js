/* Controller VueJS */
new Vue(
    {
        el: '#login-component',
        data: {
            username: '',
            password:'',
            status: ''
        },
        methods: {
            login: function(){
                    axios.post('http://localhost:3000/login', 
                    {
                        username: this.username, 
                        password: this.password
                    }).then(response => { 
                        this.status = response.data;
                        if (response.data.status === 'ALLOW') {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('username', this.username);
                            window.location='secured-pages/dashboard.html';
                        } else {
                            this.status = 'Please try again';
                        }
                    });
            }
        }
    }
);