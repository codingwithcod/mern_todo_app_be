import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    // do some proccessing for error ...
    console.log('global error found :::: ', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  } catch (error) {
    console.log(error);
  }
};

export default errorHandler;
