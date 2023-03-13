var amount = document.getElementById('price');
var product = document.getElementById('product');
var sum =0;
var msg = document.getElementById('alert');
var crudLink = 'https://crudcrud.com/api/8d4490fb47524d45804943de2fc671bc'

document.getElementById('btn').addEventListener('click',storeData)

function storeData(e){
    e.preventDefault();

    let obj = {
        price : amount.value,
        product: product.value
    }
    if(obj.price =='' || obj.product== '' ){
        let child=document.createElement('h6');
        child.className=' alert alert-danger text-center col-5 mx-auto text-decoration-underline'
        child.innerHTML=`Please Add Product`
        msg.appendChild(child)
         
        setTimeout(()=>child.remove(),3000)
        
    }else{
     
    axios.post(`${crudLink}/appData`,obj)
    .then((res)=>{
        console.log(res.data);
        let obj = res.data;
        sum = sum + +obj.price;
        let parent = document.getElementById("total");
        let child = `<h5 class="bg-warning text-center fw-bolder">Total value worth of products = ₹ ${sum}</h5>`;
        parent.innerHTML = child;
        showOnScreen(obj);

    })
    }

}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get(`${crudLink}/appData`)
    .then((res)=>{
        
        for(let el of res.data){
            sum = sum + +el.price;
            showOnScreen(el)
           
        }
        let parent = document.getElementById("total");
        let child = `<h5 class="bg-warning text-center fw-bolder">Total value worth of products = ₹ ${sum}</h5>`;
        parent.innerHTML = child;
      
    })
})

function showOnScreen(obj){
    let parent = document.getElementById("list");
    let child = `<li id = "${obj._id}" class=' text-uppercase list-group-item list-group-item-action list-group-item-warning fw-bold my-auto' >
    ${obj.product} - ₹ ${obj.price}.00
    <button onclick= "deleteItem('${obj._id}',${obj.price})" class='btn btn-danger  float-end'>Remove from cart</button>

    
    </li>`
    // <button onclick= "editItem('${obj.price}','${obj.product}','${obj._id}' )" class='btn btn-success float-end'>Edit</button>
    parent.innerHTML= parent.innerHTML + child;
    
}

function deleteItem(uid,price){
    axios.delete(`${crudLink}/appData/${uid}`)

    
    if(price == NaN){
        sum =0
    }else{
        sum = sum - +price;
    } 

    let parent1 = document.getElementById("total");
    let child = `<h5 class="bg-warning text-center fw-bolder">Total value worth of products = ₹ ${sum}</h5>`;
    parent1.innerHTML = child;

    var parent =document.getElementById(uid).parentElement;
    parent.removeChild(document.getElementById(uid))
}

// function editItem(amoun,de,id){
//     amount.value= amoun;
//     des.value=de;

//     deleteItem(id,amoun);

// }
