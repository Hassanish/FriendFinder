var friendsData = require ("../data/friends.js");
module.exports = function (app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });
    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var newFriendResponses = newFriend.scores;
        var bestMatch = {
            name: "",
            photo: "",
            bestMatchDifference: 40
        };
        for (var i = 0; i < friendsData.length; i++) {
            var diffCounter = 0;
            for (var j = 0; j < friendsData[i].scores.length; j++) {
               diffCounter += Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendResponses[j]))              
            }    
            if (bestMatch.bestMatchDifference > diffCounter) {

                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo;
                bestMatch.bestMatchDifference = diffCounter;
            }
        }
        (friendsData).push(newFriend);
        res.json(bestMatch);
    });
};

