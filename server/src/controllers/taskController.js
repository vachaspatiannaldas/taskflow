import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const query = { user: req.user._id };

  const { startDate, endDate } = req.query;

  if (startDate && endDate) {
    query.dueDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const tasks = await Task.find(query).sort({ dueDate: 1 });
  res.status(200).json(tasks);
};


export const createTask = async (req, res) => {
  const { text, priority, dueDate } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const task = await Task.create({
    text,
    priority,
    dueDate,
    user: req.user._id,
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  if (
    typeof req.body.isCompleted === 'boolean' &&
    req.body.isCompleted !== task.isCompleted
  ) {
    req.body.completedAt = req.body.isCompleted
      ? new Date()
      : null;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTask);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await task.deleteOne();
    res.status(200).json({ id: req.params.id });
};