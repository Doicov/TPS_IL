document.getElementById('calculate-price').addEventListener('click', async function () {
    // Получаем данные из формы
    const location = document.getElementById('location').value;
    const area = parseFloat(document.getElementById('area').value);
    const type = document.getElementById('type').value;
    const build_type = document.getElementById('build_type').value;
    const condition = document.getElementById('condition').value;
    const rooms = document.getElementById('rooms').value;
  
    // Загружаем данные из JSON
    const response = await fetch('./data/data.json');
    const jsonData = await response.json();
    const averagePrices = jsonData.averagePrices;
  
    // Рассчитываем стоимость
    const averagePrice = averagePrices[location][type];
    const totalPrice = area * averagePrice;
  
    // Вывод результата
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
      <p>Предполагаемая стоимость ${rooms} ${type} с ${condition} на ${build_type}:</p>
      <p><strong>${totalPrice.toLocaleString()} $</strong></p>
      <p>Рассчитано для ${area} м² по средней цене ${averagePrice} $/м².</p>
    `;
  });
  
  document.getElementById('show-options').addEventListener('click', async function () {
    // Получаем данные из формы
    const location = document.getElementById('location').value;
    const area = parseFloat(document.getElementById('area').value);
    const type = document.getElementById('type').value;
    const build_type = document.getElementById('build_type').value;
    const condition = document.getElementById('condition').value;
    const rooms = document.getElementById('rooms').value;
  
    // Загружаем данные из JSON
    const response = await fetch('./data/data.json');
    const jsonData = await response.json();
    const data = jsonData.properties;
  
    // Очистка предыдущих результатов
    const container = document.getElementById('stores-cards-container');
    container.innerHTML = '';
  
    // Фильтрация данных по введенным значениям
    const filteredData = data.filter(
      (item) =>
        item.location === location &&
        item.type === type &&
        item.area >= area &&
        item.build_type === build_type &&
        item.condition === condition &&
        item.rooms === rooms 
    );
  
    // Генерация карточек для подходящих результатов
    if (filteredData.length > 0) {
      filteredData.forEach((item) => {
        const card = `
          <a href="#" class="stores-card">
            <div class="stores-card-pic">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="info-card">
            <div class="card-price">
              <h4>${item.price}€</h4>
            </div>
              <div class="store-name">
                <p>${item.location}, ${item.district}</p>
                <p>${item.name}</p>
              </div>
              <ul class="card-info-detailed">
                <li class=""><img alt="Rooms" width="16" height="16" src="https://proimobil.md/images/icons/rooms.svg">${item.rooms_number}</li>
                <li class="info-card-general"><img alt="Rooms" width="16" height="16" src="https://proimobil.md/images/icons/shower.svg"> 1</li>
                <li class="info-card-general"><img alt="Rooms" width="16" height="16" src="https://proimobil.md/images/icons/surface.svg">${item.area}</li>
              </ul>
            </div>
          </a>
        `;
        container.innerHTML += card;
      });
    } else {
      container.innerHTML = '<p>Нет подходящих вариантов.</p>';
    }
});

// Функция для получения базовой цены по местоположению
function getBasePrice(location) {
    const locationPrices = {
        'Кишинев': 1350,
        'Бельцы': 900,
        'Тирасполь': 600,
        'Комрат': 700,
        'default': 500
    };
    return locationPrices[location] || locationPrices['default'];
}


document.addEventListener('DOMContentLoaded', async () => {
  // Загрузка данных из файла
  const response = await fetch('./data/data.json');
  const jsonData = await response.json();
  const data = jsonData.properties;

  // Подготовка данных для графика
  const propertyTypes = ['Квартиры', 'Дома', 'Коммерческая'];
  const typePrices = {
      'Квартиры': { totalPrice: 0, totalArea: 0 },
      'Дома': { totalPrice: 0, totalArea: 0 },
      'Коммерческая': { totalPrice: 0, totalArea: 0 }
  };

  // Заполняем данные
  data.forEach((item) => {
      if (typePrices[item.type]) {
          const price = parseFloat(item.price.replace(/,/g, '')); // Убираем запятые и преобразуем в число
          typePrices[item.type].totalPrice += price;
          typePrices[item.type].totalArea += item.area;
      }
  });

  // Рассчитываем средние цены
  const averagePrices = propertyTypes.map((type) => {
      const { totalPrice, totalArea } = typePrices[type];
      return totalArea > 0 ? Math.round(totalPrice / totalArea) : 0; // Средняя цена за м²
  });

  // Данные для графика
  const chartData = {
      labels: propertyTypes,
      datasets: [{
          label: 'Средняя цена за м² ($)',
          data: averagePrices,
          backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
      }]
  };

  // Настройки графика
  const chartOptions = {
      responsive: true,
      plugins: {
          legend: {
              display: true,
              position: 'top'
          },
          tooltip: {
              enabled: true
          }
      },
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  // Создаём график
  const ctx = document.getElementById('priceChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar', // Тип графика (столбчатая диаграмма)
      data: chartData,
      options: chartOptions
  });
});