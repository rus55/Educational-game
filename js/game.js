'use strict';
/* Сюда буду сохранять самое лучшее решение из дерева (принцип минимум-максимум) */
let bestAlgoritm = {};

//Условия окончания игры
let rTime = 90;//время
let rWetness = 60;//влажность
let rTemp = 60;//температура

//Ограничим количество дров для игры
const rWoods = 20; //количество дров для растопки
//Ограничим количество бересты в горстях для игры
const rBark = 5; //количество горстей бересты для растопки

const fireWithoutWoods = 30; //кол-во минут, через которое огонь погаснет если не подкидывать дрова
const fallibility = 1.1; // погрешность на которую можно превысить показатели

//Текущие показатели
let timeGameStart = new Date();
let currentTemp = 20;
let currentTime = 0;
let currentWet = 0;
let currentCostWoods = 0;
let currentCostBark = 0;
let currentCostWater = 0;
let currentTimeWithoutWoods = 0;
let waterOnFire = false;



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

//Вывод текущих результатов
function drawResultParams() {
  const headerParam = document.createElement('h2');
  headerParam.innerHTML = 'Результирующие параметры';
  headerParam.className = 'headerParam';

  const currentTempEl = document.createElement('p');
  if (currentTemp < rTemp) {
    currentTempEl.className = 'lose';
    currentTemp += ` (не достигнут ${rTemp})`;
  }
  if (currentTemp > rTemp * fallibility) {
    currentTempEl.className = 'lose';
    currentTemp += ` (превышение ${rTemp * fallibility})`;
  }
  currentTempEl.innerHTML = `Температура: <span>${currentTemp}</span>`;

  const currentTimeEl = document.createElement('p');
  currentTimeEl.innerHTML = `Время: <span>${currentTime}</span>`;

  const currentWetEl = document.createElement('p');
  if (currentWet < rWetness) {
    currentWetEl.className = 'lose';
    currentWet += ` (не достигнут ${rWetness})`;
  }
  if (currentWet > rWetness * fallibility) {
    currentWetEl.className = 'lose';
    currentWet += ` (превышение ${rWetness * fallibility})`;
  }
  currentWetEl.innerHTML = `Влажность: <span>${currentWet}</span>`;

  const currentCostWoodsEl = document.createElement('p');
  currentCostWoodsEl.innerHTML = `Дрова: <span>${currentCostWoods}</span>`;

  const currentParams = document.querySelector('#currentParams');
  currentParams.innerHTML = '';

  currentParams.append(headerParam, currentTempEl, currentTimeEl, currentWetEl, currentCostWoodsEl); 
}

/* Функция журнала растопки */
function journal(action, temp, time, wet) {
  let tr = document.createElement('tr');
  tr.innerHTML = `<td>${action}</td><td>${temp}</td><td>${time}</td><td>${wet}</td>`;
  let journal = document.querySelector('#journalTable');     
  journal.append(tr);  
}

/* Функция определения текущего состояния по температуре */

function getRules(currentTemp) {
  let state = 'before40';
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
  let text = '';
  //проверка на потухший огонь в печке
  if (currentTimeWithoutWoods >= fireWithoutWoods || waterOnFire) {
    text = 'Вы проиграли! Огонь в печке погас...';
    document.querySelector('.flame').src = 'images/game/ugli.jpg';
  }
  /* Проверка на выигрыш */
  if (currentTime <= rTime && currentWet >= rWetness && currentTemp >= rTemp) {
    text = 'Вы выиграли!';
    /* Проверка на проигрыш */
  } else if (currentTime >= rTime && (currentWet <= rWetness || currentTemp <= rTemp)) {
    text = 'Вы проиграли (не достигли одного из параметров)';
  } else if (currentWet > rWetness * fallibility || currentTemp > rTemp * fallibility) {
    text = 'Вы проиграли (превысили один из параметров на 10%)';
  }
  if (text != '') {    
    let gameResult = document.querySelector('#gameResult');    
    let p = document.createElement('p');
    p.innerHTML = text;
    gameResult.append(p);
    document.querySelector('.log').style.display = 'none';
    document.querySelector('.bark').style.display = 'none';
    document.querySelector('.water').style.display = 'none';
    drawResultParams();
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
            let state = getRules(currentTemp);

            const audioWood = document.createElement('audio');
            audioWood.src = 'sounds/sound-throw-woods.mp3';
            audioWood.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioWood);  

            currentTimeWithoutWoods = 0;
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
          let state = getRules(currentTemp);

          const audioHiss = document.createElement('audio');
          audioHiss.src = 'sounds/sound-bark.mp3';
          audioHiss.setAttribute('autoplay', 'autoplay');      
          document.querySelector('#audio').append(audioHiss); 

          currentTimeWithoutWoods += rules[state].bark.time;
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
            let state = getRules(currentTemp);

            const audioBark = document.createElement('audio');
            audioBark.src = 'sounds/sound-hiss.mp3';
            audioBark.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioBark); 

            currentTimeWithoutWoods += rules[state].water.time;
            currentTemp += rules[state].water.temp;
            currentTime += rules[state].water.time;
            currentWet += rules[state].water.wet;   
            currentCostWater += 1;                       
            drawCurrentParams();
            journal('Вода', currentTemp, currentWet, currentTime);             
            water.style.top = '395px';
            water.style.left = '1033px';
        } else if (inStoveRect(event)) {
          waterOnFire = true;
          checkGameOver();
        }   
    document.removeEventListener('mousemove', onMouseMove);
    water.onmouseup = null;
    };  
};  
water.ondragstart = function() {
  return false;
};

/* По кнопке начать игру(считываю начальные параметры - темп и влажность). Также скрывать экран с заставкой и отображать экран с игрой. Также строить дерево. */

let btn = document.querySelector('#btnStartGame');
btn.addEventListener('click', function() {
  rTemp = document.querySelector('#likeTemp').value;  
  rWetness = document.querySelector('#likeWet').value;    
  /* Строю дерево вариантов */
  //Создал экземпляр класса root, который будет корнем нашего дерева
  let root = new Node('полено', 20, 20, 0, 5, 0);//тип полено, темп 20 стартовая, 20 стартовая влажность, 0 стартовое время, 5 это дрова, 0 время без дров  
  if (!Object.keys(bestAlgoritm).length) {
    alert('Невозможно растопить баню с такими параметрами. Попробуйте выбрать другие');
  } else {
    console.log(bestAlgoritm);
    // берем из лучшего решения время и добавляем к нему 10 минут - устанавливаем как данное время для растопки (+10 или +5 - можно регулировать сложность игры)
    rTime = bestAlgoritm.time + 10; 
    /* меняем отображение экрана */
    let gameRules = document.querySelector('#gameRules');
    gameRules.style.display = 'none';
    let game = document.querySelector('#game');
    game.style.display = 'block';
  }
});
/* Дерево вариантов растопки */
class Node {
  //пишу конструктор для узла дерева
  constructor(algoritm, temp, wet, time, woods, withoutWoods) {        
      //переменные узла
      this.algoritm = algoritm;
      this.temp = temp;
      this.wet = wet;
      this.time = time;
      this.woods = woods;        
      this.withoutWoods = withoutWoods;
      //вызываю рекурсивный метод buildTree
      this.buildTree();
  };    
  //объявляю метод класса Node с уловиями
  buildTree() {        
      if (this.temp < rTemp && this.wet < rWetness) {
          //создаю 3 новых узла, которые являются дочерними для текущего (на первом шаге для root)
          let state = getRules(this.temp);
          this.woodNode = new Node(this.algoritm + ' полено', this.temp + rules[state].poleno.temp, this.wet + rules[state].poleno.wet, this.time + rules[state].poleno.time, this.woods + 1, 0);
          if (this.withoutWoods < fireWithoutWoods) {
              this.barkNode = new Node(this.algoritm + ' береста', this.temp + rules[state].bark.temp, this.wet + rules[state].bark.wet, this.time + rules[state].bark.time, this.woods, this.withoutWoods + rules[state].bark.time);
              this.waterNode = new Node(this.algoritm + ' вода', this.temp + rules[state].water.temp, this.wet + rules[state].water.wet, this.time + rules[state].water.time, this.woods, this.withoutWoods + rules[state].water.time);
          }          
      } else {
          /* Проверяю на пустой объект */
          if (this.temp > rTemp && this.wet > rWetness && this.temp < rTemp * fallibility && this.wet < rWetness * fallibility) {
            if (!Object.keys(bestAlgoritm).length) {
                bestAlgoritm.algoritm = this.algoritm;
                bestAlgoritm.temp = this.temp;
                bestAlgoritm.wet = this.wet;
                bestAlgoritm.time = this.time;
                bestAlgoritm.woods = this.woods;
            } else {                
                  if (this.time < bestAlgoritm.time) {
                    bestAlgoritm.algoritm = this.algoritm;
                    bestAlgoritm.temp = this.temp;
                    bestAlgoritm.wet = this.wet;
                    bestAlgoritm.time = this.time;
                    bestAlgoritm.woods = this.woods;
                  } else if (this.time == bestAlgoritm.time && this.woods < bestAlgoritm.woods) {
                      bestAlgoritm.algoritm = this.algoritm;
                      bestAlgoritm.temp = this.temp;
                      bestAlgoritm.wet = this.wet;
                      bestAlgoritm.time = this.time;
                      bestAlgoritm.woods = this.woods;
                  }
                }
                //console.log(bestAlgoritm);
          }          
      }
  };
}