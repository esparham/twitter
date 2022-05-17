const formatDate = (date, showDate = true, showTime = true) => {
  let params = {};

  if (showDate) {
    params.year = 'numeric';
    params.month = 'long';
    params.day = 'numeric';
  }
  if (showTime) {
    params.hour = 'numeric';
    params.minute = 'numeric';
  }

  return new Date(date).toLocaleDateString(undefined, params);
};

export default formatDate;
