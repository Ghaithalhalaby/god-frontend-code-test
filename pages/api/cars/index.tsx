import { NextApiRequest, NextApiResponse } from 'next'
import cars from './cars.json'

// NOTE:This is not a proper API setup.
// It is only to mock API calls for the component.
export default function handlar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.statusCode = 200
      res.json(cars)
      break
    default:
      res.statusCode = 404
      res.end()
      break
  }
}
