// lib/db.ts
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://username:password@cluster-name.mongodb.net/database-name';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
