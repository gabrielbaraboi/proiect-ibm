import express from 'express';
import { getDetails, updateProfile } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js'
const router = express.Router();

router.get("/:id", getDetails);
router.put("/updateProfile/:id", auth,csrfProtection, updateProfile);

export default router;