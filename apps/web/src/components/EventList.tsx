import { useRouter } from 'next/navigation';
import React from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  details: string;
  price: number;
  dateTime: Date;
  category: string;
  location: string;
  seat: number;
  image: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const router = useRouter();

  const handleEventClick = (eventId: number) => {
    router.push(`/event-details/${eventId}`);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => handleEventClick(event.id)}
          className="border rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-white"
        >
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-yellow-600 mb-2">
              Rp {event.price.toLocaleString('en-US')},00
            </p>
            <p className="text-gray-600 mb-2">{formatDate(event.dateTime)}</p>
            <p className="text-blue-500">{event.category}</p>
            <p className="text-gray-500">{event.location}</p>
            <p className="text-gray-500">Available seat: {event.seat}</p>

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4"
              onClick={() => handleEventClick(event.id)}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
