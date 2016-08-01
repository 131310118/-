function test()
{
    var rng=document.createTextRange("123");
    alert(rng.text)
}
function test1()
{
    var rng=document.body.createTextRange();
    alert(rng.htmlText)
}