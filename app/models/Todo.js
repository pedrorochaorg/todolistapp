
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var TodoSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  grupo: { type: String, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


mongoose.model('Todo', TodoSchema);

