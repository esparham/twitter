const apiCall = async (requestConfig) => {
  try {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : 'GET',
      headers: requestConfig.headers
        ? requestConfig.headers
        : {
            ...(requestConfig.body && {
              'Content-Type': 'application/json',
            }),
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      body: requestConfig.body
        ? JSON.stringify(requestConfig.body)
        : requestConfig.formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export default apiCall;
