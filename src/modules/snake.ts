// 定义蛇的类
class Snake{
  // 表示蛇头的元素
  head:HTMLElement
  // 蛇的身体，包括蛇头
  bodies:HTMLCollection 

  // 获取蛇的容器 即#snake元素
  element:HTMLElement

  constructor(){
    this.element = document.getElementById("snake")!
    // 用queryselect()来获取#snake的第一个子元素
    this.head = document.querySelector("#snake > div") as HTMLElement 
    // 此处灭有用queryselectAll()来获取#snake的所有子元素的原因是，上述方法返回的是一个NodeList节点链表，
    // 由于节点链表里面的值是不会随着里面的节点增加而发生变化的，因此不用 除非每次都调用一下
    this.bodies = this.element.getElementsByTagName("div")
  }

  // 获取蛇的坐标，即蛇头的坐标
  // 获取蛇头y的坐标
  get Y(){
    return this.head.offsetTop
  }
  // 获取蛇头下X轴的坐标
  get X(){
    return this.head.offsetLeft
  }
  // 设置蛇头X坐标
  set X(value:number){ 
   
   
  


    // 如果新值和旧值相同，则直接返回不再修改
    if(this.X === value)return

    // 判断X值得合法范围，即是否超墙
    if(value<0||value >290){
      // 进入判断，说明蛇撞墙了  ,并且抛出一个错误，在gamecontrol类中，用try catch接受错误
      throw Error("啊偶，撞墙了");
    }
    
    // 修改X值时是在修改水平坐标，蛇在向左运动时，不能向右掉头 可以理解为蛇头的位置和第二节身体的位置的值不能一样，否则表示为蛇掉头了
    // 首先判断蛇是否有第二节身体
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft === value){
      // 如果发生了掉头，，让蛇按原来的方向继续行动
      if(value > this.X){
        // 如果新值大于旧值X，则说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
        value = this.X-10
       
      }else{
        // 如果新值小于旧值X，则说明蛇在向左走，此时发生掉头，应该让蛇继续向右走
        value = this.X +10
      
      }
      
    }
        // 移动身体
        this.moveBody()

    this.head.style.left = value+'px'
 

    
        // 检查有没有撞到自己
        this.checkHeadBody()
  }
  // 设置蛇头Y坐标
  set Y(value:number){

        // 如果新值和旧值相同，则直接返回不再修改
        if(this.Y === value)return

        // 判断X值得合法范围，即是否超墙
        if(value<0||value >290){
          // 进入判断，说明蛇撞墙了  ,并且抛出一个错误，在gamecontrol类中，用try catch接受错误
          throw Error("啊偶，撞墙了");
        }

          // 修改X值时是在修改垂直坐标，蛇在向上运动时，不能向下掉头 可以理解为蛇头的位置和第二节身体的位置的值不能一样，否则表示为蛇掉头了
    // 首先判断蛇是否有第二节身体
    if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop === value){
      // 如果发生了掉头，，让蛇按原来的方向继续行动
      if(value > this.Y){
        // 如果新值大于旧值X，则说明蛇在向下走，此时发生掉头，应该让蛇继续向下走
        value = this.Y-10
      }else{
        // 如果新值小于旧值X，则说明蛇在向上走，此时发生掉头，应该让蛇继续向上走
        value = this.Y +10
      }
      
    }

        // 移动身体
        this.moveBody()
    
    this.head.style.top = value+'px'

    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  // 增加蛇身体的方法
  addBody(){
    // 向element中添加div
    this.element.insertAdjacentHTML("beforeend","<div></div>")   //表示在这个元素的标签结尾前，添加一个div
    // insertAdjacentHTML(position,htmlcode )表示向这个元素内加一个html代码
  }


  // 增加蛇身体移动的方法  
  moveBody(){
    /**
     * 将后边的身体的位置设置为前边身体的位置，从后往前移
     * 第四节 --> 第三节
     * 第三节 --> 第二节
     * 。。。
     */
// 遍历获取所有的身体  因为是从后往前改，因此遍历应该是从后往前遍历 ，初始值为蛇头，因此为最大索引值-1
    for(let i = this.bodies.length -1;i > 0; i--){
      // 获取前面身体的位置
      let X =( this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      
      
      (this.bodies[i] as HTMLElement).style.left = X +'px';
      (this.bodies[i] as HTMLElement).style.top = Y +'px';
    }

  }  
    // 检查身体和头部是否重合的方法
  checkHeadBody(){
    // 获取所有的身体，检车是否和蛇头的坐标发生重叠
    for(let i =1;i<this.bodies.length;i++){
      let bd = (this.bodies[i] as HTMLElement)
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop ){
        // 条件正确，则表示蛇头撞到了身体，游戏结束————抛出异常，让在前方gamecontrol类中接受
        throw new Error("撞到自己了！！！")

      }
    }

  }
}


export default Snake