const dataSets = {
    1: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          label: 'Новостройки',
          data: [1030, 1060, 1105, 1145, 1180, 1215, 1240, 1285, 1300, 1325, 1355, 1370],
          borderColor: 'red',
          fill: false,
        },
        {
          label: 'Вторичка',
          data: [960, 990, 1015, 1035, 1045, 1060, 1080, 1105, 1125, 1170, 1220, 1260],
          borderColor: 'blue',
          fill: false,
        },
      ],
    },
    5: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Новостройки',
          data: [730, 865, 955, 1050, 1350],
          borderColor: 'red',
          fill: false,
        },
        {
          label: 'Вторичка',
          data: [645, 750, 845, 935, 1150],
          borderColor: 'blue',
          fill: false,
        },
      ],
    },
    20: {
      labels: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Новостройки',
          data: [600, 620, 685, 760, 905, 730, 645, 540, 545, 560, 585, 590, 630, 655, 670, 690, 730, 865, 955, 1040, 1350],
          borderColor: 'red',
          fill: false,
        },
        {
          label: 'Вторичка',
          data: [585, 600, 670, 740, 860, 695, 605, 510, 515, 540, 545, 560, 585, 595, 600, 615, 645, 750, 845, 935, 1150],
          borderColor: 'blue',
          fill: false,
        },
      ],
    },
  };

  const ctx = document.getElementById('realEstateChart').getContext('2d');

  // Инициализация графика
  let chart = new Chart(ctx, {
    type: 'line',
    data: dataSets[1], // Начальные данные
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return value.toLocaleString('ru-RU') + ' €';
            },
          },
        },
      },
    },
  });

  document.querySelectorAll('.interval-button').forEach((button) => {
    button.addEventListener('click', function () {
      // Сбросить стили всех кнопок
      document.querySelectorAll('.interval-button').forEach((btn) => {
        btn.style = ""; // Удалить все inline-стили
      });
  
      // Установить стили для активной кнопки
      this.style.backgroundColor = '#2f7474';
      this.style.color = 'white';
      this.style.borderColor = '#244e4e';
  
      // Выполнить функцию для обновления графика
      const interval = this.dataset.interval; // Получаем интервал из кнопки
      updateChart(interval); // Вызываем функцию обновления графика
    });
  });
  
  // Функция для обновления графика
  function updateChart(interval) {
    // Здесь реализуется логика обновления графика
    // Например, вы обновляете данные графика в зависимости от интервала (1 год, 5 лет, 20 лет)
    
    if (interval === "1") {
      chart.data = dataSets[1]; // Данные для 1 года
    } else if (interval === "5") {
      chart.data = dataSets[5]; // Данные для 5 лет
    } else if (interval === "20") {
      chart.data = dataSets[20]; // Данные для 20 лет
    }
  
    chart.update(); // Обновляем график
  }