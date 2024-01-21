import { Router } from "express";
import { register, login, logout, profile, verify_token } from "../controllers/auth.controller.js";
import { auth_require } from "../middlewares/validate_token.js";
import { validate_schema } from "../middlewares/validate_form.js";
import { register_schema, login_schema } from "../schemas/auth.scheme.js";

const router = Router();

router.post('/register', validate_schema(register_schema), register);
router.post('/login', validate_schema(login_schema), login);
router.get('/logout', logout);
router.get('/profile', auth_require, profile);
router.get('/verify', verify_token);

export default router;