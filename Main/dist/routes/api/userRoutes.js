import { Router } from 'express';
const router = Router();
import { getSingleUser, getUsers, createUser, removeFriend, updateSingleUser, deleteSingleUser, addFriend } from '../../controllers/userController.js';
// localhost:3001/api/user
router.route('/')
    .get(getUsers) // returns all Users
    .post(createUser); // creates new User
// localhost:3001/api/user/:userId
router.route('/:userId')
    .get(getSingleUser) // gets single user
    .put(updateSingleUser)
    .delete(deleteSingleUser);
// localhost:3001/api/user/:userId/friends
router.route('/:userId/friends').post(addFriend);
// localhost:3001/api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);
export default router;
