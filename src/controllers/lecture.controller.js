const Lecture = require("../models/lecture.model");
const Student = require("../models/student.model");
const User = require("../models/user.model");

const createLecture = async (req, res) => {
    try {
        const lecture = await Lecture.create({
            title: req.body.title,
            user: req.user._id,
            batch: req.body.batch
        });
        if ( !lecture ) return res.status(500).json({ status: "failure", msg: "something went wrong!" });
        res.status(201).json({ status: "success", msg: "lecture created successfully!", data: lecture });
    } catch ( err ) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" });
    }
};

const getAllLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        if ( !lectures || !lectures.length ) return res.status(404).json({ status: "success", msg: "No lectures found!" });
        res.status(200).json({ status: "success", data: lectures });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
};

const getOneLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture with given id doesnt exist!" });
        res.status(200).json({ status: "success", data: lecture });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
};

const updateLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture does not exist found!" });
        if ( req.user.roles !== "admin" && lecture.user !== req.user._id ) return res.status(403).json({ status: "failure", msg: "you do not have permission to edit this lecture!"});
        const updatedLecture = await Lecture.findByIdAndUpdate( req.params.id, {
            ...req.body
        }, {
            returnOriginal: false
        });

        res.status(200).json({ status: "success", data: updatedLecture });
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
};

const deleteLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if ( !lecture ) return res.status(404).json({ status: "failure", msg: "lecture does not exist found!" });
        if ( req.user.roles !== "admin" && lecture.user !== req.user._id ) return res.status(403).json({ status: "failure", msg: "you do not have permission to delete this lecture!"});
        
        await Lecture.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: "success", msg: "deleted successfully!"});
    } catch (err) {
        res.status(500).json({ status: "failure", msg: "something went wrong!" })
    }
};


module.exports = {
    createLecture,
    getAllLectures,
    getOneLecture,
    updateLecture,
    deleteLecture
};