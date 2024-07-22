export default function isRateStillValid(timestamp: number) {
  // get time at this moment
  const currentTimestamp = Date.now();
  // how much time has passed since last operation
  const timeBetweenOperations = currentTimestamp - timestamp;
  // convert to minutes
  const timeBetweenOperationsInMinutes = timeBetweenOperations / 1000 / 60;
  // rate is valid is last operation occured less than 5 minutes ago
  return timeBetweenOperationsInMinutes < 5;
}