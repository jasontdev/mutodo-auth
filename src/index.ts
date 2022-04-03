import dotenv from 'dotenv';
import app from './app';
import { getJwtSecret, getDatabaseUrl } from './secrets';

(async function () {
  try {
    dotenv.config();
    const jwtSecret = await getJwtSecret();
    const databaseUrl = await getDatabaseUrl();

    console.log('Starting mutado/auth');
    app(4000, jwtSecret, databaseUrl);
  } catch (error) {
    console.log(error);
  }
})();
