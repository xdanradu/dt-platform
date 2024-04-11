/* Controller VueJS */
new Vue(
    {
        el: '#chat-component',
        data: {
            socketId: '',
            messages: [],
            message: ''
        },
        created: function(){
           this.socketId = socket.id;
           globalMessages$.pipe(
     /*       rxjs.tap(e=>console.log(e)),
            rxjs.map( entries =>
                entries.map((e) => `${e.userId}:${e.message}`)
            )*/
           ).subscribe(messages=>
            { 
            this.messages = messages; 
        });
        },
        methods: {
            send: function() {
                socket.emit('chat', { username: localStorage.getItem('username'), text: this.message});
            }
        }
    }
);