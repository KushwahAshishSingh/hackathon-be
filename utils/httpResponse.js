const httpStatus500 = (error) => {
    return {
      message: error && error.message ? error.message : "",
      success: false,
    };
  };
  
  const httpStatus200 = (content, message) => {
    return {
      data: content,
      message: message,
      success: true,
    };
  };
  
  const httpStatus304 = (message) => {
    return {
      message: message || "Not Modified",
      success: false,
    };
  };
  
  const httpStatus400 = (message) => {
    return {
      message: message || "Bad Request",
      success: false,
    };
  };
  
  const httpStatus403 = (message) => {
    return {
      message: message || "Not Authorized",
      success: false,
    };
  };
  
  const httpStatus404 = (message, data) => {
    return {
      message: message || "File Not Found",
      data: data || undefined,
      success: false,
    };
  };
  
  const httpStatus409 = (message, data) => {
    return {
      message: message || "Already exist or some conflict",
      data: data || undefined,
      success: false,
    };
  };
  
  module.exports = {
    httpStatus200,
    httpStatus500,
    httpStatus403,
    httpStatus304,
    httpStatus404,
    httpStatus409,
    httpStatus400
  };
  