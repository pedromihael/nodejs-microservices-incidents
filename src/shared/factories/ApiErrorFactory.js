function ApiErrorFactory() {
  const createError = (type, error, code = 400) => {
    return ({
      isApiError: true,
      service: 'incidents',
      type,
      error,
      code,
    });
  }

  return { createError }
}

module.exports = ApiErrorFactory;
