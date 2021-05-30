'use strict';

/* Переменные для каждого изменяемого параметра */
let length = 3; //длина
let width = 2; //ширина
let height = 3; //высота

let wallMaterial = 1; //обшивка стен 
let ceilingMaterial = 1; //обшивка потолка
let door = 1; //дверь

let formShelv = 1; //форма полок 
let materialShelv = 1; //материал полок
let back = 1; //спинка

let typeStove = 1; //тип печи 
let viewStove = 1; //вид печи

let tiling = 1; //облицовка плиткой 
let solt = 1; //гималайска соль 

let light = 1; //освещение 
let accessory = 1; //аксессуары

/* id активной секции */
let active = '#sect1';

/* Массивы изменяемых параметров */
let wallMaterials = [
    {id: 1, name: 'Абаш (горизонтально)', price: 1500, img: ''},
    {id: 2, name: 'Абаш (вертикально)', price: 1500, img: ''},
    {id: 3, name: 'Кедр (горизонтально)', price: 1800, img: ''},
    {id: 4, name: 'Кедр (вертикально)', price: 1800, img: ''},
    {id: 5, name: 'Липа (горизонтально)', price: 1200, img: ''},
    {id: 6, name: 'Липа (вертикально)', price: 1200, img: ''},
    {id: 7, name: 'Осина (горизонтально)', price: 1100, img: ''},
    {id: 8, name: 'Осина (вертикально)', price: 1100, img: ''}
]
let ceilingMaterials = [
    {id: 1, name: 'Абаш', price: 1500, img: ''},
    {id: 2, name: 'Кедр', price: 1800, img: ''},
    {id: 3, name: 'Липа', price: 1200, img: ''},
    {id: 4, name: 'Осина', price: 1100, img: ''}
]
let doors = [
    {id: 1, name: 'Бронза', price: 1000, img: ''},
    {id: 2, name: 'Сатин', price: 900, img: ''},
    {id: 3, name: 'С рисунком', price: 800, img: ''},
    {id: 4, name: 'Фотопечать', price: 700, img: ''},
    {id: 5, name: 'Деревянная', price: 600, img: ''}
]

let formShelvs = [
    {id: 1, name: 'Прямые', price: 1500, img: ''},
    {id: 2, name: 'Г-образные', price: 1400, img: ''},
    {id: 3, name: 'П-образные', price: 1300, img: ''},
    {id: 4, name: 'Парящие', price: 1200, img: ''}
]
let materialShelvs = [
    {id: 1, name: 'Абаш', price: 1500, img: ''},
    {id: 2, name: 'Термоабаш', price: 1300, img: ''},
    {id: 3, name: 'Канадский кедр', price: 1200, img: ''},
    {id: 4, name: 'Ольха', price: 1100, img: ''},
    {id: 5, name: 'Термососна', price: 1000, img: ''}
]
let backs = [
    {id: 1, name: 'Абаш', price: 800, img: ''},
    {id: 2, name: 'Канадский кедр', price: 700, img: ''},
    {id: 3, name: 'Ольха', price: 600, img: ''},
    {id: 4, name: 'Термососна', price: 500, img: ''}
]

let typeStoves = [
    {id: 1, name: 'Электрическая', price: 20000, img: ''},
    {id: 2, name: 'Дровяная', price: 15000, img: ''}
]
let viewStoves = [
    {id: 1, name: 'Напольная прямоугольная', price: 3000, img: ''},
    {id: 2, name: 'Напольная электрическая', price: 2000, img: ''},
    {id: 3, name: 'Настенная', price: 1500, img: ''}
]

let tilings = [
    {id: 1, name: 'Не выбрана', price: 4000, img: ''},
    {id: 2, name: 'За печкой', price: 3500, img: ''},
    {id: 3, name: 'У двери', price: 3000, img: ''},
    {id: 4, name: 'Настенная', price: 2000, img: ''}
]
let solts = [
    {id: 1, name: 'Не выбрана', price: 6000, img: ''},
    {id: 2, name: 'За печкой', price: 5000, img: ''},
    {id: 3, name: 'У двери', price: 4000, img: ''},
    {id: 4, name: 'Настенная', price: 3000, img: ''}
]

let lights = [
    {id: 1, name: 'Светильник Германия', price: 3000, img: ''},
    {id: 2, name: 'Светильник Финляндия', price: 2800, img: ''},
    {id: 3, name: 'Светильник с абажуром', price: 2600, img: ''},
    {id: 4, name: 'Цветотерапия (с пультом)', price: 2400, img: ''}
]
let accessories = [
    {id: 1, name: 'Аксессуары Harvia', price: 2200, img: ''},
    {id: 2, name: 'Аксессуары дерево', price: 2100, img: ''}
]

/* Обработчики */
let lengthElem = document.querySelector('#length');
lengthElem.addEventListener('change', function() {
    length = this.value; 
    calcPrice();   
   
});

let widthElem = document.querySelector('#width');
widthElem.addEventListener('change', function() {
    width = this.value; 
    calcPrice();    
});

let heightElem = document.querySelector('#height');
heightElem.addEventListener('change', function() {
    height = this.value; 
    calcPrice();    
});


let wallMaterialElem = document.querySelector('#wallMaterial');
wallMaterialElem.addEventListener('change', function() {
    wallMaterial = this.value;
    calcPrice();    
});

let ceilingMaterialElem = document.querySelector('#ceilingMaterial');
ceilingMaterialElem.addEventListener('change', function() {
    ceilingMaterial = this.value;    
    calcPrice(); 
});

let doorElem = document.querySelector('#door');
doorElem.addEventListener('change', function() {
    door = this.value; 
    calcPrice();    
});


let formShelvElem = document.querySelector('#formShelv');
formShelvElem.addEventListener('change', function() {
    formShelv = this.value; 
    calcPrice();    
});

let materialShelvElem = document.querySelector('#materialShelv');
materialShelvElem.addEventListener('change', function() {
    materialShelv = this.value;
    calcPrice();    
});

let backElem = document.querySelector('#back');
backElem.addEventListener('change', function() {
    back = this.value;    
    calcPrice(); 
});


let typeStoveElem = document.querySelector('#typeStove');
typeStoveElem.addEventListener('change', function() {
    typeStove = this.value;  
    calcPrice();   
});

let viewStoveElem = document.querySelector('#viewStove');
viewStoveElem.addEventListener('change', function() {
    viewStove = this.value;   
    calcPrice();  
});


let tilingElem = document.querySelector('#tiling');
tilingElem.addEventListener('change', function() {
    tiling = this.value; 
    calcPrice();    
});

let soltElem = document.querySelector('#solt');
soltElem.addEventListener('change', function() {
    solt = this.value; 
    calcPrice();    
});


let lightElem = document.querySelector('#light');
lightElem.addEventListener('change', function() {
    light = this.value; 
    calcPrice();    
});

let accessoryElem = document.querySelector('#accessory');
accessoryElem.addEventListener('change', function() {
    accessory = this.value; 
    calcPrice();    
});

/* Вывод выбранных параметров */
function showResultParams() {
    let rLength = document.querySelector('#rLength');
    rLength.innerHTML = rLength.innerHTML + ' ' + length; 

    let rWidth = document.querySelector('#rWidth');
    rWidth.innerHTML = rWidth.innerHTML + ' ' + width; 

    let rHeight = document.querySelector('#rHeight');
    rHeight.innerHTML = rHeight.innerHTML + ' ' + height;   

    let rWalls = document.querySelector('#rWalls');
    rWalls.innerHTML = rWalls.innerHTML + ' ' + wallMaterials.find(function(item) {if(item.id == wallMaterial){return true}}).name; 

    let rCeiling = document.querySelector('#rCeiling');
    rCeiling.innerHTML = rCeiling.innerHTML + ' ' + ceilingMaterials.find(function(item) {if(item.id == ceilingMaterial){return true}}).name; 

    let rDoor = document.querySelector('#rDoor');
    rDoor.innerHTML = rDoor.innerHTML + ' ' + doors.find(function(item) {if(item.id == door){return true}}).name; 

    let rShelves = document.querySelector('#rShelves');
    rShelves.innerHTML = rShelves.innerHTML + ' ' + formShelvs.find(function(item) {if(item.id == formShelv){return true}}).name; 

    let rWallMaterial = document.querySelector('#rWallMaterial');
    rWallMaterial.innerHTML = rWallMaterial.innerHTML + ' ' + materialShelvs.find(function(item) {if(item.id == materialShelv){return true}}).name;
    
    let rBack = document.querySelector('#rBack');
    rBack.innerHTML = rBack.innerHTML + ' ' + backs.find(function(item) {if(item.id == back){return true}}).name; 

    let rTypeStove = document.querySelector('#rTypeStove');
    rTypeStove.innerHTML = rTypeStove.innerHTML + ' ' + typeStoves.find(function(item) {if(item.id == typeStove){return true}}).name; 

    let rViewStove = document.querySelector('#rViewStove');
    rViewStove.innerHTML = rViewStove.innerHTML + ' ' + viewStoves.find(function(item) {if(item.id == viewStove){return true}}).name; 

    let rTiling = document.querySelector('#rTiling');
    rTiling.innerHTML = rTiling.innerHTML + ' ' + tilings.find(function(item) {if(item.id == tiling){return true}}).name; 

    let rSolt = document.querySelector('#rSolt');
    rSolt.innerHTML = rSolt.innerHTML + ' ' + solts.find(function(item) {if(item.id == solt){return true}}).name; 

    let rLight = document.querySelector('#rLight');
    rLight.innerHTML = rLight.innerHTML + ' ' + lights.find(function(item) {if(item.id == light){return true}}).name; 

    let rAccessory = document.querySelector('#rAccessory');
    rAccessory.innerHTML = rAccessory.innerHTML + ' ' + accessories.find(function(item) {if(item.id == accessory){return true}}).name; 
}

/* Функция подсчета стоимости */
function calcPrice() {
    /* расчет площади пола*/
    let sFloor = width * length;// Подумать: буду ли использовать?
    /* расчет площади стены */
    let sWall = 2 * (width + length) * height; 
    /* расчет площади потолка*/
    let sCeiling = width * length;        

    let price = sWall * wallMaterials.find(function(item, index, array) {if(item.id == wallMaterial){return true}}).price + sCeiling * ceilingMaterials.find(function(item, index, array) {if(item.id == ceilingMaterial){return true}}).price + doors.find(function(item, index, array) {if(item.id == door) {return true}}).price + formShelvs.find(function(item, index, array) {if(item.id == formShelv) {return true}}).price + materialShelvs.find(function(item, index, array) {if(item.id == materialShelv) {return true}}).price + backs.find(function(item, index, array) {if(item.id == back) {return true}}).price + typeStoves.find(function(item, index, array) {if(item.id == typeStove) {return true}}).price + viewStoves.find(function(item, index, array) {if(item.id == viewStove) {return true}}).price + tilings.find(function(item, index, array) {if(item.id == tiling) {return true}}).price + solts.find(function(item, index, array) {if(item.id == solt) {return true}}).price + lights.find(function(item, index, array) {if(item.id == light) {return true}}).price + accessories.find(function(item, index, array) {if(item.id == accessory) {return true}}).price + 'р.';

    //Обратимся по идентификатору к цене, которая в интерфейсе
    let priceElem = document.querySelector('#price');
    priceElem.innerHTML = price ;    
}

/* Для кнопки назад */
let btnPrev = document.querySelector('#btn-prev');
btnPrev.addEventListener('click', function() {
    let activeElem = document.querySelector(active);
    activeElem.classList.add('hidden');    
    let prev = '#sect' + (+active[active.length - 1] - 1);    
    let prevElem = document.querySelector(prev);    
    prevElem.classList.remove('hidden');
    /* Для бекграунда */
    let parent = document.querySelector('#parent');
    let childrens = Object.values(parent.children);    
    childrens.forEach(function(item, index) {
        if (index > active[active.length - 1] - 2) {            
            item.classList.remove('parent');
        }
    })
    btnNext.classList.remove('hidden');
    active = prev;     
    if (active == '#sect1') {
        btnPrev.classList.add('hidden');        
    }

});
/* Для кнопки вперёд */
//если пройтись до конца, затем назад до конца, то пропадает кнопка вперед. В субботу поправить!!!
let btnNext = document.querySelector('#btn-next');
btnNext.addEventListener('click', function() {
    let activeElem = document.querySelector(active);
    activeElem.classList.add('hidden');    
    let next = '#sect' + (+active[active.length - 1] + 1);
    let nextElem = document.querySelector(next);
    nextElem.classList.remove('hidden');
    /* Для бекграунда */
    let parent = document.querySelector('#parent');
    let childrens = Object.values(parent.children);    
    childrens.forEach(function(item, index) {
        if (index < active[active.length - 1]) {            
            item.classList.add('parent');
        }
    })

    active = next;
    if (active == '#sect7') {
        btnNext.classList.add('hidden');  
        showResultParams()      
    }
    if (active == '#sect2') {        
        btnPrev.classList.remove('hidden');
    }
});

//зависимости у печи доделать
//Облицовка плиткой: 



/* CANVAS */

/* <canvas id="canvas" width="780" height="585"></canvas>
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d'); 
*/
