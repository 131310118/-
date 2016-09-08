var a = document.createElement('a');
var A = document.createElement('a');
var letter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'/*,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'*/];
var sampleHref = [];
function unicodeHref(){
    for(var i=0;i<26;i++){
        a.href = 'http://'+letter[i]+'.com';
        sampleHref[i] = [];
        for(var j=0;j<65535;j++){
            A.href = 'http://'+String.fromCharCode(j)+'.com';
            if(a.href==A.href){
                sampleHref[i].push(j);
            }
        }
    }
    for(var i=0;i<26;i++){
        console.log(letter[i]+':'+(function(){var str = '';while(sampleHref[i].length){str+=String.fromCharCode(sampleHref[i].pop())};return str;})());
    }
}
unicodeHref();
/*
a:ａＡⓐⒶₐᵃᴬªaA
b:ｂＢⓑⒷℬᵇᴮbB
c:ｃＣⓒⒸⅽⅭℭℂᶜcC
d:ｄＤⓓⒹⅾⅮⅆⅅᵈᴰdD
e:ｅＥⓔⒺⅇℰℯₑᵉᴱeE
f:ｆＦⓕⒻℱᶠfF
g:ｇＧⓖⒼℊᵍᴳgG
h:ｈＨⓗⒽℎℍℌℋₕᴴʰhH
i:ｉＩⓘⒾⅰⅠⅈℹℑℐⁱᵢᴵiI
j:ｊＪⱼⓙⒿⅉᴶʲjJ
k:ｋＫⓚⓀKₖᵏᴷkK
l:ｌＬⓛⓁⅼⅬℓℒₗᴸˡlL
m:ｍＭⓜⓂⅿⅯℳₘᵐᴹmM
n:ｎＮⓝⓃℕₙⁿᴺnN
o:ｏＯⓞⓄℴₒᵒᴼºoO
p:ｐＰⓟⓅℙₚᵖᴾpP
q:ｑＱⓠⓆℚqQ
r:ｒＲⓡⓇℝℜℛᵣᴿʳrR
s:ｓＳⓢⓈₛˢſsS
t:ｔＴⓣⓉₜᵗᵀtT
u:ｕＵⓤⓊᵤᵘᵁuU
v:ｖＶⱽⓥⓋⅴⅤᵥᵛvV
w:ｗＷⓦⓌᵂʷwW
x:ｘＸⓧⓍⅹⅩₓˣxX
y:ｙＹⓨⓎʸyY
z:ｚＺⓩⓏℨℤᶻzZ
 */