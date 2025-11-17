import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FormEvent } from 'react';
import { route } from 'ziggy-js';
import Layout from '../layouts/Layout';

interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
}

interface Booking {
  id: number;
  status: string;
  session: Session;
}

interface Props {
  sessions: Session[];
  myBookings: Booking[];
}

export default function StudentDashboard({ sessions, myBookings }: Props) {
  const handleBook = (session_id: number) => {
    Inertia.post(route('student.book'), { session_id });
  };

  const handleUpdate = (bookingId: number, date: string, time: string) => {
    Inertia.put(route('student.booking.update', bookingId), { date, time });
  };

  const handleCancel = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      Inertia.delete(route('student.booking.cancel', bookingId));
    }
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Student Dashboard</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Sessions</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
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
                  <td className="p-2 border">{s.date}</td>
                  <td className="p-2 border">{s.time}</td>
                  <td className="p-2 border">{s.description}</td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={() => handleBook(s.id)}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-2 border">{b.session.title}</td>
                  <td className="p-2 border">
                    <input
                      type="date"
                      defaultValue={b.session.date}
                      onChange={(e) => (b.session.date = e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="time"
                      defaultValue={b.session.time}
                      onChange={(e) => (b.session.time = e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border">{b.status}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded"
                      onClick={() =>
                        handleUpdate(b.id, b.session.date, b.session.time)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleCancel(b.id)}
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
