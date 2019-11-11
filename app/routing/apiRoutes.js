// 2 routes
// require
// display data from inside 
let friends = require('../data/friends.js');

module.exports = function (app) {
    app.get("/friendsdb", (req, res) => {
        res.json(friends)
    })

    app.post("/api/friends", (req, res) => {
      const user = req.body
      let bestFriend = {
        name: "",
        photo: "",
        total: 99999
      }
      for (var i = 0; i < friends.length; i++) {
          const userScores = user.scores;
          const friendScores = friends[i].scores;
          let total = 0;

          for (var j = 0; j < userScores.length; j++) {
              const scoreDiff = Math.abs(parseInt(userScores[j]) - parseInt(friendScores[j]))
              total += scoreDiff;
          }
          if (total < bestFriend.total) {
            bestFriend.name = friends[i].name;
            bestFriend.photo = friends[i].photo;
            bestFriend.total = total;

          }
      }
      friends.push(user);
      res.json(bestFriend);
    })

};
