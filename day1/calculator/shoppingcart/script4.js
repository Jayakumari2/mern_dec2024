function printamt(){
    let qnty=parseInt(document.getElementById("quantity").value);
    let price=parseInt(document.getElementById("price").value);
    var amount=qnty*price;
    document.getElementById("amt").value=amount;
}

var cart=[];
function addItem(){
    let name=(document.getElementById("name").value);
    let qnty=parseInt(document.getElementById("quantity").value);
    let price=parseInt(document.getElementById("price").value);
    let amount=parseInt(document.getElementById("amt").value);
    let product={name:name,qty:qnty,price:price,amount:amount};
    cart.push(product);

    let cart_rows="";
    for(let prod of cart){
        cart_rows=cart_rows+`<TR><TD>${prod.name}</TD>
        <TD>${prod.qty}</TD>
        <TD>${prod.price}</TD>
        <TD>${prod.amount}</TD>
        </TR>`;
    }
    let totalamt=cart.reduce((sum,prod)=>{
        return sum+parseInt(prod.amount);
    },0);
    // let table=`<TABLE class="table table-border">
    // <TR>
    //    <TH>product</TH>
    //    <TH>qty</TH>
    //    <TH>price</TH>
    //    <TH>amount</TH>
    // </TR>
    // ${cart_rows}
    // <TR>
    //    <TH colspan="3">Total</TH>
    //    <TH>${totalamt}</TH>
    // </TR>`

    // Calculate total amount



//    let table = `
//       <table class="table table-border">
//           <tr>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Amount</th>
//           </tr>
//           ${cart_rows}
//           <tr>
//               <th colspan="3">Total</th>
//               <th>${totalamt}</th>
//           </tr>
//       </table>`;

let table = `
    <table border="1" style="width: 100%; text-align: left;">
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
        </tr>
        ${cart_rows}
        <tr>
            <th colspan="3">Total</th>
            <th>${totalamt}</th>
        </tr>
    </table>
`;
   document.getElementById("cartTable").innerHTML = table;

   document.getElementById("productName").value = "";
   document.getElementById("quantity").value = "";
   document.getElementById("price").value = "";
   document.getElementById("amt").value = "";

}