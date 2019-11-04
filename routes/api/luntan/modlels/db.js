const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const qin = new Schema({
  // name: { type: String, required: true },
  // id: String,
});


const qi = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const shu = new Schema({
  // name: { type: String, required: true },
  // id: String,
});


const hua = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const Qin = mongoose.model('Qin',qin);

const Qi = mongoose.model('Qi',qi);

const Shu = mongoose.model('Shu',shu);

const Hua = mongoose.model('Hua',hua);

module.exports = {
  Qin,
  Qi,
  Shu,
  Hua
}
