const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is similar to a Sequelize model
const ShowSchema = new Schema({
  // Location of show 
  location: {
    type: String,
    required: true
  },
  // Date of show
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Link for more info
  link: {
    type: String,
    required: false
  }
  
});

// This creates our model from the above schema, using mongoose's model method
const Show = mongoose.model("Show", ShowSchema);

// Export the Article model
module.exports = Show;