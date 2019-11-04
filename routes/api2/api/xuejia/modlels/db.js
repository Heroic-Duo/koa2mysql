const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daojia = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const Daojia = mongoose.model('Daojia',daojia);

const rujia = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const Rujia = mongoose.model('Rujia',rujia);


module.exports = {
  Rujia,
  Daojia
}
