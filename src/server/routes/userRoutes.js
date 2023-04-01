const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersController");

router
    .route("/")
    .get(usersControllers.verifyUser)
    .post(usersControllers.createUser)
    .patch(usersControllers.updateUser)

.delete(usersControllers.deleteUser);

router
    .route("/:_id")
    .get(usersControllers.getUser)
    //.patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser);

router.route("/signin").post(usersControllers.verifyUser);

//router to fetch user info for profile page
router
    .route("/profile/:id")
    .get(usersControllers.getUserInfo)
    .patch(usersControllers.editUserInfo);

router
    .route("/searchuserlist")
    .post(usersControllers.updateAwaitingConnections);

router
    .route("/waitingConnections")
    .post(usersControllers.getAwaitingConnections);

router.route("/newConnection").post(usersControllers.updateConnections);

router
    .route("/deleteAwaiting")
    .patch(usersControllers.deleteAwaitingConnections);
//router to check if
router.route("/:id/jobsApplied").get(usersControllers.getUserJobsApplied);

router.route("/:id/jobsApplied").post(usersControllers.addJobAppliedToUser);


router.route("/:recruiterID/receivedApplications").get(usersControllers.getAllReceivedApplications)
router.route("/:recruiterID/receivedApplications").post(usersControllers.sendReceivedApplications)

router.route("/post").post(usersControllers.addTimelinePost);

router.route("/:id/posts").get(usersControllers.getUserPostsbyID);
router.route("/:id/connections").get(usersControllers.getConnections);

//router to remove connection
router
    .route("/removeConnection/:id/connections/:connectionid")
    .delete(usersControllers.removeConnection);

router
    .route('/:id/preferences')
    .post(usersControllers.savePreferences);

module.exports = router;