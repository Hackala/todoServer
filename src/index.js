import config from './config';
import app from './express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
//mongoose.set('useCreateIndex', true);
//mongoose.set('useNewUrlParser', true);
mongoose.connect(config.mongo);
mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${config.mongo}`) });

app.timeout = 0
app.listen(config.port, (err) => { console.log(`Server started on port ${config.port}`) })
