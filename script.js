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
console.log(localStorage.products.length);
if (localStorage.products != '' && localStorage.products !== undefined && JSON.parse(localStorage.products).length > 0) {
    arr=JSON.parse(localStorage.products)
    deleteall.style.display='block'
}
else
{
    arr=[]
}

submit.onclick= function(){
    let newproduct = {
        title:title.value,
        price:price.value,
        taxes:price.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    arr.push(newproduct)
    localStorage.products= JSON.stringify(arr)
    deleteall.style.display='block'
    clear()
    show()
}

function clear(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.value=''
    count.value=''
    category.value=''
}

function show(){
    let tabledata = ''
    for (let i = 0; i < arr.length; i++) {
        tabledata +=`
        <tr>
            <td>${i}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button class="btn btn-primary py-0">Update</button></td>
            <td><button class="btn btn-primary py-0">Delete</button></td>
        </tr>
    `
    }
    table.innerHTML=tabledata
}
show()

function removeall(){
    localStorage.products=JSON.stringify([])
    deleteall.style.display='none'
    table.innerHTML=''
    arr = [];
}
