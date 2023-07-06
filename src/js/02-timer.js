import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const selectDays = document.querySelector('[data-days]');
const selectHours = document.querySelector('[data-hours]');
const selectMinutes = document.querySelector('[data-minutes]');
const selectSeconds = document.querySelector('[data-seconds]');

let timerId;
let timeDifference = 0;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    timeDifference = Date.parse(selectedDate) - Date.now();
    if (timeDifference < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};

button.onclick = () => {
  if (timeDifference > 0) {
    clearInterval(timerId);
    timerId = setInterval(() => {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      timeDifference -= 1000;
      selectDays.textContent = String(days).padStart(2, '0');
      selectHours.textContent = String(hours).padStart(2, '0');
      selectMinutes.textContent = String(minutes).padStart(2, '0');
      selectSeconds.textContent = String(seconds).padStart(2, '0');
      if (timeDifference <= 0) {
        clearInterval(timerId);
      }
    }, 1000);
    input.disabled = true;
    button.disabled = true;
  }
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', options);
