const E500 = (message, statusCode) => {
  return {
    status: "error",
    message: message || "Something went wrong",
    code: statusCode || 500,
    data: null,
  };
};

export default E500;
