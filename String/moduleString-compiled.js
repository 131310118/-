/**
 * 模板字符串
 * 可以当作普通字符串使用，也可以用来定义多行字符串
 * 可嵌入变量，变量要写在${}内，也可嵌入任意表达式
 * Created by wangj on 2016/12/9.
 */

function ncieFunc() {
  return '四海无人对夕阳';
}
let niceMan = 'king';

let jadeTalk = `一生负气成今日\n${ ncieFunc() } ,
语出 ${ niceMan } 的《忆故居》。
`;
console.log(jadeTalk);

//# sourceMappingURL=moduleString-compiled.js.map