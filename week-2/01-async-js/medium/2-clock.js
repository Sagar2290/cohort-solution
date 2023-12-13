setInterval(() => {
  date = new Date();

  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  // - HH:MM::SS (Eg. 13:45:23)
  const time1 = `${hour}:${minutes}:${seconds}`;

  // - HH:MM::SS AM/PM (Eg 01:45:23 PM)
  const time2 = `${hour > 12 ? hour - 12 : hour}:${minutes}:${seconds} ${
    hour > 12 ? "PM" : "AM"
  }`;

  console.log(time1);
  console.log(time2);
}, 1000);
