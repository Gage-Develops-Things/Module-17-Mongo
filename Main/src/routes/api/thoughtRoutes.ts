import { Router } from 'express';
const router = Router();
import { getSingleThought, getThoughts, createThought,
    updateSingleThought, deleteSingleThought, addReaction,
    removeReaction, 
} from '../../controllers/thoughtController.js';

// localhost:3001/api/thoughts
router.route('/')
.get(getThoughts) // returns all thoughts
.post(createThought); // creates new thought

// localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought) // gets single user
.put(updateSingleThought)
.delete(deleteSingleThought);

// localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// localhost:3001/api/user/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;