'use client';
import { Task } from '@/types/task';
import { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '@/utils/api';

import TaskForm from './TaskForm';
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);



  useEffect(() => {
    fetchTasks().then((res) => {
      console.log('🚀 tasks from API:', res.data);
      setTasks(res.data);
    });
  }, []);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => (showCompleted ? true : !task.is_completed))
    : [];


    const handleAddTask = (newTask: Task) => {
      setTasks([newTask, ...tasks]);
    };
    const handleDeleteTask = async (id: number) => {
      try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (err) {
        console.error('❌ 刪除失敗:', err);
      }
    };

    
const toggleTaskStatus = async (task: Task) => {
  const updatedTask = {
    ...task,
    is_completed: !task.is_completed,
    updated_at: new Date().toISOString(),
  };

  try {
    const newTask = await updateTask(updatedTask);
    console.log('✅ 更新後回傳的任務:', newTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === newTask.id ? newTask : t))
    );
  } catch (err) {
    console.error('❌ 更新任務失敗:', err);
  }
};


const markAsCompleted = async (task: Task) => {
  const updatedTask = {
    ...task,
    is_completed: true,
    updated_at: new Date().toISOString(),
  };

  try {
    const newTask = await updateTask(updatedTask);
    console.log('✅ 更新後回傳的任務:', newTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === newTask.id ? {
        ...newTask,
        updated_at: new Date().toISOString(), // 直接在這邊蓋掉
      } : t))
    );
  } catch (err) {
    console.error('❌ 標記為已完成失敗:', err);
  }
};

const markAsUncompleted = async (task: Task) => {
  const updatedTask = {
    ...task,
    is_completed: false,
    updated_at: new Date().toISOString(),
  };

  try {
    const newTask = await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === newTask.id ? {
        ...newTask,
        updated_at: new Date().toISOString(), // 直接在這邊蓋掉
      } : t))
    );
  } catch (err) {
    console.error('❌ 標記為未完成失敗:', err);
  }
};


    console.log("filteredTasks",filteredTasks)
  return (
    <section>
      <TaskForm onAddTask={handleAddTask} />
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-1 rounded"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {showCompleted ? '隱藏已完成' : '顯示已完成'}
      </button>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="p-3 border rounded shadow-sm">
            <p className="font-medium">{task.name}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-xs text-gray-400">
              {task.is_completed ? '✅ 已完成' : '🕒 未完成'}
            </p>
            <div className="flex space-x-2 mt-1">
  <button
    onClick={() => markAsCompleted(task)}
    disabled={task.is_completed}
    className={`px-2 py-1 text-white rounded ${
      task.is_completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
    }`}
  >
    標記為已完成
  </button>
  <button
    onClick={() => markAsUncompleted(task)}
    disabled={!task.is_completed}
    className={`px-2 py-1 text-white rounded ${
      !task.is_completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
    }`}
  >
    標記為未完成
  </button>

  <button
  onClick={() => handleDeleteTask(task.id)}
  className="text-sm text-red-600 hover:underline ml-4"
>
  刪除
</button>
</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
