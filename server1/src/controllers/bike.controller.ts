import { Request, Response } from 'express';
import Bike, { LOCATIONS } from '../models/Bike';
import { asyncHandler } from '../utils/asyncHandler';

export const getBikes = asyncHandler(async (req: Request, res: Response) => {
  const { location, date, available, unit } = req.query;
  const filter: any = {};

  if (location) filter['location.area'] = location;
  if (available !== 'false') filter.isAvailable = true;

  // If date provided, exclude bikes that are unavailable on that date
  let bikes = await Bike.find(filter).sort({ createdAt: -1 });
  if (unit === 'hours') {
    bikes = bikes.filter((bike) => bike.isHourlyAvailable);
  }
  if (date) {
    const checkDate = new Date(date as string);
    bikes = bikes.filter((bike) =>
      !bike.unavailableDates.some((range) => checkDate >= range.from && checkDate <= range.to)
    );
  }

  res.json({ bikes });
});

export const getBikeById = asyncHandler(async (req: Request, res: Response) => {
  const bike = await Bike.findById(req.params.id);
  if (!bike) return res.status(404).json({ message: 'Bike not found' });
  res.json({ bike });
});

export const getLocations = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ locations: LOCATIONS });
});
