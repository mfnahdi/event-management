'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../../components/Modal';
import ReviewSection from '@/components/review';

const EventDetailsComponent: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numTickets, setNumTickets] = useState(1);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventId = Number(window.location.pathname.split('/').pop());
        console.log('Fetching event details for event ID:', eventId);
        const response = await axios.get(
          `http://localhost:8000/api/events/${eventId}`,
        );
        console.log('Response data:', response.data);
        setEventDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, []);

  console.log('Event details state:', eventDetails);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSuccess = async () => {
    if (eventDetails) {
      try {
        const updatedSeatCount = eventDetails.seat - numTickets;
        await axios.patch(
          `http://localhost:8000/api/events/${eventDetails.id}`,
          {
            seat: updatedSeatCount,
          },
        );

        setEventDetails((prevDetails) => ({
          ...prevDetails!,
          seat: updatedSeatCount,
        }));

        alert(`Transaction successful! ${numTickets} seat(s) reserved.`);
        closeModal(); // Close the modal after a successful transaction
      } catch (error) {
        console.error('Error updating available seat count:', error);
        // Handle the error as needed
        alert('Error updating available seat count. Please try again.');
      }
    }
  };

  const handleNumTicketsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const num = parseInt(event.target.value);
    setNumTickets(num);
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const eventFee = eventDetails.price * numTickets * 0.1;
  const subtotal = eventDetails.price * numTickets;
  const eventDate = new Date(eventDetails.dateTime);

  const formattedDate = `${eventDate.getFullYear()}-${
    eventDate.getMonth() + 1
  }-${eventDate.getDate()}`;
  const formattedPrice = eventDetails.price.toLocaleString('en-US');
  const total = subtotal + eventFee;
  const formattedTotal = total.toLocaleString('en-US');
  return (
    <div
      className="container mx-auto bg-cover bg-no-repeat bg-center flex-col"
      style={{ backgroundImage: `url('/aa.jpg')` }}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <img
          src={eventDetails.image}
          alt={eventDetails.title}
          className="w-full h-64 object-cover mb-6 rounded-md"
        />
        <h2 className="text-3xl font-bold mb-4">{eventDetails.title}</h2>
        <p className="text-gray-600 mb-4">{eventDetails.description}</p>
        <p className="text-gray-600 mb-4" style={{ whiteSpace: 'pre-wrap' }}>
          {eventDetails.details}
        </p>
        <p className="text-yellow-600 mb-4">Rp {formattedPrice},00</p>
        <p className="text-gray-600 mb-4">{formattedDate}</p>
        <p className="text-blue-500 mb-4">{eventDetails.category}</p>
        <p className="text-gray-500 mb-4">{eventDetails.location}</p>
        <p className="text-gray-500">Available seat: {eventDetails.seat}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={openModal}
        >
          Buy Ticket
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onTransactionSubmit={handleTransactionSuccess}
        >
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>{eventDetails.title}</span>
              <span>Rp {eventDetails.price},00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rp {subtotal},00</span>
            </div>
            <div className="mb-2">
              <label
                htmlFor="numTickets"
                className="block text-gray-700 font-bold mb-2"
              >
                Number of Tickets:
              </label>
              <input
                id="numTickets"
                type="number"
                min="1"
                value={numTickets}
                onChange={handleNumTicketsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Fees (10% of event price per ticket)</span>
              <span>Rp {eventFee.toFixed(0)},00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rp {formattedTotal},00</span>
            </div>
          </div>
        </Modal>
        <ReviewSection />
      </div>
    </div>
  );
};

export default EventDetailsComponent;
