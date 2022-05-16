require('dotenv').config({ path: './.env' });
const connectDB = require('./config/database.config');
const app = require('./config/express.config');

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Listening on port ${PORT}`);
});
