const express = require("express");

const lectureController = require("../controllers/lecture.controller");

const authenticate = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");
const router = express.Router();


// post "/lectures" => add a new book ( authentication required and only instructors and admins can create a new lecture)
router.post("/", authenticate, authorize(['admin', 'instructor']), lectureController.createLecture);

// get "/lectures" => get all lectures ( authentication not required for this endpoint).
router.get("/", lectureController.getAllLectures);

// get "/lectures/:id" ( authentication not required )
router.get("/:id", lectureController.getOneLecture);

// patch "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can update a lecture )
router.patch("/:id", authenticate, authorize(['admin', 'instructor']), lectureController.updateLecture);

// delete "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can delete the lecture)
router.patch("/:id", authenticate, authorize(['admin', 'instructor']), lectureController.deleteLecture);



module.exports = router;