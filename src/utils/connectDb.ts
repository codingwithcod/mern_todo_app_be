import mongoose from 'mongoose';

const connectDb = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    console.log('database connected ...');
  } catch (error) {
    console.log(error);
    console.log('database not connected !!!');
  }
};

export default connectDb;
