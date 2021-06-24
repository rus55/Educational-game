'use strict';
/* Сюда буду сохранять самое лучшее решение из дерева (принцип минимум-максимум) */
let bestAlgoritm = {};

//Условия окончания игры
let rTime = 0;//время
let rWetness = 0;//влажность
let rTemp = 0;//температура

//Ограничим количество дров для игры
const rWoods = 20; // проверить переменную на использование
//Ограничим количество бересты в горстях для игры
const rBark = 5; // проверить переменную на использование

const timeWithoutWoods = 15; //кол-во минут, через которое огонь погаснет если не подкидывать дрова
const fallibility = 1.15; // погрешность, на которую можно превысить показатели

//Текущие показатели
let currentTemp = 20;
let currentTime = 0;
let currentWet = 10;
let currentCostWoods = 0;
let currentCostBark = 0;
let currentCostWater = 0;
let currentTimeWithoutWoods = 0;
let waterOnFire = false;//когда черпаком льем в печь, то становится переменная true и игра заканчивается

/* Правила роста температуры и влажности */
const rules = {
  before40: {
    poleno: {temp: 3, time: 10, wet: 1},
    bark: {temp: 3, time: 5, wet: 2},
    water: {temp: 5, time: 5, wet: 5}
  },
  between40_60: {
    poleno: {temp: 4, time: 10, wet: 2},
    bark: {temp: 5, time: 5, wet: 3},
    water: {temp: 6, time: 4, wet: 6}
  },
  after60: {
    poleno: {temp: 5, time: 8, wet: 3},
    bark: {temp: 5, time: 4, wet: 4},
    water: {temp: 6, time: 2, wet: 8}
  }
}

//Вывод текущих результатов в game.html
function drawCurrentParams() { //вызываю данную функцию каждый раз, когда что-то подкинул
  const headerParam = document.createElement('h2');
  headerParam.innerHTML = 'Текущие параметры';  

  const timeCondition = document.createElement('p');
  timeCondition.innerHTML = 'Вам дано ' + rTime + ' минут';
  timeCondition.style = 'display: block; color: #DF0000; font-weight: bold; margin: 0 auto; text-align: center;'//тут попробовать выровнять по-другому

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
  currentParams.innerHTML = ''; //очищаю, чтобы перезаписать блок

  currentParams.append(headerParam, timeCondition, currentTempEl, currentTimeEl, currentWetEl, currentCostWoodsEl, currentCostBarkEl, currentCostWaterEl);  //добавляю элементы в currentParams каждый раз как вызывается функция drawCurrentParams
  checkGameOver(); //проверка конца игры (данную функцию вызываю при каждом действии)
}

//Вывод результирующих параметров в блоке вместо текущих параметров
function drawResultParams() { 
  const headerParam = document.createElement('h2');
  headerParam.innerHTML = 'Результирующие параметры';   

  const currentTempEl = document.createElement('p');
  if (currentTemp < rTemp) {
      currentTempEl.className = 'lose';
      currentTemp += ` (не достигнуто ${rTemp})`;
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
  currentParams.innerHTML = '';  //очищаю, чтобы перезаписать блок

  currentParams.append(headerParam, currentTempEl, currentTimeEl, currentWetEl, currentCostWoodsEl); //добавляю элементы в currentParams каждый раз как вызывается функция drawResultParams, то есть, когда игра закончена
}

/* Функция журнала растопки */
function journal(action, temp, wet, time) {  
  let tr = document.createElement('tr');
  tr.innerHTML = `<td>${action}</td><td>${temp}</td><td>${wet}</td><td>${time}</td>`;
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

function changeCurrentParams(time, temp, wet) {    
    currentTemp += temp;
    currentTime += time; 
    currentWet += wet;        
}

/* Функция проверки окончания игры */
function checkGameOver() {  
  let text = ''; //переменная, которая хранит текст проигрыша или выигрыша
  //проверка на потухший огонь в печке
  if (currentTimeWithoutWoods >= timeWithoutWoods || waterOnFire) {
    text = '<h3>Вы проиграли! Огонь в печке погас...</h3>';
    document.querySelector('.flame').src = 'images/game/ugli.jpg';
  }
  /* Проверка на выигрыш */
  if (currentTime <= rTime && currentWet >= rWetness && currentTemp >= rTemp) {
    text = '<h3>Вы выиграли!</h3>';
    /* Проверка на проигрыш */
  } else if (currentTime >= rTime && (currentWet <= rWetness || currentTemp <= rTemp)) {
    text = '<h3>Вы проиграли <span>(не достигли одного из параметров)</span></h3>';
  } else if (currentWet > rWetness * fallibility || currentTemp > rTemp * fallibility) {
    text = '<h3>Вы проиграли <span>(превысили один из параметров на 10%)</span></h3>';
  }  

  if (text != '') { //сюда попадаем, если игра окончена   
    text += `<p>Оптимальный способ растопки:<br /> <span class="rAlgoritm">${bestAlgoritm.algoritm.split(' ').join(' &#8594; ')}</span></p>
    <p>Вы бы достигли следующих параметров: </p>
    <ul><li>Температура: ${bestAlgoritm.temp}</li>
    <li>Влажность: ${bestAlgoritm.wet}</li>
    <li>Время: ${bestAlgoritm.time}</li>
    <li>Дрова: ${bestAlgoritm.woods}</li>
    </ul>`;
    
    let gameResult = document.querySelector('#gameResult');    
    let p = document.createElement('p');
    p.innerHTML = text;
    gameResult.append(p);
    document.querySelector('.log').style.display = 'none';
    document.querySelector('.bark').style.display = 'none';
    document.querySelector('.water').style.display = 'none';
    drawResultParams(); //единственный вызов функции
  }  
}

//Отрисовка переноса элемента
function moveElement(event, element) { //ПОПРАВИТЬ 21.06
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
  // переносит элемент на координаты (pageX, pageY), дополнительно учитывая изначальный сдвиг относительно указателя мыши 
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }
  /* Функция перемещения элемента */
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  return onMouseMove;
}
//При попадании полена/бересты в печку
function inStoveRect(event) {
  const stoveRect = stove.getBoundingClientRect();//Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
  if (event.pageX /* Х координата курсора мыши */ > stoveRect.x/* координата левого края прямоугольника */ && event.pageX < stoveRect.x + stoveRect.width /* ширина прямоугольника */ && event.pageY > stoveRect.y && event.pageY < stoveRect.y + stoveRect.height) {
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
  stoveRigth.style.display = 'block';
  const onMouseMove = moveElement(event, log);
    // перемещаем элемент по экрану при событии mousemove
    document.addEventListener('mousemove', onMouseMove);
    //при отжатии кнопки мыши увеличить параметры, отрисовать параметры и вернуть элемент на исходное место
    log.onmouseup = function(event) {
        stoveRigth.style.display = 'none';              
        if (inStoveRect(event)) {    
            let state = getRules(currentTemp);

            const audioWood = document.createElement('audio');
            audioWood.src = 'sounds/sound-throw-woods.mp3';
            audioWood.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioWood);  

            currentTimeWithoutWoods = 0;
            changeCurrentParams(rules[state].poleno.time, rules[state].poleno.temp, rules[state].poleno.wet); 
            currentTimeWithoutWoods += rules[state].poleno.time;         
            currentCostWoods += 1;           
            drawCurrentParams(); 
            journal('Полено', currentTemp, currentWet, currentTime);          
            log.style.top = '625px';
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
  stoveRigth.style.display = 'block';
  const onMouseMove = moveElement(event, bark);       
  document.addEventListener('mousemove', onMouseMove);
  //при попадании в печку
  bark.onmouseup = function(event) {  
    stoveRigth.style.display = 'none';              
      if (inStoveRect(event)){
          let state = getRules(currentTemp);

          const audioHiss = document.createElement('audio');
          audioHiss.src = 'sounds/sound-bark.mp3';
          audioHiss.setAttribute('autoplay', 'autoplay');      
          document.querySelector('#audio').append(audioHiss); 

          changeCurrentParams(rules[state].bark.time, rules[state].bark.temp, rules[state].bark.wet);    
          currentTimeWithoutWoods += rules[state].bark.time;      
          currentCostBark += 1; 
          drawCurrentParams();   
          journal('Береста', currentTemp, currentWet, currentTime);            
          bark.style.top = '625px';
          bark.style.left = '865px';
      }
      //удалим более ненужные обработчики событий
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
    stoveLeft.style.display = 'block';
    const onMouseMove = moveElement(event, water);     
    document.addEventListener('mousemove', onMouseMove);   

    water.onmouseup = function(event) {
      stoveLeft.style.display = 'none';
        let heaterRect = heater.getBoundingClientRect();   
        if (event.pageX > heaterRect.x && event.pageX < heaterRect.x + heaterRect.width && event.pageY > heaterRect.y && event.pageY < heaterRect.y + heaterRect.height) {    
            let state = getRules(currentTemp);

            const audioBark = document.createElement('audio');
            audioBark.src = 'sounds/sound-hiss.mp3';
            audioBark.setAttribute('autoplay', 'autoplay');      
            document.querySelector('#audio').append(audioBark); 

            changeCurrentParams(rules[state].water.time, rules[state].water.temp, rules[state].water.wet);
            currentTimeWithoutWoods += rules[state].water.time;  
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

/* По кнопке начать игру считываю начальные параметры: температуру и влажность. Также скрываю экран с заставкой и отображаю экран с игрой. Также строю дерево. */
let btn = document.querySelector('#btnStartGame');
btn.addEventListener('click', function() {
  rTemp = document.querySelector('#likeTemp').value;  
  rWetness = document.querySelector('#likeWet').value;    
  /* Строю дерево вариантов */
  //Создал экземпляр класса root, который будет корнем нашего дерева и сразу создаю дерево, так как функция создания дерева вызывается в конструкторе 
  const root = new Node('полено', 20, 20, 0, 5, 0);//тип полено, темп 20 стартовая, 20 стартовая влажность, 0 стартовое время, 5 это дрова, 0 время без дров  
  /* После проверки возможно убрать */
  if (Object.keys(bestAlgoritm).length == 0) {
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

    drawCurrentParams();
  }
});
/* Дерево вариантов растопки */
class Node {
  //пишу конструктор для узла дерева
  constructor(algoritm, temp, wet, time, woods, currentWithoutWoods) {        
      //переменные узла
      this.algoritm = algoritm;
      this.temp = temp;
      this.wet = wet;
      this.time = time;
      this.woods = woods;        
      this.currentWithoutWoods = currentWithoutWoods;
      //вызываю рекурсивный метод buildTree
      this.buildTree();
  };    
  //объявляю метод класса Node с условиями
  buildTree() {    /* Рекурсивная функция */  
    /* если не достиг нужной темп и влажности */  
      if (this.temp < rTemp && this.wet < rWetness) {
          //создаю 3 новых узла, которые являются дочерними для текущего (на первом шаге для root)
          let state = getRules(this.temp);
          this.woodNode = new Node(this.algoritm + ' полено', this.temp + rules[state].poleno.temp, this.wet + rules[state].poleno.wet, this.time + rules[state].poleno.time, this.woods + 1, 0);
          if (this.currentWithoutWoods < timeWithoutWoods) {/* если еще не прошло 15 минут без дров */  
              this.barkNode = new Node(this.algoritm + ' береста', this.temp + rules[state].bark.temp, this.wet + rules[state].bark.wet, this.time + rules[state].bark.time, this.woods, this.currentWithoutWoods + rules[state].bark.time);
              this.waterNode = new Node(this.algoritm + ' вода', this.temp + rules[state].water.temp, this.wet + rules[state].water.wet, this.time + rules[state].water.time, this.woods, this.currentWithoutWoods + rules[state].water.time);
          }          
      } else {/* иначе 1 из параметров достигнут */
          /* проверяю попали ли наши температура и влажность от заданого значения до значения с учетом погрешности (10%) */
          if (this.temp >= rTemp && this.wet >= rWetness && this.temp <= rTemp * fallibility && this.wet <= rWetness * fallibility) {
            /* Проверяю на пустой объект */
            if (!Object.keys(bestAlgoritm).length) {
              /* если Бесталгоритм пустой(так как изначально я его инициализирую пустой строкой), то заносим в него текущее решение, так как оно прошло все проверки и оно нас устраивает */
                bestAlgoritm.algoritm = this.algoritm;
                bestAlgoritm.temp = this.temp;
                bestAlgoritm.wet = this.wet;
                bestAlgoritm.time = this.time;
                bestAlgoritm.woods = this.woods;
            } else {    /* если уже есть Бесталгоритм, то смотрим у текущего решения лучше время или нет? Если лучше, то обновляем Бесталгоритм */            
                  if (this.time < bestAlgoritm.time) {
                    bestAlgoritm.algoritm = this.algoritm;
                    bestAlgoritm.temp = this.temp;
                    bestAlgoritm.wet = this.wet;
                    bestAlgoritm.time = this.time;
                    bestAlgoritm.woods = this.woods;
                    /* если время такое же, то проверяем количество дров. Если потрачено меньше, то тоже обновляем Бесталгоритм */
                  } else if (this.time == bestAlgoritm.time && this.woods < bestAlgoritm.woods) {
                      bestAlgoritm.algoritm = this.algoritm;
                      bestAlgoritm.temp = this.temp;
                      bestAlgoritm.wet = this.wet;
                      bestAlgoritm.time = this.time;
                      bestAlgoritm.woods = this.woods;
                  }
                }                
          }          
      }
  };
}