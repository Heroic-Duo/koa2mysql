const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const huoGuan = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const guaSha = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const aiJiu = new Schema({
  // name: { type: String, required: true },
  // id: String,
});


const zhenCi = new Schema({
  // name: { type: String, required: true },
  // id: String,
});

const HuoGuan = mongoose.model('HuoGuan',huoGuan);

const GuaSha = mongoose.model('GuaSha',guaSha);

const AiJiu = mongoose.model('AiJiu',aiJiu);

const ZhenCi = mongoose.model('ZhenCi',zhenCi);

module.exports = {
  HuoGuan,
  GuaSha,
  AiJiu,
  ZhenCi
}
