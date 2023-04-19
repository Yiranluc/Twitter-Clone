const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const TweetModel = require("../db/tweet/tweet.model");

//      author: { type: mongoose.Types.ObjectId, ref: "user", require: true },
// 		text: String,
// 		likesCount: { type: Number, default: 0 },
// 		commentsCount: { type: Number, default: 0 },
// 		parent: { type: mongoose.Types.ObjectId, ref: "tweet" },
// 		images: { type: [String] },

router.get("/", function (req, res) {
	TweetModel.getAllTweet()
		.then(function (dbResponse) {
			res.cookie("tweetCount", dbResponse.length + 1);
			res.send(dbResponse);
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.get("/:id", function (req, res) {
	TweetModel.getTweetByUserId()
		.then(function (dbResponse) {
			res.cookie("tweetCount", dbResponse.length + 1);
			res.send(dbResponse);
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

router.post("/", function (req, res) {
	const newTweet = req.body;
	TweetModel.createTweet(newTweet)
		.then(function (dbResponse) {
			res.send("Tweet Successfully Created");
		})
		.catch(function (error) {
			res.status(500).send(error);
		});
});

module.exports = router;
