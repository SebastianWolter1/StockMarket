import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    },

}, {_id: false});

export default mongoose.model("Stock", StockSchema);
