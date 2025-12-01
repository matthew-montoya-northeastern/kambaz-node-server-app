import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        return model.create(newUser);
    }
    const findAllUsers = () => model.find();
    const findUsersByRole = (role) => model.find({ role: role });
    const findUsersByPartialName = (partialName) => {
        const regex = new RegExp(partialName, "i");
        return model.find({
            $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
        });
    };
    const findUserById = (userId) => model.findById(userId);
    const findUserByUsername = (username) =>  model.findOne({ username: username });
    const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
    const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
    const deleteUser = (userId) => (userId) => model.findByIdAndDelete( userId );
    return { createUser, findAllUsers, findUsersByRole, findUsersByPartialName, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser };
}
