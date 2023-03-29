import mongoose from "mongoose";

const MarketplaceSchema = new mongoose.Schema({
  market: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Marketplace", MarketplaceSchema);
