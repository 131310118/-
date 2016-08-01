function Stack(){
    var dataStore = [];
    var top = 0;
    return {
        push:function(element){
            dataStore[top++] = element;
        },
        pop:function(){
            return dataStore[--top];
        },
        peek:function(){
            return dataStore[top-1];
        },
        length:function(){
            return top;
        },
        clear:function(){
            top = 0;
        }
    }
}
//进制转换
function mulBase(){
    var baseMap = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	var tobaseMap = [];
    baseMap['a'] = 10;baseMap['b'] = 11;baseMap['c'] = 12;baseMap['d'] = 13;baseMap['e'] = 14;baseMap['f'] = 15;
    return {
        mulBase:function(num,base,tobase){
			//初始化
			if(!tobaseMap[num]){
				tobaseMap[num] = [];
				tobaseMap[num][base] = [];
				tobaseMap[num][base][tobase] = 0;
			}else{
				if(!tobaseMap[num][base]){
					tobaseMap[num][base] = [];
					tobaseMap[num][base][tobase] = 0;
				}else{
					if(!tobaseMap[num][base][tobase]){
						tobaseMap[num][base][tobase] = 0;
					}else{
						return tobaseMap[num][base][tobase];
					}
				}
			}
            var s = Stack();//输入
            var end = Stack();//中介
			var to = Stack();//输出
			var toStr = '';//结果为字符串
            var b;//进制转移
            var i = 1;
            if(base==tobase){//进制相同直接输出结果
                return num;
            }else if(base<tobase){//小转大
				b = base;
                while(b<tobase){//是否是倍数
                    b *= base;
                    i++;
                }
                if(b!=tobase){
					//转字符串入栈
					var str = num.toString();
					for(var k=str.length-1;k>=0;k--){
						s.push(str[k]);
					}
                    /* while(num>0){
                        s.push(num%10);
                        num = Math.floor(num /= 10);
                    } */
                    var m = s.length();
                    var sum = 0;
					//求和
                    while(m){
                        sum = sum*base+baseMap[s.pop()];
                        m--;
                    }
					//出栈输出
                    while(sum>0){
						to.push(sum%tobase);
						sum = Math.floor(sum /= tobase);
                    }
                }else{//倍数直接输出数组保留
					var str = num.toString();
					for(var k=str.length-1;k>=0;k--){
						s.push(str[k]);
					}
                    /* while(num>0){
                        s.push(num%10);
                        num = Math.floor(num /= 10);
                    } */
                    var m = s.length()%i;
                    var sum = 0;
                    while(m){
                        sum = sum*base+baseMap[s.pop()];
                        m--;
                    }
                    if(sum){
                        end.push(baseMap[sum]);
                    }
                    while(s.length()){
                        sum = 0;
                        for(var j=0;j<i;j++){
                            sum = sum*base+baseMap[s.pop()];
                        }
                        end.push(baseMap[sum]);
                    }
                }
                while(end.length()){
                    to.push(end.pop());
                }
                while(to.length()){
                    toStr+=to.pop();
                }
				tobaseMap[num][base][tobase] = toStr;
				if(!tobaseMap[toStr]){
					tobaseMap[toStr] = [];
					tobaseMap[toStr][tobase] = [];
					tobaseMap[toStr][tobase][base] = num;
				}else{
					if(!tobaseMap[toStr][tobase]){
						tobaseMap[toStr][tobase] = [];
						tobaseMap[toStr][tobase][base] = num;
					}else{
						if(!tobaseMap[toStr][tobase][base]){
							tobaseMap[toStr][tobase][base] = num;
						}
					}
				}
                //return parseInt(toStr);
				return toStr;
            }
            else if(base>tobase){
				/* var b = tobase;
                while(b<base){
                    b *= tobase;
                    i++;
                } */
                //if(b!=base){
					var str = num.toString();
					for(var k=str.length-1;k>=0;k--){
						s.push(str[k]);
					}
                    /* while(num>0){
                        s.push(num%10);
                        num = Math.floor(num /= 10);
                    } */
                    var m = s.length();
                    var sum = 0;
                    while(m){
                        sum = sum*base+baseMap[s.pop()];
                        m--;
                    }
                    while(sum>0){
						to.push(sum%tobase);
						sum = Math.floor(sum /= tobase);
                    }
                /*} else{
                    var str = num.toString();
					for(var k=str.length-1;k>=0;k--){
						s.push(str[k]);
					}
                    while(num>0){
                        s.push(num%10);
                        num = Math.floor(num /= 10);
                    }
                    var m = s.length()%i;
                    var sum = 0;
                    while(m){
                        sum = sum*base+baseMap[s.pop()];
                        m--;
                    }
                    if(sum){
                        end.push(baseMap[sum]);
                    }
                    while(s.length()){
                        sum = 0;
                        for(var j=0;j<i;j++){
                            sum = sum*base+baseMap[s.pop()];
                        }
                        end.push(baseMap[sum]);
                    }
                } */
                while(end.length()){
                    to.push(end.pop());
                }
                while(to.length()){
                    toStr+=to.pop();
                }
				tobaseMap[num][base][tobase] = toStr;
				if(!tobaseMap[toStr]){
					tobaseMap[toStr] = [];
					tobaseMap[toStr][tobase] = [];
					tobaseMap[toStr][tobase][base] = num;
				}else{
					if(!tobaseMap[toStr][tobase]){
						tobaseMap[toStr][tobase] = [];
						tobaseMap[toStr][tobase][base] = num;
					}else{
						if(!tobaseMap[toStr][tobase][base]){
							tobaseMap[toStr][tobase][base] = num;
						}
					}
				}
                return toStr;
            }
        }
    }
}
var stack = Stack();
/* var m = mulBase();
m.mulBase(11,16,2)
"10001"
var m = mulBase();
m.mulBase(11,16,3)
"122"
var m = mulBase();
m.mulBase(11,2,16)
"3"
var m = mulBase();
m.mulBase(11,3,16)
"4"
var m = mulBase();
m.mulBase('f',16,2)
"1111"
var m = mulBase();
m.mulBase('f',16,3)
"120"
var m = mulBase();
m.mulBase('a',11,16)
"10" */
