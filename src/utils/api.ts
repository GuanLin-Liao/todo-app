import { Task } from '@/types/task';

const BASE_URL = 'https://wayi.league-funny.com/api';

export const fetchTasks = async (type: 'all' | 'completed' | 'uncompleted' = 'all') => {
  const res = await fetch(`${BASE_URL}/task?type=${type}`);
  return res.json();
};

export const createTask = async (task: Partial<Task>) => {
  const now = new Date().toISOString();
  const body = { ...task, is_completed: false, created_at: now, updated_at: now };

  const res = await fetch(`${BASE_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
};

export async function updateTask(task: Task): Promise<Task> {
  const res = await fetch(`${BASE_URL}/task/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('更新任務失敗');
  const data = await res.json();
  return data.data; // 根據你的 API 結構
}


export async function deleteTask(id: number) {
  const res = await fetch(`${BASE_URL}/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('刪除失敗');
  }

  return true;
}
