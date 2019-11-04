const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiliao = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const Shiliao = mongoose.model('Shiliao',shiliao);

module.exports = {
  Shiliao
}