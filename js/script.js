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
    {id: 1, name: 'Абаш (горизонтально)', price: 1500, img: 'images/wallmaterials/abash_goriz.png'},
    {id: 2, name: 'Абаш (вертикально)', price: 1500, img: 'images/wallmaterials/abash_verti.png'},
    {id: 3, name: 'Кедр (горизонтально)', price: 1800, img: 'images/wallmaterials/kedr_goriz.png'},
    {id: 4, name: 'Кедр (вертикально)', price: 1800, img: 'images/wallmaterials/kedr_verti.png'},
    {id: 5, name: 'Липа (горизонтально)', price: 1200, img: 'images/wallmaterials/lipa_goriz.png'},
    {id: 6, name: 'Липа (вертикально)', price: 1200, img: 'images/wallmaterials/lipa_verti.png'},
    {id: 7, name: 'Осина (горизонтально)', price: 1100, img: 'images/wallmaterials/osina_goriz.png'},
    {id: 8, name: 'Осина (вертикально)', price: 1100, img: 'images/wallmaterials/osina_verti.png'}
]
let ceilingMaterials = [
    {id: 1, name: 'Абаш', price: 1500, img: 'images/ceilingmaterials/potolok_abash.png'},
    {id: 2, name: 'Кедр', price: 1800, img: 'images/ceilingmaterials/potolok_kedr.png'},
    {id: 3, name: 'Липа', price: 1200, img: 'images/ceilingmaterials/potolok_lipa.png'},
    {id: 4, name: 'Осина', price: 1100, img: 'images/ceilingmaterials/potolok_osina.png'}
]
let doors = [
    {id: 1, name: 'Бронза', price: 1000, img: 'images/doors/dver_bronza.png'},
    {id: 2, name: 'Сатин', price: 900, img: 'images/doors/dver_satin.png'},
    {id: 3, name: 'С рисунком', price: 800, img: 'images/doors/door_picture.png'},
    {id: 4, name: 'Фотопечать', price: 700, img: 'images/doors/door_print.png'},
    {id: 5, name: 'Деревянная', price: 600, img: 'images/doors/door_tree.png'}
]

let formShelvs = [
    {
        id: 1,
        name: 'Прямые',
        materialShelvs: [
            {id: 1, name: 'Абаш', price: 1500, img: 'images/materialshelvs/m_straight_shelves.png'},
            {id: 2, name: 'Абаш + Термоабаш', price: 1300, img: 'images/materialshelvs/m_straight_termoabash.png'},
            {id: 3, name: 'Канадский кедр', price: 1200, img: 'images/materialshelvs/m_straight_kedr.png'},
            {id: 4, name: 'Ольха', price: 1100, img: 'images/materialshelvs/m_straight_olha.png'},
            {id: 5, name: 'Термососна', price: 1000, img: 'images/materialshelvs/m_straight_termososna.png'}
        ]
    },
    {
        id: 2,
        name: 'Г-образные',
        materialShelvs: [
            {id: 1, name: 'Абаш', price: 1500, img: 'images/materialshelvs/m_g_shelves.png'},
            {id: 2, name: 'Абаш + Термоабаш', price: 1300, img: 'images/materialshelvs/m_g_termoabash.png'},
            {id: 3, name: 'Канадский кедр', price: 1200, img: 'images/materialshelvs/m_g_kedr.png'},
            {id: 4, name: 'Ольха', price: 1100, img: 'images/materialshelvs/m_g_olha.png'},
            {id: 5, name: 'Термососна', price: 1000, img: 'images/materialshelvs/m_g_termososna.png'}
        ]
    },
    {
        id: 3,
        name: 'П-образные',
        materialShelvs: [
            {id: 1, name: 'Абаш', price: 1500, img: 'images/materialshelvs/m_p_shelves.png'},
            {id: 2, name: 'Абаш + Термоабаш', price: 1300, img: 'images/materialshelvs/m_p_termoabash.png'},
            {id: 3, name: 'Канадский кедр', price: 1200, img: 'images/materialshelvs/m_p_kedr.png'},
            {id: 4, name: 'Ольха', price: 1100, img: 'images/materialshelvs/m_p_olha.png'},
            {id: 5, name: 'Термососна', price: 1000, img: 'images/materialshelvs/m_p_termososna.png'}
        ]
    },
    {
        id: 4,
        name: 'Парящие',
        materialShelvs: [
            {id: 1, name: 'Абаш', price: 1500, img: 'images/materialshelvs/m_soaring_abash.png'},
            {id: 2, name: 'Абаш + Термоабаш', price: 1300, img: 'images/materialshelvs/m_soaring_termoabash.png'},
            {id: 3, name: 'Канадский кедр', price: 1200, img: 'images/materialshelvs/m_soaring_canadian_cedar.png'},
            {id: 4, name: 'Ольха', price: 1100, img: 'images/materialshelvs/m_soaring_olha.png'},
            {id: 5, name: 'Термососна', price: 1000, img: 'images/materialshelvs/m_soaring_termososna.png'}
        ]
    }
]

let backs = [
    {id: 1, name: 'Абаш', price: 800, img: 'images/backs/abash.png'},
    {id: 2, name: 'Канадский кедр', price: 700, img: 'images/backs/canadian_cedar.png'},
    {id: 3, name: 'Ольха', price: 600, img: 'images/backs/olha.png'},
    {id: 4, name: 'Термососна', price: 500, img: 'images/backs/termososna.png'}
]

let typeStoves = [
    {
        id: 1, 
        name: 'Электрическая', 
        viewStoves: [
            {id: 1, name: 'Напольная прямоугольная', price: 2000, img: 'images/viewstoves/pech_el-pryam.png'},   
            {id: 2, name: 'Напольная цилиндрическая', price: 3000, img: 'images/viewstoves/pech_el_cili.png'}
        ]
    },
    {
        id: 2, 
        name: 'Дровяная', 
        viewStoves: [
            {id: 1, name: 'Напольная прямоугольная', price: 2000, img: 'images/viewstoves/pech_tree_pryam.png'},    
            {id: 2, name: 'Напольная цилиндрическая', price: 3000, img: 'images/viewstoves/pech_tree_cili.png'}        
        ]    
    }
]

let tilings = [
    {id: 1, name: 'Не выбрана', price: 4000, img: ''},
    {id: 2, name: 'Талькохлорит', price: 3500, img: 'images/tilings/oblicovka_plitkoy_talk.png'},
    {id: 3, name: 'Змеевик', price: 3000, img: 'images/tilings/oblicovka_plitkoy_zmeevik.png'},
    {id: 4, name: 'Рваный камень', price: 2000, img: 'images/tilings/oblicovka_plitkoy_rvan.png'}
]
let solts = [
    {id: 1, name: 'Не выбрана', price: 6000, img: ''},
    {id: 2, name: 'За печкой', price: 5000, img: 'images/solts/gym_sol_zapechkoy.png'},
    {id: 3, name: 'У двери', price: 4000, img: 'images/solts/gym_sol_udvery.png'},
    {id: 4, name: 'Настенная', price: 3000, img: 'images/solts/gym_sol_podpotolok.png'}
]

let lights = [
    {id: 1, name: 'Светильник Германия', price: 3000, img: 'images/lights/svet_german.png'},
    {id: 2, name: 'Светильник Финляндия', price: 2800, img: 'images/lights/svet_finland.png'},
    {id: 3, name: 'Светильник с абажуром', price: 2600, img: 'images/lights/svet_abajur.png'},
    {id: 4, name: 'Цветотерапия (с пультом)', price: 2400, img: 'images/lights/svet_therapy.png'}
]
let accessories = [
    {id: 1, name: 'Аксессуары Harvia', price: 2200, img: 'images/accessories/accessories_harvia.png'},
    {id: 2, name: 'Аксессуары дерево', price: 2100, img: 'images/accessories/accessories_wood.png'}
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
wallMaterialElem.addEventListener('change', drawWall);
function drawWall() {
    wallMaterial = wallMaterialElem.value;
    let wallImg = document.createElement('img');
    wallImg.id = 'wallsImg';     
    wallImg.src = wallMaterials.find(function(item) {if (item.id == wallMaterial) {return true}}).img;
    wallImg.style = 'position: absolute; top: 0;';    
    document.querySelector('#details').append(wallImg);    
    calcPrice();   
}

let ceilingMaterialElem = document.querySelector('#ceilingMaterial');
ceilingMaterialElem.addEventListener('change', drawCeil);
function drawCeil() {
    ceilingMaterial = ceilingMaterialElem.value;    
    let ceilingImg = document.createElement('img');
    ceilingImg.id = 'ceilingsImg'; 
    ceilingImg.src = ceilingMaterials.find(function(item) {if (item.id == ceilingMaterial) {return true}}).img;
    ceilingImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(ceilingImg);
    calcPrice(); 
}

let doorElem = document.querySelector('#door');
doorElem.addEventListener('change', drawDoor);
function drawDoor() {
    door = doorElem.value;   
    let doorImg = document.createElement('img');
    doorImg.id = 'doorsImg'; 
    doorImg.src = doors.find(function(item) {if (item.id == door) {return true}}).img;
    doorImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(doorImg);
    calcPrice();    
}

//если элемент существует, то идем дальше. Если нет, то все, что справа не выполняется(т.е remove не применяется).
let formShelvElem = document.querySelector('#formShelv');
formShelvElem.addEventListener('change', drawFormShelv);
function drawFormShelv() {
    formShelv = formShelvElem.value; 
    document.querySelector('#shelvImg')?.remove();
    let formShelvImg = document.createElement('img');
    formShelvImg.id = 'shelvImg'; 
    formShelvImg.src = formShelvs.find(function(item) {if (item.id == formShelv) {return true}}).materialShelvs.find(function(item) {if (item.id == materialShelv) {return true}}).img;
    formShelvImg.style = 'position: absolute; top: 0; z-index: 1;'; 
    document.querySelector('#details').append(formShelvImg);
    calcPrice();    
}

let materialShelvElem = document.querySelector('#materialShelv');
materialShelvElem.addEventListener('change', drawMaterialShelv);
function drawMaterialShelv() {
    materialShelv = materialShelvElem.value;
    document.querySelector('#shelvImg')?.remove();
    let formShelvImg = document.createElement('img');
    formShelvImg.id = 'shelvImg'; 
    formShelvImg.src = formShelvs.find(function(item) {if (item.id == formShelv) {return true}}).materialShelvs.find(function(item) {if (item.id == materialShelv) {return true}}).img;
    formShelvImg.style = 'position: absolute; top: 0; z-index: 1;';     
    document.querySelector('#details').append(formShelvImg);
    calcPrice();    
}

let backElem = document.querySelector('#back');
backElem.addEventListener('change', drawBack);
function drawBack() {
    back = backElem.value; 
    document.querySelector('#bImg')?.remove(); 
    let backImg = document.createElement('img');
    backImg.id = 'bImg';
    backImg.src = backs.find(function(item) {if (item.id == back) {return true}}).img;
    backImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(backImg);
    calcPrice(); 
}

let typeStoveElem = document.querySelector('#typeStove');
typeStoveElem.addEventListener('change', drawTypeStove);
function drawTypeStove() {
    typeStove = typeStoveElem.value;  
    document.querySelector('#tStoveImg')?.remove();
    let typeStoveImg = document.createElement('img');
    typeStoveImg.id = 'tStoveImg';    
    typeStoveImg.src = typeStoves.find(function(item) {if (item.id == typeStove) {return true}}).viewStoves.find(function(item) {if (item.id == viewStove) {return true}}).img;
    typeStoveImg.style = 'position: absolute; top: 0; z-index: 1;';
    document.querySelector('#details').append(typeStoveImg);
    calcPrice();   
}

let viewStoveElem = document.querySelector('#viewStove');
viewStoveElem.addEventListener('change', drawViewStove);
function drawViewStove() {
    viewStove = viewStoveElem.value;   
    document.querySelector('#tStoveImg')?.remove();
    let typeStoveImg = document.createElement('img');
    typeStoveImg.id = 'tStoveImg';    
    typeStoveImg.src = typeStoves.find(function(item) {if (item.id == typeStove) {return true}}).viewStoves.find(function(item) {if (item.id == viewStove) {return true}}).img;
    typeStoveImg.style = 'position: absolute; top: 0; z-index: 1;';
    document.querySelector('#details').append(typeStoveImg);
    calcPrice();    
}

let tilingElem = document.querySelector('#tiling');
tilingElem.addEventListener('change', drawTiling);
function drawTiling() {
    tiling = tilingElem.value; 
    document.querySelector('#tilImg')?.remove();
    let tilingImg = document.createElement('img');
    tilingImg.id = 'tilImg';
    tilingImg.src = tilings.find(function(item) {if (item.id == tiling) {return true}}).img;
    tilingImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(tilingImg);
    calcPrice();    
}

let soltElem = document.querySelector('#solt');
soltElem.addEventListener('change', drawSolt);
function drawSolt() {
    solt = soltElem.value; 
    document.querySelector('#soImg')?.remove();
    let soltImg = document.createElement('img');
    soltImg.id = 'soImg';
    soltImg.src = solts.find(function(item) {if (item.id == solt) {return true}}).img;
    soltImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(soltImg);
    calcPrice();    
}

let lightElem = document.querySelector('#light');
lightElem.addEventListener('change', drawLight);
function drawLight() {
    light = lightElem.value; 
    document.querySelector('#ligImg')?.remove();
    let lightImg = document.createElement('img');
    lightImg.id = 'ligImg';
    lightImg.src = lights.find(function(item) {if (item.id == light) {return true}}).img;
    lightImg.style = 'position: absolute; top: 0;';
    document.querySelector('#details').append(lightImg);
    calcPrice();    
}

let accessoryElem = document.querySelector('#accessory');
accessoryElem.addEventListener('change', drawAccessory);
function drawAccessory() {
    accessory = accessoryElem.value; 
    document.querySelector('#accessorImg')?.remove();
    let accessoryImg = document.createElement('img');
    accessoryImg.id = 'accessorImg';
    accessoryImg.src = accessories.find(function(item) {if (item.id == accessory) {return true}}).img;
    accessoryImg.style = 'position: absolute; top: 0; z-index: 1;';
    document.querySelector('#details').append(accessoryImg);
    calcPrice();    
}

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
    rWallMaterial.innerHTML = rWallMaterial.innerHTML + ' ' + formShelvs.find(function(item) {if(item.id == formShelv){return true}}).materialShelvs.find(function(item) {if(item.id == materialShelv){return true}}).name;
    
    let rBack = document.querySelector('#rBack');
    rBack.innerHTML = rBack.innerHTML + ' ' + backs.find(function(item) {if(item.id == back){return true}}).name; 

    let rTypeStove = document.querySelector('#rTypeStove');
    rTypeStove.innerHTML = rTypeStove.innerHTML + ' ' + typeStoves.find(function(item) {if(item.id == typeStove){return true}}).name; 

    let rViewStove = document.querySelector('#rViewStove');
    rViewStove.innerHTML = rViewStove.innerHTML + ' ' + typeStoves.find(function(item) {if(item.id == typeStove){return true}}).viewStoves.find(function(item) {if(item.id == viewStove){return true}}).name; 

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
    /* расчет площади стены */
    let sWall = 2 * (+width + +length) * +height; 
    /* расчет площади потолка*/
    let sCeiling = width * length;        

    let price = sWall * wallMaterials.find(function(item) {if(item.id == wallMaterial){return true}}).price + sCeiling * ceilingMaterials.find(function(item) {if(item.id == ceilingMaterial){return true}}).price + doors.find(function(item) {if(item.id == door) {return true}}).price + formShelvs.find(function(item) {if(item.id == formShelv) {return true}}).materialShelvs.find(function(item) {if(item.id == materialShelv) {return true}}).price + backs.find(function(item) {if(item.id == back) {return true}}).price + typeStoves.find(function(item) {if(item.id == typeStove) {return true}}).viewStoves.find(function(item) {if(item.id == viewStove) {return true}}).price + tilings.find(function(item) {if(item.id == tiling) {return true}}).price + solts.find(function(item) {if(item.id == solt) {return true}}).price + lights.find(function(item) {if(item.id == light) {return true}}).price + accessories.find(function(item) {if(item.id == accessory) {return true}}).price + 'р.';

    //Обратимся по идентификатору к цене, которая в интерфейсе
    let priceElem = document.querySelector('#price');
    priceElem.innerHTML = price;    
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
/* Удаление элементов по кнопке назад */
    switch (active) {
        case '#sect6':
            document.querySelector('#ligImg').remove();
            document.querySelector('#accessorImg').remove();
        break;
        case '#sect5':
            document.querySelector('#soImg').remove();
            document.querySelector('#tilImg').remove();
        break;
        case '#sect4':
            document.querySelector('#tStoveImg').remove();//надо ли дважды - проверь            
        break;
        case '#sect3':
            document.querySelector('#bImg').remove();
            document.querySelector('#shelvImg').remove();//надо ли дважды - проверь 
        break;
        case '#sect2':
            document.querySelector('#ligImg').remove();
            document.querySelector('#accessorImg').remove();
        break;
    }
});
/* Для кнопки вперёд */
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
        showResultParams();      
    }
    if (active == '#sect2') {        
        btnPrev.classList.remove('hidden');
    }
/* Для активизации первого option */
    switch (active) {
        case '#sect2':            
            drawWall();
            drawCeil();
            drawDoor();
        break;
        case '#sect3':
            drawFormShelv();
            drawMaterialShelv();
            drawBack();
        break;
        case '#sect4':
            drawTypeStove();
            drawViewStove();
        break;
        case '#sect5':
            drawTiling();
            drawSolt();
        break;
        case '#sect6':
            drawLight();
            drawAccessory();
        break;
    }
});
calcPrice();