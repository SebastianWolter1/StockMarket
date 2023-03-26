import Stock from "../models/Stock.js";
import User from "../models/User.js";
import Marketplace from "../models/Marketplace.js";

const getStocks = async (req, res) => {
  try {
    const marketplace = await Marketplace.findOne();
    const stocks = marketplace.market;
    const allStocks = stocks.map((stock) => stock);
    res.status(200).json(allStocks);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

const addStock = async (req, res) => {
  const { name, ticker, price, amount } = req.body;

  try {
    const stock = new Stock({
      name,
      ticker,
      price,
      amount,
    });

    const marketplace = await Marketplace.findOne();
    const existingsStock = marketplace.market.find(
      (stock) => stock.name === name
    );
    if (existingsStock) {
      existingsStock.amount += amount;
    } else {
      marketplace.market.push(stock);
    }
    await marketplace.updateOne({ $set: { market: marketplace.market } });
    res.status(201).json({
      message: "Stock added to Marketplace successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const buyStock = async (req, res) => {
  const { name, ticker, price, amount } = req.body;
  try {
    const investor = await User.findById(req.user.userId);

    
    const existingStock = investor.stocks.find((stock) => stock.name === name);
    if (existingStock) {
     
      existingStock.amount += amount;
    } else {
   
      const stock = new Stock({
        name,
        ticker,
        price,
        amount,
      });
      investor.stocks.push(stock);
    }

    const marketplace = await Marketplace.findOne();
    const selectedStock = marketplace.market.find(
      (stock) => stock.name === name
    );
    if(!selectedStock) return res.status(400).json({ msg: "Stock not found" });
    if (selectedStock.amount < amount)
      return res.status(400).json({ msg: "Not enough stocks in the market" });
    selectedStock.amount -= amount;

    await marketplace.updateOne({ $set: { market: marketplace.market } });

    await investor.updateOne({ $set: { stocks: investor.stocks } });

    res.status(201).json({
      message: "Stock added to your portfolio successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const sellStock = async (req, res) => {
  const { name, ticker, price, amount } = req.body;
  try {
    const stock = new Stock({
      name,
      ticker,
      price,
      amount,
    });

    const investor = await User.findById(req.user.userId);
    const selectedStock = investor.stocks.find((stock) => stock.name === name);
    console.log(selectedStock)
    if(!selectedStock) return res.status(400).json({ msg: "You don't own this stock" });
    if (selectedStock.amount < amount)
      return res
        .status(400)
        .json({ msg: "Not enough stocks in your portfolio" });

        const existingStock = await Marketplace.findOne();
        console.log("exisitngstock", existingStock)
        if (existingStock) {
          console.log("1")
          const stockInMarket = existingStock.market.find((stock) => stock.name === name);
          console.log("stock", stockInMarket)
          stockInMarket.amount += amount;
          await Marketplace.updateOne({ $set: { market: existingStock.market  } });

        } else {
          console.log("2")
          await Marketplace.updateOne({ $push: { market: stock } });
        }


    selectedStock.amount -= amount;
    if(selectedStock.amount === 0){
      const newStocks = investor.stocks.filter((stock) => stock.name !== name);
      investor.stocks = newStocks;
    }
    await investor.updateOne({ $set: { stocks: investor.stocks } });
    // await Marketplace.updateOne({ $push: { market: stock } });
    res.status(201).json({
      message: "Stock sold successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

const removeStock = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Please enter a stock name" });
  try {
    const stocks = await Marketplace.findOne();
    console.log(stocks);
    const stockExists = stocks.market.some((stock) => stock.name === name);
    if (!stockExists) {
      return res.status(404).json({ msg: "Stock not found in the market" });
    }
    const newStocks = stocks.market.filter((stock) => stock.name !== name);

    await Marketplace.updateOne({ $set: { market: newStocks } });
    res.status(200).json({
      message: "Company bankrupt, stock removed from the market",
    });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

export { addStock, getStocks, buyStock, removeStock, sellStock };
