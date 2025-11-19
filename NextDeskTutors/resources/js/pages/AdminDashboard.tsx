import { Inertia } from '@inertiajs/inertia';
import Layout from '../layouts/Layout';

interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  tutor_name?: string;
}

interface Booking {
  id: number;
  status: string;
  session: Session;
  student_name?: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
}

interface Props {
  sessions: Session[];
  bookings: Booking[];
  users: User[];
}


export default function AdminDashboard({ sessions, bookings, users}: Props) {
  const handleCancelBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      Inertia.delete(`/admin/bookings/${bookingId}`);
    }
  };

  const handleDeleteSession = (sessionId: number) => {
    if (confirm('Are you sure you want to delete this session?')) {
      Inertia.delete(`/admin/sessions/${sessionId}`);
    }
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <section className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">All Users</h2>
  <table className="min-w-full border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">ID</th>
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user: User) => (
        <tr key={user.id}>
          <td className="p-2 border">{user.id}</td>
          <td className="p-2 border">{user.full_name}</td>
          <td className="p-2 border">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>



        {/* All Sessions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">All Tutor Sessions</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Tutor</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td className="p-2 border">{s.title}</td>
                  <td className="p-2 border">{s.tutor_name || 'Unknown'}</td>
                  <td className="p-2 border">{s.date}</td>
                  <td className="p-2 border">{s.time}</td>
                  <td className="p-2 border">{s.description}</td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDeleteSession(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* All Bookings */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Session</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-2 border">{b.student_name || 'Unknown'}</td>
                  <td className="p-2 border">{b.session.title}</td>
                  <td className="p-2 border">{b.session.date}</td>
                  <td className="p-2 border">{b.session.time}</td>
                  <td className="p-2 border">{b.status}</td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleCancelBooking(b.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </Layout>
  );
}
