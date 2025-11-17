import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Layout from '../layouts/Layout';


type Tutor = {
    id: number;
    full_name: string;
    email: string;
    role: string;
};

type Session = {
    id: number;
    title: string;
    date: string;
    time: string;
    description?: string | null;
};


export default function TutorDashboard({
    sessions,
    tutor,
}: {
    sessions: Session[];
    tutor: Tutor;
}) {
  const { data, setData, post, reset } = useForm({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route("tutor.session.store"), {
        onSuccess: () => reset(),
    });
}


  return (
    <Layout>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Welcome, {tutor.full_name}</h1>

      {/* Add session */}
      <h2 className="text-xl mt-6 mb-3">Add New Session</h2>
      <form onSubmit={submit} className="grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          value={data.date}
          onChange={(e) => setData('date', e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="time"
          value={data.time}
          onChange={(e) => setData('time', e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description..."
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Session
        </button>
      </form>

      {/* Sessions list */}
      <h2 className="text-xl mt-10 mb-3">Your Sessions</h2>

      {sessions.length === 0 && <p>No sessions found.</p>}

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.title}</td>
              <td className="border p-2">{s.date}</td>
              <td className="border p-2">{s.time}</td>
              <td className="border p-2">{s.description}</td>
              <td className="border p-2">
                <form method="POST" action={route("tutor.session.delete", s.id)}>
                  <input type="hidden" name="_method" value="DELETE" />
                  <button className="text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </Layout>
  );
}
