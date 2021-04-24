import express from 'express';
import { getDetails, updateProfile, deleteUser } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js';
import { userProfile } from '../middleware/userProfile.js';
const router = express.Router();

router.get("/:id", getDetails);
router.put("/updateProfile/:id", auth, csrfProtection, userProfile, updateProfile);
router.delete("/:id", auth, csrfProtection, userProfile, deleteUser);

export default router;