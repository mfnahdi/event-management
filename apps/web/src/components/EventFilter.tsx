
import React from 'react';

interface EventFilterProps {
  categories: string[];
  locations: string[];
  onFilterChange: (key: string, value: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ categories, locations, onFilterChange }) => {
  return (
    <div className='p-4'>
      <label>Category:</label>
      <select onChange={(e) => onFilterChange('category', e.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label>Location:</label>
      <select onChange={(e) => onFilterChange('location', e.target.value)}>
        <option value="">All</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventFilter;
