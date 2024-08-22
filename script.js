let title = document.querySelector('#title')
let total = document.querySelector('#total')
let price = document.querySelector ('#price')
let taxes = document.querySelector('#taxes')
let ads = document.querySelector('#ads')
let discount = document.querySelector('#discount')
let submit = document.querySelector('#create')
let category = document.querySelector('#category')
let count = document.querySelector('#count')
let deleteall = document.querySelector('#deleteall')
let table = document.querySelector('#table')
let byname = document.querySelector('#byname')
let bycategory = document.querySelector('#bycategory')
let searchbar = document.querySelector('#searchbar')

function totalprice(){
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=result
    }
    else{
        total.innerHTML=''
    }
}

let arr = []
if (localStorage.products!=null && localStorage.products!==undefined && JSON.parse(localStorage.products).length > 0) {
    arr=JSON.parse(localStorage.products)
    deleteall.style.display='block'
}
else
{
    arr=[]
}

submit.onclick= function(){
    let newproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: price.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value!='' && price.value!=0 && category!='' && count.value<=100) {
        if(submit.innerHTML=='Create'){
            if(count.value>1){
                for (let index = 0; index < count.value; index++) {
                    arr.push(newproduct)
                }
            }
            else{
                arr.push(newproduct)
            }
        }
        else{
            arr[x]=newproduct
            submit.innerHTML='Create'
            count.style.display='block'
        }
        clear()
    }
    
    localStorage.products = JSON.stringify(arr)
    deleteall.style.display ='block'
    show()
}

function clear(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}

function show(){
    let tabledata = ''
    for (let i = 0; i < arr.length; i++) {
        tabledata +=`
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button onclick="updateitem(${i})" class="btn btn-primary py-0">Update</button></td>
            <td><button onclick="removeitem(${i})" class="btn btn-primary py-0">Delete</button></td>
        </tr>
    `
    }
    table.innerHTML = tabledata

}
show()

function removeall(){
    arr = [];
    localStorage.products=JSON.stringify(arr)
    deleteall.style.display='none'
    show()
}
function removeitem(index){
    arr.splice(index,1)
    localStorage.products=JSON.stringify(arr)
    if (arr.length==0) {
        deleteall.style.display='none'
    }
    show()
}

let x
function updateitem(index){
    title.value=arr[index].title
    price.value=arr[index].price
    taxes.value=arr[index].taxes
    ads.value=arr[index].ads
    discount.value=arr[index].discount
    total.innerHTML=arr[index].total
    count.style.display='none'
    category.value=arr[index].category
    submit.innerHTML='Update'
    x=index
    scrollTo(0,0)
}

function searchByName(){
    if (searchbar.value !== '') {
        let tabledata = ''
        for (let index = 0; index < arr.length; index++) {
            if (searchbar.value.toLowerCase()===arr[index].title) {
                tabledata +=`
                <tr>
                    <td>${index+1}</td>
                    <td>${arr[index].title}</td>
                    <td>${arr[index].price}</td>
                    <td>${arr[index].taxes}</td>
                    <td>${arr[index].ads}</td>
                    <td>${arr[index].discount}</td>
                    <td>${arr[index].total}</td>
                    <td>${arr[index].category}</td>
                    <td><button onclick="updateitem(${index})" class="btn btn-primary py-0">Update</button></td>
                    <td><button onclick="removeitem(${index})" class="btn btn-primary py-0">Delete</button></td>
                </tr>
            `
            }
            table.innerHTML = tabledata
        }
        searchbar.value=''
    }
    else{
        show()
    }
}
function searchByCategory(){
    if (searchbar.value !== '') {
        let tabledata = ''
        for (let index = 0; index < arr.length; index++) {
            if (searchbar.value.toLowerCase()===arr[index].category) {
                tabledata +=`
                <tr>
                    <td>${index}</td>
                    <td>${arr[index].title}</td>
                    <td>${arr[index].price}</td>
                    <td>${arr[index].taxes}</td>
                    <td>${arr[index].ads}</td>
                    <td>${arr[index].discount}</td>
                    <td>${arr[index].total}</td>
                    <td>${arr[index].category}</td>
                    <td><button onclick="updateitem(${index})" class="btn btn-primary py-0">Update</button></td>
                    <td><button onclick="removeitem(${index})" class="btn btn-primary py-0">Delete</button></td>
                </tr>
            `
            }
            table.innerHTML = tabledata
        }
        searchbar.value=''
    }
    else{
        show()
    }
}