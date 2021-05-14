import 'dotenv/config';
import "reflect-metadata";
import express from 'express';
import router from './router/index';
import cors from 'cors';
import { createServer } from "http";

import { databaseConnection } from './db/connection';
import { AuthenticateUser } from './middleware/auth';
import { SocketServer} from './sockets'

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

const server = createServer(app);
SocketServer(server);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);  
});

databaseConnection();