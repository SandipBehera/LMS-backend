function getMealTimings(schedule, day) {
  const daySchedule = schedule[day];

  if (!daySchedule) {
    console.error(`No schedule found for ${day}`);
    return null;
  }

  const breakfastStart = new Date();
  breakfastStart.setHours(
    parseInt(daySchedule["Breakfast"]["From"].split(":")[0]),
    parseInt(daySchedule["Breakfast"]["From"].split(":")[1]),
    0
  );

  const breakfastEnd = new Date();
  breakfastEnd.setHours(
    parseInt(daySchedule["Breakfast"]["To"].split(":")[0]),
    parseInt(daySchedule["Breakfast"]["To"].split(":")[1]),
    0
  );

  const lunchStart = new Date();
  lunchStart.setHours(
    parseInt(daySchedule["Lunch"]["From"].split(":")[0]),
    parseInt(daySchedule["Lunch"]["From"].split(":")[1]),
    0
  );

  const lunchEnd = new Date();
  lunchEnd.setHours(
    parseInt(daySchedule["Lunch"]["To"].split(":")[0]),
    parseInt(daySchedule["Lunch"]["To"].split(":")[1]),
    0
  );

  const dinnerStart = new Date();
  dinnerStart.setHours(
    parseInt(daySchedule["Dinner"]["From"].split(":")[0]),
    parseInt(daySchedule["Dinner"]["From"].split(":")[1]),
    0
  );

  const dinnerEnd = new Date();
  dinnerEnd.setHours(
    parseInt(daySchedule["Dinner"]["To"].split(":")[0]),
    parseInt(daySchedule["Dinner"]["To"].split(":")[1]),
    0
  );

  return {
    breakfastStart,
    breakfastEnd,
    lunchStart,
    lunchEnd,
    dinnerStart,
    dinnerEnd,
  };
}

function getMealType(
  currentTime,
  breakfastStart,
  breakfastEnd,
  lunchStart,
  lunchEnd,
  dinnerStart,
  dinnerEnd
) {
  if (currentTime >= breakfastStart && currentTime <= breakfastEnd) {
    return "break_fast";
  } else if (currentTime >= lunchStart && currentTime <= lunchEnd) {
    return "lunch";
  } else if (currentTime >= dinnerStart && currentTime <= dinnerEnd) {
    return "dinner";
  } else {
    return "No meal";
  }
}
export { getMealTimings, getMealType };
