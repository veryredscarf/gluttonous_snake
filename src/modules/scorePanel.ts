// 定义记分牌的类
class ScorePanel{
  score = 0;  // 分数
  level = 1;   // 等级
  scoreEle:HTMLElement;   // 计分板元素
  levelEle:HTMLElement    // 等级面板元素


  // 设置一个变量来限制等级，利于项目拓展，增加等级设置功能
  maxLevel:number 

  // 设置一个变量来表示多少分来升级 利于后期项目拓展
  upScore:number


  constructor(maxLevel:number =10,upScore:number = 10){   // 给初始化值做默认值
    this.scoreEle = document.getElementById("score")!
    this.levelEle = document.getElementById("level")!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }
  // 设置一个加分的方法
  addScore(){
    this.score++
    this.scoreEle.innerHTML = this.score + ''  // innerHtml的值是字符串，

    // 判断分数多少  用分数来协助判断 调用等级增加函数  从而增加难度
    if(this.score % this.upScore ===0){
      this.levelUp()
    }

  }

  // 设置提升等级的方法  由于等级和蛇移动的速度是相关的，因此需要对等级做一个上限调整
  levelUp(){
    if(this.level < this.maxLevel){
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }  
}


export default ScorePanel