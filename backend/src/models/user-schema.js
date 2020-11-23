const {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
    select: false,
  },
});

UserSchema.methods.checkPassword = async function(password) {
  const ok = await bcrypt.compare(password, this.password);
  return ok;
};

const hash = async function(password) {
  if (!password) {
    return undefined;
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.static('create', async function(user) {
  // New users need their own tenant, if it isn't supplied
  const User = this.model('User');
  const u = new User(user);
  if (!u.tenant) {
    const Tenant = this.model('Tenant');
    const tenant = await Tenant.create({});
    u.tenant = tenant._id;
  }
  return await u.save();
});

UserSchema.pre('save', async function() {
  if (this.isNew) {
    // For new users, we need to hash their password
    this.password = await hash(this.password);
  } else {
    // For existing users, we need to re-hash the password if it's been changed
    const User = this.model('User');
    const previous = await User.findById(this._id);
    if (this.password !== previous.password) {
      this.password = await hash(this.password);
    }
  }
});

module.exports = UserSchema;
