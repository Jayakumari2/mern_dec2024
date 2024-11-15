var list=[];

function printnum(){
    let num=parseInt(document.getElementById("inputfield").value )
    list.push(num);
    let items=''
    for(let n of list){
        items=items+`<li class="p-2 btn btn-primary m-2"  style="list-style-type:none;">${n}</li>`  
    }

    let num_list=`<ul class="d-flex flex-wrap">${items}</ul>`;
    document.getElementById("numlist").innerHTML=num_list;
    document.getElementById("inputfield").value='';
    document.getElementById("inputfield").focus();
}