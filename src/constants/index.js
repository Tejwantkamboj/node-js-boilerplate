import notificationResponses from './notification.constants.js';
import authResponses from './responses/auth.responses.js';
import emailResponses from './responses/emailResponses.js';

const defaultResponses = [
  {
    path: 'notification',
    response: notificationResponses,
  },
  {
    path: 'auth',
    response: authResponses,
  },
  {
    path: 'email',
    response: emailResponses,
  },
];

export default defaultResponses;

export { notificationResponses, authResponses, emailResponses };
