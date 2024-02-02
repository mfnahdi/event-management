import { useState } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  description: string;
  details: string;
  date: string;
  category: string;
  location: string;
  price: number;
  image: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Event[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(true);

  const handleEventClick = (eventId: number) => {
    window.location.href = `/event-details/${eventId}`;
    setShowDropdown(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Event[]>(
        'http://localhost:8000/api/events',
      );
      setResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchData = debounce(fetchData, 2000);

  const updateResults = (newQuery: string) => {
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    debouncedFetchData();
    setShowDropdown(true);
  };

  const filteredResults = results.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="container">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-4 w-96 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          value={query}
          onChange={(e) => updateResults(e.target.value)}
        />

        {showDropdown && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-300 rounded-md shadow-md">
            {filteredResults.map((event) => (
              <div
                key={event.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleEventClick(event.id)}
              >
                {event.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
