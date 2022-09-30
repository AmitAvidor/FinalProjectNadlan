const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  deal_date: {
    type: String,
    required: false,
  },
  full_address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  gush: {
    type: String,
    required: false,
  },
  floor_num: {
    type: String,
    required: false,
  },
  room_num: {
    type: String,
    required: false,
  },
  deal_amount: {
    type: String,
    required: false,
  },
  building_year: {
    type: String,
    required: false,
  },
  buidling_floors: {
    type: String,
    required: false,
  },
  deal_nature_description: {
    type: String,
    required: false,
  },
});

var Building = mongoose.model("buildings", buildingSchema);

module.exports = Building;
