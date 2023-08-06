import express from 'express'
import { getUser, getUserFollowers, addRemoveFollower} from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get("/:id", getUser);
// router.get("/:id", verifyToken, getUser);

export default router;