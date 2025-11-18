import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayValue = Number(form.elements.delay.value);
  const state = form.elements.state.value; // 'fulfilled' or 'rejected'

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(delay => {
      iziToast.show({
        title: 'Повідомлення',
        message: `Виконано через ${delay}ms`,
        backgroundColor: '#00cc66',
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Повідомлення',
        message: `Відхилено через ${delay}ms`,
        backgroundColor: '#cc0000',
        position: 'topLeft',
        timeout: 3000,
      });
    });
});
