import Task from '../models/task.model.js'

/** Método para obtener todas las tareas de la base de datos */
export const get_tasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate('user');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Método para obtener una tarea de la base de datos */
export const get_task = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Método para crear una tarea y guardarla en la base de datos */
export const create_task = async (req, res) => {
    const { title, description, date } = req.body;

    try {
        const new_task = new Task({
            title,
            description,
            date,
            user: req.user.id
        });

        const saved_task = await new_task.save();
        res.json(saved_task);
    } catch (error) {
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Método para eliminar una tarea de la base de datos */
export const delete_task = async (req, res) => {
    try {
        const deleted_task = await Task.findByIdAndDelete(req.params.id);

        if (!deleted_task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Actualizar una tarea de la base de datos */
export const update_task = async (req, res) => {
    try {
        const updated_task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user');

        if (!update_task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updated_task);
    } catch (error) {
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}