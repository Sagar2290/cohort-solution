let count = 0;

function myInterval() {
  console.log(count);
  count++;
  setTimeout(myInterval, 1000);
}

myInterval();
