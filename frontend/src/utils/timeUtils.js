export const getTimeSincePost = (dateTime) => {
  const postTime = new Date(dateTime).getTime();
  const currentTime = Date.now();
  const elapsedMs = currentTime - postTime;
  const elapsedSeconds = elapsedMs / 1000;
  const elapsedMinutes = elapsedSeconds / 60;
  if (Math.floor(elapsedMinutes) === 0) {
    return (
      Math.floor(elapsedSeconds) + getUnit(elapsedSeconds, " second") + " ago"
    );
  }
  const elapsedHours = elapsedMinutes / 60;
  if (Math.floor(elapsedHours) === 0) {
    return (
      Math.floor(elapsedMinutes) + getUnit(elapsedMinutes, " minute") + " ago"
    );
  }
  const elapsedDays = elapsedHours / 24;
  if (Math.floor(elapsedDays) === 0) {
    return Math.floor(elapsedHours) + getUnit(elapsedHours, " hour") + " ago";
  }
  const elapsedWeeks = elapsedDays / 7;
  if (Math.floor(elapsedWeeks) === 0) {
    return Math.floor(elapsedDays) + getUnit(elapsedDays, " day") + " ago";
  }

  return new Date(dateTime).toDateString();
};

const getUnit = (value, unit) => {
  return Math.floor(value) === 1 ? unit : unit + "s";
};
