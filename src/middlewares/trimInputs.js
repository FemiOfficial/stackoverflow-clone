const trimInputs = (request, response, next) => {
  for (const index in request.body) {
    request.body[index] = typeof request.body[index] === 'string'
      ? request.body[index].trim() : request.body[index];
  }
  next();
};

export default trimInputs;
