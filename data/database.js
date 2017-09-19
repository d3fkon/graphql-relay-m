import data from './data.json';

class User {};

class Friend {};

const viewer = new User();
viewer.id = '1';
viewer.name = 'me';
const friends = data.map((f) => {
    const friend = new Friend();
    friend.id = require('crypto').randomBytes(10).toString('hex');
    friend.firstName = f.firstName;
    friend.lastName = f.lastName;
    friend.gender = f.gender;
    friend.language = f.language;
    friend.email = f.email;
    friend.image = f.image;
});

module.exports = {
    getUser: (id) => id === user.id? viewer: null,
    getViewer: () => viewer,
    getFriend: (id) => friends.find(w => w.id === id),
    getFriends: () => friends,
    User,
    Friend
}