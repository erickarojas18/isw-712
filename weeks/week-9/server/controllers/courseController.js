const Course = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
// const courseGet = (req) => {
//   return Course.find()
//     .then( (course) => {
//       console.log('here', course);
//       return course;
//     })
//     .catch(err => {
//       return { error: "Course doesnt exist" }
//     });
// };

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGetAll = (req, res) => {
  return Course.find((error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseSearch = (params) => {
  return Course.find(
    {
      "name": { $regex: `${params.name}`, $options: 'i' }
    }, (error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};


const addCourse = (req) => {
  console.log('req:', req);
  const course = new Course();
  course.name = req.name;
  course.credit = req.credit;

  course.save();
  return course;
}

module.exports = {
  courseGetAll,
  courseSearch,
  addCourse
}