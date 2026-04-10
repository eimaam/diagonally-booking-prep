import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();

router.get('/', ProfileController.getAllProfiles);
router.get('/:id', ProfileController.getProfiileById);

export default router;