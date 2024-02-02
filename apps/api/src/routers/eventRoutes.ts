import { EventController } from '@/controllers/eventController';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;
  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/', this.eventController.getEvents);
    this.router.post('/', this.eventController.createEvent);
    this.router.get('/:id', this.eventController.getEventById);

    this.router.patch('/:id', this.eventController.updateEvent);
    this.router.get('/search', this.eventController.searchEventByTitle); // Route for searching events by title
    this.router.get(
      '/filter/category',
      this.eventController.getEventsByCategory,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
