function ApiErrorFactory() {
  const createError = (type, error) => {
    return {
      isApiError: true,
      service: 'incidents',
      type,
      error,
    };
  }

  return { createError }
}

module.exports = ApiErrorFactory;
