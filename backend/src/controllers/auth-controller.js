const {User} = require('../models/model');

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const account = await User.create({email, password});
    res.send(account);
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let ok = false;
    let user = await User.findOne({email}).select('+password');
    if (user) {
      ok = await user.checkPassword(password);
    }
    if (!ok) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw (error);
    }
    user = User.findById(user._id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.me = async function() {
};

exports.update = async function() {
};
