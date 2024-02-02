'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

interface AddEventFormProps {
  onAddEvent: (event: Event) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [seat, setSeat] = useState<number | ''>('');
  const [imageOption, setImageOption] = useState<'upload' | 'url'>('upload');

  useEffect(() => {
    // Set the initial date value to today
    const today = new Date();
    setDay(today.getDate().toString());
    setMonth((today.getMonth() + 1).toString());
    setYear(today.getFullYear().toString());
  }, []);

  const generateDateOptions = () => {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(currentDate.getFullYear() + 4);

    const dateOptions = [];
    let currentDatePointer = currentDate;

    while (currentDatePointer <= endDate) {
      const formattedDate = currentDatePointer.toISOString().split('T')[0];
      dateOptions.push(formattedDate);
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    return dateOptions;
  };

  const dateOptions = generateDateOptions();

  const locations = ['Jakarta', 'Batam', 'Bali'];
  const categories = ['Music', 'Sport', 'Festival'];

  const formatPrice = (value: string): string => {
    const numberValue = parseFloat(value) || 0;
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberValue);

    return formattedPrice;
  };

  const handleAddEvent = async () => {
    if (!title || !day || !month || !year || !category || !location || !seat) {
      alert('Please fill in all fields');
      return;
    }
    alert('event added !');
    const selectedDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(selectedDate.getTime())) {
      alert('Invalid date');
      return;
    }
    if (selectedDate < new Date()) {
      alert('Please select a future date');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/events');
      const existingEvents = response.data;

      const newEvent: Event = {
        id: existingEvents.length + 1,
        title,
        description,
        details,
        dateTime: selectedDate.toISOString().split('T')[0],
        category,
        location,
        price: parseFloat(price) || 0,
        seat: parseInt(seat) || 0,
        image: imageUrl,
      };

      await axios.post('http://localhost:8000/api/events', newEvent);

      console.log('New Event:', newEvent);

      onAddEvent(newEvent);

      // Clear the form fields
      setTitle('');  
      setDescription('');
      setDetails('');
      setDay('');
      setMonth('');
      setYear('');
      setCategory('');
      setLocation('');
      setPrice('');
      setSeat('');
      setImage('');
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle the error as needed
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
        // Clear URL input when an image is uploaded
        setImageUrl('');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear image data when URL is provided
    setImage('');
    setImageUrl(event.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>

      <div className="mb-2">
        <label className="block">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            className="border p-2 w-full mt-1"
          />
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Details:
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-2 w-full mt-1 h-32 resize-none"
          />
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Date:
          <div className="flex">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border p-2 w-1/4 mr-2"
            >
              <option value="" disabled>
                Day
              </option>
              {[...Array(31).keys()].map((day) => (
                <option
                  key={day + 1}
                  value={(day + 1).toString().padStart(2, '0')}
                >
                  {(day + 1).toString().padStart(2, '0')}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border p-2 w-1/4 mr-2"
            >
              <option value="" disabled>
                Month
              </option>
              {[...Array(12).keys()].map((month) => (
                <option
                  key={month + 1}
                  value={(month + 1).toString().padStart(2, '0')}
                >
                  {(month + 1).toString().padStart(2, '0')}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 w-1/4"
            >
              <option value="" disabled>
                Year
              </option>
              {Array.from(
                { length: 5 },
                (_, index) => new Date().getFullYear() + index,
              ).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 w-full mt-1"
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full mt-1"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="border p-2 w-full mt-1"
          />
          <div className="text-gray-500 mt-1">
            {formatPrice(price.toString())}
          </div>
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Available Seat:
          <input
            type="number"
            value={seat}
            onChange={(e) => setSeat(parseInt(e.target.value) || '')}
            className="border p-2 w-full mt-1"
          />
        </label>
      </div>

      <div className="mb-2">
        <label className="block">
          Image:
          <div className="flex items-center mt-1">
            <select
              value={imageOption}
              onChange={(e) =>
                setImageOption(e.target.value as 'upload' | 'url')
              }
              className="border p-2 mr-2"
            >
              <option value="upload">Upload</option>
              <option value="url">URL</option>
            </select>

            {imageOption === 'upload' ? (
              <div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="border p-2"
                />
                {image && (
                  <img
                    src={image}
                    alt="Event"
                    className="mt-2 max-w-full h-auto"
                  />
                )}
              </div>
            ) : (
              <input
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                className="border p-2 w-full"
              />
            )}
          </div>
        </label>
      </div>
      <button
        onClick={handleAddEvent}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Event
      </button>
    </div>
  );
};

export default AddEventForm;
