import express from 'express';
import { getDetails, updateProfile, deleteUser, getProfilePicture } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js';
import { userProfile } from '../middleware/userProfile.js';
import multer from 'multer';
const router = express.Router();
const upload = multer({dest : 'uploads/'});

router.get("/:id", getDetails);
router.put("/updateProfile/:id", auth, csrfProtection, userProfile,upload.single('profile-picture'), updateProfile);
router.delete("/:id", auth, csrfProtection, userProfile, deleteUser);
router.get("/:id/profilePicture", getProfilePicture);

export default router;