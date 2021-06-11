'use strict';

let finalTemp = 60;//точка останова для построения дерева

//создаю класс Node для описания узла дерева и его методов
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
        if (this.temp < finalTemp) {
            //создаю 3 новых узла, которые являются дочерними для текущего (на первом шаге для root)
            this.woodNode = new Node(this.algoritm + ' полено', this.temp + 5, this.wet + 2, this.time + 5, this.woods + 2, 0);
            if (this.withoutWoods < 15) {
                this.barkNode = new Node(this.algoritm + ' береста', this.temp + 6, this.wet + 2, this.time + 5, this.woods, this.withoutWoods + 5);
                this.waterNode = new Node(this.algoritm + ' вода', this.temp + 7, this.wet + 5, this.time + 5, this.woods, this.withoutWoods + 5);
            }
            
        } else {
            console.log(this.algoritm, this.temp, this.wet, this.time, this.woods);
        }
    };
}
//Создал экземпляр класса root, который будет корнем нашего дерева
let root = new Node('полено', 20, 20, 0, 5, 0);//тип полено, темп 20 стартовая, 20 стартовая влажность, 0 стартовое время, 5 это дрова, 0 время без дров