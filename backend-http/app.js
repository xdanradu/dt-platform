let express = require('express');
let cors = require('cors');
const fs = require('fs');
let token = require('./src/auth.js').token;

const moviesFilepath = './movies.json';
let api = express();
api.use(cors());

let bodyParser = require('body-parser');
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);
api.use(bodyParser.json());

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/movies', function (request, response) {
  response.json(getMovies());
});

api.delete('/movies/:id', function (request, response) {
  let movies = getMovies();
  let index = getIndexFor(parseInt(request.params.id), movies);
  if (index) {
    console.log('idul exista');
    movies.splice(index, 1);
  }

  try {
    fs.writeFileSync(moviesFilepath, JSON.stringify(movies));
  } catch (err) {
    console.error(err)
  }

  // persist change in file
  response.json(movies);
});

function getIndexFor(id, movies) {
  console.log(typeof id);
  let index = null;
  for(let i=0; i<movies.length; i++) {
    if (movies[i].id === id) index = i;
  }
  return index;
}

function getMovies() {
  let cars = [];
  try {
    cars = JSON.parse(fs.readFileSync(moviesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return cars;
}

api.post('/login', function (request, response) {
  if(request.body.username.length > 2 && 
    request.body.password === '321access') {
    response.json({status: 'ALLOW', token: token()});
  } else {
    response.json({status: 'DENY'});
  }
});

api.listen(3000, function () {
    console.log('Server running @ localhost:3000');
  });