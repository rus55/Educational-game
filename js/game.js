'use strict';
//Условия окончания игры
const rTime = 90;//время
const rWetness = 60;//влажность
const rTemp = 60;//температура

//Ограничим количество дров для игры
const rWoods = 20; //количество дров для растопки
//Ограничим количество бересты в горстях для игры
const rBark = 5; //количество горстей бересты для растопки

//Текущие показатели
let timeGameStart = new Date();
let currentTemp = 20;
let currentTime = 0;
let currentWet = 0;
let currentCostWoods = 0;
let currentCostBark = 0;
let currentCostWater = 0;

/* Правила роста температуры и влажности */
const rules = {
  before40: {//и для влажности, и для температуры
      poleno: {
        temp: 3,
        time: 10,
        wet: 1
      },
      bark: {
        temp: 3,
        time: 5,
        wet: 2
      },
      water: {
        temp: 5,
        time: 5,
        wet: 5
      }
  },
  between40_60: {
    poleno: {
      temp: 4,
      time: 10,
      wet: 2
    },
    bark: {
      temp: 5,
      time: 5,
      wet: 3
    },
    water: {
      temp: 6,
      time: 4,
      wet: 6
    }
  },
  after60: {
    poleno: {
      temp: 5,
      time: 8,
      wet: 3
    },
    bark: {
      temp: 5,
      time: 4,
      wet: 4
    },
    water: {
      temp: 6,
      time: 2,
      wet: 8
    }
  }
}

drawCurrentParams();
//Вывод текущих результатов
function drawCurrentParams() {
  const headerParam = document.createElement('h2');
  headerParam.innerHTML = 'Текущие параметры';
  headerParam.className = 'headerParam';

  const currentTempEl = document.createElement('p');
  currentTempEl.innerHTML = `Температура: <span>${currentTemp}</span>`;

  const currentTimeEl = document.createElement('p');
  currentTimeEl.innerHTML = `Время: <span>${currentTime}</span>`;

  const currentWetEl = document.createElement('p');
  currentWetEl.innerHTML = `Влажность: <span>${currentWet}</span>`;

  const currentCostWoodsEl = document.createElement('p');
  currentCostWoodsEl.innerHTML = `Дрова: <span>${currentCostWoods}</span>`;

  const currentCostBarkEl = document.createElement('p');
  currentCostBarkEl.innerHTML = `Береста: <span>${currentCostBark}</span>`;

  const currentCostWaterEl = document.createElement('p');
  currentCostWaterEl.innerHTML = `Черпак: <span>${currentCostWater}</span>`;

  const currentParams = document.querySelector('#currentParams');
  currentParams.innerHTML = '';

  currentParams.append(headerParam, currentTempEl, currentTimeEl, currentWetEl, currentCostWoodsEl, currentCostBarkEl, currentCostWaterEl);  
  checkGameOver();  
}

/* Функция журнала растопки */
function journal(action, temp, time, wet) {
  let tr = document.createElement('tr');
  tr.innerHTML = `<td>${action}</td><td>${temp}</td><td>${time}</td><td>${wet}</td>`;
  let journal = document.querySelector('#journalTable');     
  journal.append(tr);  
}

/*  */

function getRules() {
  let state = '';
  if (currentTemp < 40) {
    state = 'before40';
  } else if (currentTemp > 40 && currentTemp < 60) {
    state = 'between40_60';
  } else if (currentTemp > 60) {
    state = 'after60';
  }          
  return state;
}

/* Функция проверки окончания игры */
function checkGameOver() {  
  /* Проверка на выигрыш */
  if (currentTime <= rTime && currentWet >= rWetness && currentTemp >= rTemp) {
    alert('Вы выиграли');
    /* Проверка на проигрыш */
  } else if (currentTime >= rTime && (currentWet <= rWetness || currentTemp <= rTemp)) {
    alert('Вы проиграли, потому что не достигли одного из параметров');
  } else if (currentWet > rWetness * 1.1 || currentTemp > rTemp * 1.1) {
    alert('Вы проиграли, потому что превысили один из параметров больше чем на 10%');
  }
}

//Отрисовка переноса элемента
function moveElement(event, element) {
  //расстояние от курсора до левого верхнего угла (полена/бересты/ковша воды) в переменных shiftX/shiftY
  let shiftX = event.clientX - element.getBoundingClientRect().left;//Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
  let shiftY = event.clientY - element.getBoundingClientRect().top;  
  // разместим поверх остального содержимого и в абсолютных координатах
  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  // переместим в body, чтобы наш элемент был точно не внутри position:relative
  document.body.append(element);
  // и установим абсолютно спозиционированный наш элемент под курсор
  moveAt(event.pageX, event.pageY);
  // передвинуть элемент под координаты курсора 
  // переносит элемент на координаты (pageX, pageY),
  // дополнительно учитывая изначальный сдвиг относительно указателя мыши 
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  return onMouseMove;
}
//При попадании полена/бересты в печку
function inStoveRect(event) {
  const stoveRect = stove.getBoundingClientRect();//Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
  if (event.pageX > stoveRect.x && event.pageX < stoveRect.x + stoveRect.width && event.pageY > stoveRect.y && event.pageY < stoveRect.y + stoveRect.height) {
    return true;
  } else {
    return false;
  }
}
//При попадании воды на каменку
function inHeater(event) {
  const heaterRect = heater.getBoundingClientRect();//Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
  if (event.pageX > heaterRect.x && event.pageX < heaterRect.x + heaterRect.width && event.pageY > heaterRect.y && event.pageY < heaterRect.y + heaterRect.height) {
    return true;
  } else {
    return false;
  }
}

//ДЛЯ ПОЛЕНА
const log = document.querySelector('.log');
//отследим нажатие
log.onmousedown = function(event) {
  const onMouseMove = moveElement(event, log);
    // перемещаем элемент по экрану при событии mousemove
    document.addEventListener('mousemove', onMouseMove);
    //при отжатии кнопки мыши увеличить параметры, отрисовать параметры и вернуть элемент на исходное место
    log.onmouseup = function(event) {        
        if (inStoveRect(event)) {    
            let state = getRules();

            const audioWood = document.createElement('audio');
            audioWood.src = 'sounds/sound-throw-woods.mp3';
            audioWood.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioWood);  

            currentTemp += rules[state].poleno.temp;
            currentTime += rules[state].poleno.time;
            currentWet += rules[state].poleno.wet;
            currentCostWoods += 1;           
            drawCurrentParams(); 
            journal('Полено', currentTemp, currentWet, currentTime);          
            log.style.top = '543px';
            log.style.left = '686px';
        }
      //удалим более ненужные обработчики событий
      document.removeEventListener('mousemove', onMouseMove);
      log.onmouseup = null;
    };  
  };  
  //Браузер имеет свой собственный Drag’n’Drop, который автоматически запускается и вступает в конфликт с нашим. Это происходит именно для картинок и некоторых других элементов, поэтому отключим его.
  log.ondragstart = function() {
    return false;
  };  

//ДЛЯ БЕРЕСТЫ
const bark = document.querySelector('.bark');
bark.onmousedown = function(event) {  
  const onMouseMove = moveElement(event, bark);       
  document.addEventListener('mousemove', onMouseMove);
  //при попадании в печку
  bark.onmouseup = function(event) {                
      if (inStoveRect(event)){
          let state = getRules();

          const audioHiss = document.createElement('audio');
          audioHiss.src = 'sounds/sound-bark.mp3';
          audioHiss.setAttribute('autoplay', 'autoplay');      
          document.querySelector('#audio').append(audioHiss); 

          currentTemp += rules[state].bark.temp;
          currentTime += rules[state].bark.time;
          currentWet += rules[state].bark.wet;           
          currentCostBark += 1; 
          drawCurrentParams();   
          journal('Береста', currentTemp, currentWet, currentTime);            
          bark.style.top = '543px';
          bark.style.left = '865px';
      }
  document.removeEventListener('mousemove', onMouseMove);
  bark.onmouseup = null;
  };  
};
bark.ondragstart = function() {
  return false;
};

//ДЛЯ ВОДЫ
const water = document.querySelector('.water');
water.onmousedown = function(event) {
    const onMouseMove = moveElement(event, water);     
    document.addEventListener('mousemove', onMouseMove);   

    water.onmouseup = function(event) {
        let heaterRect = heater.getBoundingClientRect();   
        if (event.pageX > heaterRect.x && event.pageX < heaterRect.x + heaterRect.width && event.pageY > heaterRect.y && event.pageY < heaterRect.y + heaterRect.height) {    
            let state = getRules();

            const audioBark = document.createElement('audio');
            audioBark.src = 'sounds/sound-hiss.mp3';
            audioBark.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioBark); 

            currentTemp += rules[state].water.temp;
            currentTime += rules[state].water.time;
            currentWet += rules[state].water.wet;   
            currentCostWater += 1;                       
            drawCurrentParams();
            journal('Вода', currentTemp, currentWet, currentTime);             
            water.style.top = '395px';
            water.style.left = '1033px';
        }    
    document.removeEventListener('mousemove', onMouseMove);
    water.onmouseup = null;
    };  
};  
water.ondragstart = function() {
  return false;
};