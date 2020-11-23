const setupMongoose = require('./setup-mongoose');
const expect = require('expect');
const {User} = require('../src/models/model');

describe('User', function() {
  setupMongoose();

  it('creates user when new user added', async function() {
    let user = await User.create({
      email: 'fred@acme.com',
      password: 'password123',
    });
    user = await User.findById(user._id);
    expect(user).toHaveProperty('email', 'fred@acme.com');
  });

  it('can detect correct password', async function() {
    let user = await User.create({
      email: 'fred@acme.com',
      password: 'password123',
    });
    user = await User.findById(user._id).select('+password');
    const ok = await user.checkPassword('password123');
    expect(ok).toBe(true);
  });

  it('can detect incorrect password', async function() {
    let user = await User.create({
      email: 'fred@acme.com',
      password: 'password123',
    });
    user = await User.findById(user._id).select('+password');
    const ok = await user.checkPassword('PASSWORD123');
    expect(ok).toBe(false);
  });

  it('creates tenant when new user added with no tenent', async function() {
    let user1 = await User.create({
      email: 'fred@acme.com',
      password: 'password123',
    });
    let user2 = await User.create({
      email: 'sam@acme.com',
      password: 'password123',
    });
    user1 = await User.findById(user1._id).select('+tenant');
    user2 = await User.findById(user2._id).select('+tenant');
    expect(user1.tenant).toBeTruthy();
    expect(user2.tenant).toBeTruthy();
    expect(user1.tenant).not.toEqual(user2.tenant);
  });

  it('links user to existing tenant if supplied', async function() {
    let user1 = await User.create({
      email: 'fred@acme.com',
      password: 'password123',
    });
    let user2 = await User.create({
      email: 'sam@acme.com',
      password: 'password123',
      tenant: user1.tenant,
    });
    user1 = await User.findById(user1._id).select('+tenant');
    user2 = await User.findById(user2._id).select('+tenant');
    expect(user1.tenant).toEqual(user2.tenant);
  });
});
