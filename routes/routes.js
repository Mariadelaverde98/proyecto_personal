const router = require("express").Router();
const follower = require("../controllers/followers.controllers");
const user = require("../controllers/users.controllers");
const image = require("../controllers/images.controllers");

//USERS
router.post("/insertUser", user.insert);
router.post("/login", user.login);
router.get("/logout", user.logout);

//FOLLOWERS
router.post("/follow", follower.follow);
router.post("/unfollow", follower.unfollow);

//IMAGES
router.post("/upload", image.upload)
module.exports = router;

