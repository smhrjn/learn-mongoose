let mongoose = require('mongoose');
mongoose.connect('mongodb://smhrjn:webnotes@ds151014.mlab.com:51014/tutorial');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
  let kittySchema = new Schema({
    name: String,
    date: { type: Date, default: Date.now }
  });
  kittySchema.methods.speak = function() {
    let greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };
  let Kitten = mongoose.model('Kitten', kittySchema);
  let silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  let fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function(err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

  Kitten.find(function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });

  let callback = function(err, data) {
    console.log('from find: ' + data);
  };
  Kitten.find({ name: /^fluff/ }, callback);
});
