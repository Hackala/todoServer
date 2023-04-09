import todoRouter from './todo';

export default (app) => {
    app.use('/', todoRouter);
}