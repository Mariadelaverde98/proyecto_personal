const router = require("express").Router();
const follower = require("../controllers/followers.controllers");
const user = require("../controllers/users.controllers");
const image = require("../controllers/images.controllers");
const publication = require("../controllers/publications.controllers");
const tag = require("../controllers/tags.controllers");
const chat = require("../controllers/chats.controllers");
const msgChat = require("../controllers/msgsChats.controllers");
const comment = require("../controllers/coments.controller");

//USERS
router.post("/insertUser", user.insert);
router.post("/login", user.login);
router.get("/logout", user.logout);
router.post("/setProfilePhoto", user.setProfilePhoto);
router.get("/userSesion", user.userSesion);
router.post("/searchUsers", user.searchUsers);

//FOLLOWERS
router.post("/follow", follower.follow);
router.post("/unfollow", follower.unfollow);
router.post("/isFollowing", follower.isFollowing);
router.get("/numFollows", follower.numFollows);
router.get("/numFollows/:id", follower.numFollows2);

//IMAGES
router.post("/upload", image.upload);

//PUBLICATIONS
router.post("/postpublication", publication.insert);
router.get("/getPublicationsUser", publication.getPublicationsUser);
router.get("/getPublicationsUser/:id", publication.getPublicationsUser2);

//TAGS
router.post("/inserttag", tag.insert);

//CHATS
router.get("/getChat/:id", chat.getChat);
router.get("/getAllChats", chat.getAllChats);

//CCHAT MESSAGES
router.get("/getMsg/:idChat", msgChat.getMsgs);
router.post("/insertMsg", msgChat.insert);

//COMMENTS
router.post("/addComment", comment.insert);
router.get("/getComments/:id", comment.get);

module.exports = router;

