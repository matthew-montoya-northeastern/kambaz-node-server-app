import model from "./model.js";

export default function EnrollmentsDao(db) {
    async function findCoursesForUser(userId) {
        const enrollments = await model.find({ user: userId }).populate("course");
        return enrollments.map((enrollment) => enrollment.course);
    }

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    }

    async function enrollUserInCourse(userId, courseId) {
        const id = `${userId}-${courseId}`;
        const existing = await model.findById(id);
        if (existing) return existing;

        return model.create({
            _id: id,
            user: userId,
            course: courseId,
            enrollmentDate: new Date(),
        });
    }

    async function unenrollUserFromCourse(user, course) {
        return model.deleteOne({ user: user, course: course });
    }

    async function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    async function findEnrollmentsByUser(user) {
        const enrollments = await model
            .find({ user: user })
            .populate("course");
        return enrollments.map((e) => e.course);
    }

    return {
        findCoursesForUser,
        findUsersForCourse,
        findEnrollmentsByUser,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse,
    };
}
