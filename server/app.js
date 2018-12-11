import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import swaggerui from 'swagger-ui-express';
import 'dotenv/config';
import parcelRoutes from './routes/parcelRoutes';
import auth from './routes/auth';
import userRoutes from './routes/userRoutes';
import './db/database';
import swaggerdocs from './swaggerdocs.json';

const app = express();
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Defining routes
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', userRoutes);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerdocs));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({
    message: 'The resource you\'re trying to get is not found',
    try: 'Something like this',
    POST_auth_signup: 'api/v1/auth/signup register a user',
    POST_auth_login: 'api/v1/auth/login login a user',
    PUT_destination: 'api/vi/<parcelid>/destination',
    PUT_status: 'api/v1/<parcelid>/status',
    PUT_presentLocation: 'api/v1/<parcelid>/presentLocation',
  });
});
const port = process.env.PORT || 3000;
app.listen(port);

export default app;
