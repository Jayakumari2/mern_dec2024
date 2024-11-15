function printsquare(){
    let num=parseInt(document.getElementById("inputfield").value )
    var res=num*num;
    document.getElementById("result").innerHTML=res;
    document.getElementById("inputfield").value='';
    document.getElementById("inputfield").focus();
}
function printcube(){
    let num=parseInt(document.getElementById("inputfield").value )
    var res=num*num*num;
    document.getElementById("result").innerHTML=res;
    document.getElementById("inputfield").value='';
    document.getElementById("inputfield").focus();
}