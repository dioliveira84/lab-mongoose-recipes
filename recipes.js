const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const receipeSchema = new Schema({
  title: {type: String, required: true, unique: true },
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
  });


  const Recipe = mongoose.model('Recipe', receipeSchema);
  
  Recipe.create({ title: 'Hamburguer', level: 'Easy Peasy', ingredients: ['Pao', 'Carne', 'Alface', 'Tomate'], cuisine: 'American', dishType: 'Snack', duration: 10, creator: 'Diogo'})
  .then(recipe => {console.log('the recipe is saved and its value is: ', recipe) }) 
  .catch(err => {console.log('An error happened: ', err) });

Recipe.insertMany( data, function(error, docs) {
  docs.forEach(element => {
    console.log(element.title)
  });
} );