import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-bottom',
  width: '450px',
  fontSize: '20px',
  timeout: 2000,
  success: {
    background: '#bedbb0',
    textColor: '#fff',
  },
  failure: {
    background: '#e09cb5',
    textColor: '#fff',
  },
});

function succesMessage() {
  return Notiflix.Notify.success('Task was added');
}

function succesRegistrationMessage() {
  return Notiflix.Notify.success('Registration Success');
}

function failedRegistrationMessage() {
  return Notiflix.Notify.failure('Registration Failed');
}

function failedLogin() {
  return Notiflix.Notify.failure('Name or password is not correct.');
}

function nameCheckerError() {
  return Notiflix.Notify.failure('Contact already exists');
}

export {
  succesMessage,
  nameCheckerError,
  succesRegistrationMessage,
  failedRegistrationMessage,
  failedLogin,
};
