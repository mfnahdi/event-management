import { createEventAction } from '@/action/createEventAction';
import { allEventsAction } from '@/action/getAllEventAction';
import { getEventsByCategoryAction } from '@/action/getEventByCategoryAction';
import { getEventByIdAction } from '@/action/getEventByIdAction';
import { searchEventByTitleAction } from '@/action/searchEventsByTitleAction';
import { updateEventAction } from '@/action/updateEventAction';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    const { category } = req.query;

    try {
      let result;
      if (category !== '') {
        result = await getEventsByCategoryAction(category as string);
      } else {
        result = await allEventsAction();
      }
      res.status(result.status).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const addResult = await createEventAction(data);
      res.status(addResult.status).send(addResult);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = parseInt(req.params.id, 10);
      const event = await getEventByIdAction(eventId);
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send({ message: 'Event not found' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getEventsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query;
      const result = await getEventsByCategoryAction(category as string);

      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await updateEventAction(id, req.body);
      res.status(result.status).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async patchEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = parseInt(req.params.id, 10);
      const eventData = req.body;

      const result = await updateEventAction(eventId, eventData);

      if (result.status === 200) {
        res.status(200).send(result.data);
      } else {
        res.status(result.status).send(result.message);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async searchEventByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      await searchEventByTitleAction(req, res, next);
    } catch (error) {
      console.error('Error searching events by title:', error);
      next(error);
    }
  }
}
