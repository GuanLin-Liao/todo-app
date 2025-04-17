'use client';
import { useState } from 'react';
import { Task } from '@/types/task';
import { createTask } from '@/utils/api';

interface Props {
  onAddTask: (newTask: Task) => void;
}

export default function TaskForm({ onAddTask }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證欄位
    if (!name.trim()) {
      setError('任務名稱為必填');
      return;
    }

    setError('');

    // 建立要送出的資料
    const now = new Date().toISOString();
    const newTask = {
      name,
      description,
      is_completed: false,
      created_at: now,
      updated_at: now,
    };

    try {
      const created = await createTask(newTask);
      onAddTask(created.data);
// 回傳給父層更新列表
      setName('');
      setDescription('');
    } catch (err) {
      console.error('❌ 新增失敗:', err);
      setError('新增任務時發生錯誤');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="任務名稱（必填）"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="任務描述（選填）"
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
        新增任務
      </button>
    </form>
  );
}
