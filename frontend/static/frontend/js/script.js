const form = document.getElementById('product-form');
const table = document.getElementById('product-table');

// Функция для добавления продукта в таблицу
function addProductToTable(product) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
  `;
  table.querySelector('tbody').appendChild(row);
}

// Функция для получения и отображения всех продуктов
async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('/api/products/');
    const products = await response.json();
    table.querySelector('tbody').innerHTML = '';
    products.forEach(addProductToTable);
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
  }
}

// Обработчик события отправки формы
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const product = Object.fromEntries(formData);

  try {
    const response = await fetch('/api/products/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      form.reset();
      fetchAndDisplayProducts();
    } else {
      console.error('Ошибка при добавлении продукта:', await response.text());
    }
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
  }
});

fetchAndDisplayProducts();
