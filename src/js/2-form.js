// Оголошення об’єкта formData з порожніми значеннями полів email та message
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Обробник події input для збереження актуальних даних з полів форми
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveToLocalStorage();
});

// Завантаження даних з локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email.trim();
    formData.message = parsedData.message.trim();
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
});

// Обробник події submit для перевірки заповнених полів та очищення сховища
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
});
