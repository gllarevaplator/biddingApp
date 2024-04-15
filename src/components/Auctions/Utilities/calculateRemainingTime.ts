export const calculateRemainingTime = (endTime: Date): string => {
  const actualDate = new Date();
  const remainingBidTime = endTime.getTime() - actualDate.getTime();

  if (remainingBidTime <= 0) {
    return "Auction ended :(";
  }

  const daysLeft = Math.floor(remainingBidTime / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (remainingBidTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (daysLeft > 0) {
    return `${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
  } else {
    return `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""}`;
  }
};
