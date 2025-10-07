let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let small=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let create=document.getElementById("button")
let trim;
mood="create"
function getTotal(){
    if(price.value!=""){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
     small.innerHTML=result;
     small.style.cssText="background-color:green;"
    }
    else{
small.innerHTML=""
         small.style.cssText="background-color:red;" 

    }
}
let Datapro;
if(localStorage.product!=null){
    Datapro=JSON.parse(localStorage.product)

}
else{
    Datapro=[]
}

create.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        small:small.innerHTML,
        count:count.value,
        category:category.value,
        
    }
    
    if(title.value!=""&&price.value!=""&&category.value!=""&&count.value<100){
    if(mood==="create"){
  if(newpro.count>1){
      for(let i=0;i<newpro.count;i++){
    Datapro.push(newpro)
      }
    }
    else{
      Datapro.push(newpro)
    }

    }
    else{
    Datapro[trim]=newpro;
    mood="create"
    count.style.display="block"
    create.innerHTML="create"

    }
   clearData()
        }

  
    localStorage.setItem("product",JSON.stringify(Datapro))

showdata()

}
function clearData(){
  
   title.value=""
   price.value=""
    taxes.value=""
     ads.value=""
     discount.value=""
     small.innerHTML=""
     count.value=""
     category.value=""

}

function showdata(){

getTotal()
  let s="";
    for(let i=0;i<Datapro.length;i++){
        s+= `
          <tr>
      <td data-title="id">${i+1}</td>
      <td data-title="title">${Datapro[i].title}</td>
      <td data-title="price">${Datapro[i].price}</td>
      <td data-title="taxes">${Datapro[i].taxes}</td>
      <td data-title="ads">${Datapro[i].ads}</td>
      <td data-title="discount">${Datapro[i].discount}</td>
      <td data-title="total">${Datapro[i].small}</td>
      <td data-title="category">${Datapro[i].category}</td>
      <td data-title="update" >
      <button onclick="updateData(${i})">update</button>
      </td>
      <td data-title="delete" >
      <button onclick=" deletedata(${i})">delete</button>
      </td>
     


    </tr>

        
    `
    }
          document.getElementById("tbody").innerHTML=s   
         
        
         let f=document.getElementById("delete");    
          if(Datapro.length>0){
      
            f.innerHTML=`
            <button onclick="deleteall()">delete ${Datapro.length}</button>
            `
          }

          else{
            f.innerHTML=''
          }
}
showdata()
function deletedata(i){
    Datapro.splice(i,1)
    localStorage.product=JSON.stringify(Datapro)

  showdata()

}
function deleteall(){
Datapro.splice(0);
localStorage.clear();
showdata()

}
function updateData(i){
title.value=Datapro[i].title;
price.value=Datapro[i].price;
taxes.value=Datapro[i].taxes;
ads.value=Datapro[i].ads;
discount.value=Datapro[i].discount;
category.value=Datapro[i].category;
count.style.display="none"
mood="update";
trim=i;
create.innerHTML="update"
scrollTo({
  top:0,
  behavior:"smooth"
})

}
let searchmood="title"

function searchdata(id){
  let search=document.getElementById("serach")

  if(id=="search by title"){
    searchmood="title"
  
  }
  else{
  searchmood="category"

  }
   search.placeholder="search by "+searchmood;
  search.focus();
  search.value=""
showdata()
  

}

function search(value){

  let s=""

  for(let i=0;i<Datapro.length;i++){
    if(searchmood=="title"){

  
    if(Datapro[i].title.includes(value.toLowerCase())){

  
        s+= `
          <tr>
      <td data-title="id">${i}</td>
      <td data-title="title">${Datapro[i].title}</td>
      <td data-title="price">${Datapro[i].price}</td>
      <td data-title="taxes">${Datapro[i].taxes}</td>
      <td data-title="ads">${Datapro[i].ads}</td>
      <td data-title="discount">${Datapro[i].discount}</td>
      <td data-title="total">${Datapro[i].small}</td>
      <td data-title="category">${Datapro[i].category}</td>
      <td data-title="update" >
      <button onclick="updateData(${i})">update</button>
      </td>
      <td data-title="delete" >
      <button onclick=" deletedata(${i})">delete</button>
      </td>
     


    </tr>

        
    `
  }


}
else{
    if(Datapro[i].category.includes(value.toLowerCase()))
        s+= `
          <tr>
      <td data-title="id">${i}</td>
      <td data-title="title">${Datapro[i].title}</td>
      <td data-title="price">${Datapro[i].price}</td>
      <td data-title="taxes">${Datapro[i].taxes}</td>
      <td data-title="ads">${Datapro[i].ads}</td>
      <td data-title="discount">${Datapro[i].discount}</td>
      <td data-title="total">${Datapro[i].small}</td>
      <td data-title="category">${Datapro[i].category}</td>
      <td data-title="update" >
      <button onclick="updateData(${i})">update</button>
      </td>
      <td data-title="delete" >
      <button onclick=" deletedata(${i})">delete</button>
      </td>
     


    </tr>

        
    `
  

}
  }

    document.getElementById("tbody").innerHTML=s   

}
