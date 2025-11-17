// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let myDate = '';
let intervalId = null;
const btn = document.querySelector('[data-start]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // stop any running interval when the picker closes
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    const current = new Date();
    if (selectedDates[0] > current) {
      myDate = selectedDates[0];
      btn.disabled = false;
    } else {
      iziToast.show({
        title: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

if (myDate === '') {
  btn.disabled = true;
} else {
  btn.disabled = false;
}

btn.addEventListener('click', () => {
  if (intervalId) return; // prevent multiple intervals

  btn.disabled = true;
  intervalId = setInterval(() => {
    const now = new Date();
    const delta = myDate - now;
    const time = convertMs(delta);
    const dataDays = document.querySelector('[data-days]');
    dataDays.textContent = time.days;
    const datahours = document.querySelector('[data-hours]');
    datahours.textContent = time.hours;
    const dataminutes = document.querySelector('[data-minutes]');
    dataminutes.textContent = time.minutes;
    const dataseconds = document.querySelector('[data-seconds]');
    dataseconds.textContent = time.seconds;

    //todo set to html
  }, 1000);
});
