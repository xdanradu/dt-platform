new Vue(
    {
        el: '#movies-component',
        data: {
            movies: [],
            resourcesApi: 'http://localhost:55970',
            httpBackendUrl: 'http://localhost:3000'
        },
        created: function(){
            this.getMovies();
        },
        methods: {
            getMovies: function(){
                axios.get(`${this.httpBackendUrl}/movies`).then(response => { 
                    this.movies = response.data;
                });
            }
        }
    }
);