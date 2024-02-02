// Import dependencies
import { Router } from 'express';
import { reviewController } from '@/controllers/reviewController';

// Create a new router instance
export class ReviewRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // Create a new review
    this.router.post('/reviews', reviewController.createReview);

    // Get reviews by eventId
    this.router.get('/reviews/:eventId', reviewController.getReviewsByEventId);
  }
}

// Export an instance of the ReviewRouter
export default new ReviewRouter().router;
