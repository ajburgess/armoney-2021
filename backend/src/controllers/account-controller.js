const {Account} = require('../models/model');

exports.list = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    res.send(accounts);
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    }
    res.send(account);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const account = await Account.create({
      name: req.body.name,
      balance: req.body.balance,
      openingDate: req.body.date,
    });
    res.send(account);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    let account = await Account.findById(req.params.id);
    if (!account) {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    }
    account.name = req.body.name;
    account = await Account.update(account);
    res.send(account);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let account = await Account.findById(req.params.id);
    if (!account) {
      const error = new Error();
      error.statusCode = 404;
      throw error;
    }
    account.name = req.body.name;
    account = await Account.update(account);
    res.send(account);
  } catch (error) {
    next(error);
  }
};
