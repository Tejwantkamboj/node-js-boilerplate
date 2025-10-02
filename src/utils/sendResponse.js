const sendResponse = (res, status, message, data = null) => {
  const response = {
    status,
    message,
    data,
  };

  return res.status(status).send(response);
};

export default sendResponse;
