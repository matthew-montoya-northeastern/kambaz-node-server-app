import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const assignments = dao.findAssignmentsForCourse(req.params.courseId);
        res.json(assignments);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const assignment = {
            ...req.body,
            course: req.params.courseId,
        };
        const newAssignment = dao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const updated = dao.updateAssignment(req.params.assignmentId, req.body);
        res.send(updated);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        dao.deleteAssignment(req.params.assignmentId);
        res.sendStatus(200);
    });
}