const express = require("express");
const Lecture = require("../models/lecture.model");
const Student = require("../models/student.model");
const User = require("../models/user.model");

const authenticate = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");
const router = express.Router();


// post "/lectures" => add a new book ( authentication required and only instructors and admins can create a new lecture)
router.post("/", authenticate, authorize(['admin', 'instructor']), async (req, res) => {
    try {
        const lecture = await Lecture.create({
            title: req.body.title,
            user: req.user._id,
            batch: req.user.batch
       });
       if ( !lecture ) return res.status(500).json({ status: "failure", msg: "something went wrong!" });
       res.status(201).json({ status: "success", msg: "lecture created successfully!", data: lecture });
    } catch ( err ) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" });
    }
})

// get "/lectures" => get all lectures ( authentication not required for this endpoint).
router.get("/", async (req, res) => {
    try {
        const lectures = await Lecture.find();
        if ( !lectures || !lectures.length ) return res.status(404).json({ status: "success", msg: "No lectures found!" });
        res.status(200).json({ status: "success", data: lectures });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
});

// get "/lectures/:id" ( authentication not required )
router.get("/:id", async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture with given id doesnt exist!" });
        res.status(200).json({ status: "success", data: lecture });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
});

// patch "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can update a lecture )
router.patch("/:id", authenticate, authorize(['admin', 'instructor']), async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture does not exist found!" });
        if ( lecture.user !== req.user._id ) return res.status(403).json({ status: "failure", msg: "you do not have permission to edit this lecture!"});
        
        const updatedLecture = await Lecture.updateOne({ _id: req.params.id }, {
            ...req.body
        }, {
            returnOriginal: false
        });

        res.status(200).json({ status: "success", data: updatedLecture });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
});

// delete "/lectures/:lecture_id" ( authentication required and only the instructor who created the lecture or admin can delete the lecture)
router.patch("/:id", authenticate, authorize(['admin', 'instructor']), async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture does not exist found!" });
        if ( lecture.user !== req.user._id ) return res.status(403).json({ status: "failure", msg: "you do not have permission to delete this lecture!"});
        
        const updatedLecture = await Lecture.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: "success", msg: "deleted successfully!"});
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
});



module.exports = router;