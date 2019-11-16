/* eslint-disable class-methods-use-this */
class Response {
  authSuccess(res, status, token, data, message) {
    const userdata = {
      email: data.email,
      username: data.username,
      githubUsername: data.githubUsername,
    };
    return res.status(status).json({
      status,
      message,
      token,
      data: userdata,
    });
  }

  success(res, status, data, message, purpose) {
    switch (purpose) {
      case 'verifynumber':
        return res.status(status).json({
          status,
          message,
          userCode: data,
        });
      case 'completeresetpassword':
        return res.status(status).json({
          status,
          message,
        });
      case 'nodata':
        return res.status(status).json({
          status,
          message,
        });
      default:
        return res.status(status).json({
          status,
          message,
          data,
        });
    }
  }

  handleError(res, status, error) {
    return res.status(status).json({
      status,
      message: error,
    });
  }

  handleValidationError(res, status, error) {
    return res.status(status).json({
      status,
      message: 'Incomplete(Invalid) Request Payload',
      error,
    });
  }
}
module.exports = new Response();
