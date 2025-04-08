const success = (message, data) => {
  console.log(data);
  return {
    message: message,
    data: data,
  };
};

export { success };
