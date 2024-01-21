import { Router } from "express";
import { auth_require } from "../middlewares/validate_token.js";
import { get_tasks, get_task, create_task, delete_task, update_task } from '../controllers/task.controller.js';
import { validate_schema } from "../middlewares/validate_form.js";
import { create_task_schema } from "../schemas/task.schema.js";

const router = Router();

router.get('/tasks', auth_require, get_tasks);                                         //para obtener todas las tareas
router.get('/tasks/:id', auth_require, get_task);                                      //para obtener una tarea 
router.post('/tasks', auth_require, validate_schema(create_task_schema), create_task); //para crear una tarea
router.delete('/tasks/:id', auth_require, delete_task);                                //para eliminar una tarea
router.put('/tasks/:id', auth_require, update_task);                                   //para actualizar una tarea

export default router;