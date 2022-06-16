import Snake from "./snake";
import Food from "./food";
import ScorePanel
 from "./scorePanel";
// 游戏控制器，控制其他类
class GameControl{
  // 定义三个属性 
  // 蛇
  snake:Snake
  // 食物
  food:Food
  // 记分牌
  scorePanel:ScorePanel

  // 创建一个属性来表存储蛇的移动方向（也就是按键方向）,默认蛇向右移动，这样子在项目运行之后，蛇便会开始向右移动
  direction:string = 'Right'

  // 记录游戏是否结束
  isLive:boolean= true

  constructor(){
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.food = new Food()
    this.init()
  }  
  // 游戏的初始化方法 ，调用后即游戏开始
  init(){
    // 绑定键盘按下的键盘事件
    document.addEventListener("keydown",this.keydownHandler.bind(this))  
    // this.keydownHandler.bind(this) 采用这种写法而不是this.keydownHandler的原因是
    // 在函数调用中，this总是指向函数调用的那个目标，但是此处的this是想指向 这个GameControl类
    // 因此在bind函数中指明this。
    // 为什么没有this.keydownHandler.bind(GameControl）这样写的原因是，class本身实际上是一个function的语法糖，
    // 在函数内部this指向函数，就可以直接用this
    // 也可以使用箭头函数，因为箭头函数中没有this指向，this默认指向所处的环境，
    // document.addEventListener("keydown",(event:KeyboardEvent)=>{this.direction = event.key;console.log(this);})  

    // 调用run方法使蛇移动
    this.run()
    
  }
      // 创建键盘按下的响应函数,并且传入一个响应事件
  keydownHandler(event:KeyboardEvent){
     // console.log(event.key);  // 打印的是一个字符串，但是在ie和chrome浏览器中，同一个按键返回的值不同
    // 需要检查event.key的值是否合法，（用户是否按了正确的按键（））
    if(this.direction == event.key){
      this.snake.head.style.transform = "rotate(0deg)"
    }
    
    
    // 修改direction方向
    this.direction = event.key

   
    
  }
  // 创建蛇移动的方法
  run(){
    /**
     * 根据direction方法来使蛇的位置改变
     * 向上 top值减少
     * 向下 top值增大
     * 向左 left值减少
     * 向右 left值增大
     */

    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y
    
    

    // 根据按键方向来修改X值，Y值

    switch(this.direction){
    
      
      case "ArrowUp":
      case "Up":
          // 向上移动
          Y -= 10;
 
          break;
      case "ArrowDown":
      case "Down":
          Y += 10;
 
          
          break;
      case "ArrowLeft":
      case "Left":
          X -= 10;
          break;
      case "ArrowRight":
      case "Right":
          X += 10;
          break;
    }
  // 调用checkEat检查蛇是否吃到了食物
  this.checkEat(X,Y)


// 修改蛇的X值，和Y值
try {
  console.log(this.snake.Y);
  
  this.snake.X = X
  this.snake.Y = Y
} catch (error:any) {
  // 在接受到错误之后，提示一个弹框
  alert(error.message)
  // 并且中止蛇的移动
  this.isLive = false
}

    // 开始定时器，每300毫秒调用一次函数,但是由于this指向问题，需要给this指明this
   this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)  // 表示游戏是否进行 如果this.isLive为false表示游戏结束 并且随着等级提升，时间加快
    // 没有使用setTerval的原因是，此处用的是递归的思想，
    // 初始化时调用run方法，run方法中创建了一个定时器，定时器的回调函数又是run方法，因此不需要使用setTerval，如果需要使用setTerval，就不能写在run方法中
    // 蛇运动调用的方法没有写在按键事件中，是因为按键之后才能控制蛇的移动，非常的不方便
    
  }

  // 定义一个方法，用来检查蛇是否迟到了食物
  checkEat(X:number,Y:number){
    if(X === this.food.X&&Y===this.food.Y){
      // 吃到之后，食物位置重置，分数增加
      this.food.change()

      // 分数增加
      this.scorePanel.addScore()
  
      // 蛇要增加一节
        this.snake.addBody()
    }

  }

  
}

export default GameControl
    /**
     * chrome                         IE
     *    ArrowUp  上箭头按键             UP
     *    ArrowDown  下箭头按键           Down
     *    ArrowLeft  左箭头按键           left
     *    ArrowRight  右箭头按键          right
     */