// 定义食物类Food
class Food {
  //  定义一个属性表示对应的元素
  element:HTMLElement;
  constructor(){
    // 获取页面中的food元素，并且赋值给element
    this.element = document.getElementById("food")!;  // 表示此元素不会为空
  }
  // 获取食物X轴的方法
  get X() {
    return this.element.offsetLeft;
  }
  // 获取食物Y轴的方法
  get Y(){
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change(){
    // 生成随机位置
    // 食物的位置最小是0，最大是290，并且蛇移动一次就是一格，一个大小为10，所有食物的坐标是10的倍数，同时蛇的位置也是10的倍数
    // 核心 先取出0-29的整数，在X10
    let top = Math.round(Math.random()*29)*10 +"px"
    let left = Math.round(Math.random()*29)*10 +"px"
    this.element.style.left = left
    this.element.style.top = top
  }


}

export default Food