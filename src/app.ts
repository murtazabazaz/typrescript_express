import express from 'express';

import { connectdb } from './utils/db';
import UserRoutes from './routes/user';


const app = express();

const PORT = 3030;

connectdb();


app.use(express.json());
app.use(express.urlencoded())

                   
app.use('/api', UserRoutes)



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})