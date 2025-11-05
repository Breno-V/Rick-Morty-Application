import express from 'express';
import { catchAllCharacter, catchCharacterByPk, catchCharactersByName } from '../controllers/characterController.js';

const router = express.Router();

router.get("/", catchAllCharacter);
router.get("/:id", catchCharacterByPk);
router.get("/search/name", catchCharactersByName); 

export default router;