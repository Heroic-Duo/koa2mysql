const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hdnj = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const rujia = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const Hdnj = mongoose.model('Hdnj',hdnj);
const Daojia = mongoose.model('Daojia',daojia);

module.exports = {
  Hdnj,
 
}
