/* eslint-disable class-methods-use-this */
class Response {
  authSuccess(res, status, token, data, message) {
    return res.status(status).json({
      status,
      message,
      token,
      data,
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
}
export default new Response();
