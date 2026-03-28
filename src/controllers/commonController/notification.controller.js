import { Notification } from '../../modals/index.js';
import { sendResponse, catchAsync } from '../../utils/index.js';
import httpStatus from 'https';

const createNotification = catchAsync(async (req, res) => {
  const notification = await Notification.create(req.body);
  sendResponse(res, httpStatus.CREATED, 'Notification created successfully', notification);
});

const notificationList = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const query = { to: req.user.id };
  const options = { page, limit };
  const notifications = await Notification.paginate(query, options);
  sendResponse(res, httpStatus.OK, 'Notification list retrieved successfully', notifications);
});

const readAllNotifications = catchAsync(async (req, res) => {
  await Notification.updateMany({ to: req.user.id, isRead: false }, { isRead: true });
  sendResponse(res, httpStatus.OK, 'All notifications marked as read');
});

const markSelectedNotificationsAsRead = catchAsync(async (req, res) => {
  const { notificationIds } = req.body;
  await Notification.updateMany({ _id: { $in: notificationIds }, to: req.user.id }, { isRead: true });
  sendResponse(res, httpStatus.OK, 'Selected notifications marked as read');
});

export { createNotification, notificationList, readAllNotifications, markSelectedNotificationsAsRead };
