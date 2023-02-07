const Material = document.querySelector("#material-style");
const Digital = document.querySelector("#digital-style");

update();
setInterval(update, 1000);
function update() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  computed();
  function computed() {
    // material clock
    const MeterailClock = {
      hourPointer: document.querySelector(".hour-pointer"),
      minutePointer: document.querySelector(".minute-pointer"),
      secondPointer: document.querySelector(".second-pointer"),
    };
    const TextClock = {
      time: document.querySelector(".time"),
      date: document.querySelector(".date"),
      week: document.querySelector(".week"),
    };
    let _second = (360 / 60) * second;
    let _minute = (360 / 60) * minute;
    let _hour = (360 / 60) * hour;
    MeterailClock.secondPointer.style.transform = `rotate(${360 + _second}deg)`;
    MeterailClock.minutePointer.style.transform = `rotate(${360 + _minute}deg)`;
    MeterailClock.hourPointer.style.transform = `rotate(${360 + _hour}deg)`;

    // const hoursForClock = hour % 12; //24 => 12小时制
    // const ampm = hour >= 12 ? "PM" : "AM";
    const date = time.toDateString();
    TextClock.time.textContent = time.toLocaleTimeString();
    // TextClock.time.textContent = hoursForClock + " : " + minute + " " + ampm;
    TextClock.date.textContent = date;

    // digital clock
    const DateText = document.querySelector(".date-text");
    // Digital.textContent =
    //   hour + '-' + minute + '-' + second
    DateText.textContent = date;
  }
}
