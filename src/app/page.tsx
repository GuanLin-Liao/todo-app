import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 ToDo List</h1>
      <TaskList />
    </main>
  );
}
