import React, { useState } from 'react';
import axios from 'axios';
import { Review } from '../types/event-detail';

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number | undefined>(undefined);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmitReview = async () => {
    try {
      if (!content || !rating) {
        alert('Please provide both review content and rating');
        return;
      }

      const response = await axios.post('/api/reviews', {
        content,
        rating,
      });

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);

      alert('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="py-6 p-6 rounded">
      <h2 className="font-semibold text-2xl border-b pb-2 mb-4">Review</h2>

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4">
            <p className="">Review:</p>
            <p className="">{review.content}</p>
            <p>Rating: {review.rating} out of 5</p>
            <p>{new Date(review.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="">No reviews yet.</p>
      )}

      <form onSubmit={handleSubmitReview}>
        <textarea
          placeholder="Write your review..."
          value={content}
          onChange={handleContentChange}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
