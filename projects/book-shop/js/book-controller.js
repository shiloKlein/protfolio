'use strict'


function onInit() {

    renderFilterByQueryStringParams()
    renderModalByQueryStringParams()
    // renderVendorsInFilter()
    renderBooks()

    // renderBooksTable(gBooks)
}


function renderBooks() {
    
    var books = getBooks()

    var presentationStyle = loadFromStorage('presentation')
    
    if(!presentationStyle||presentationStyle==='cards')renderBooksTable(books)
    else if(presentationStyle==='table')renderBooksCards(books)

    if(gPageIdx<=0)document.querySelector('.prev-page').disabled=true
    if(gPageIdx*PAGE_SIZE>=gBooks.length) document.querySelector('.next-page').disabled=true

}
function renderBooksTable(books){
    document.querySelector('.books-container').classList.remove('.cards')
    var headStrHTML = ' <table class="books-table"><thead><tr class="table-head">'
    var strHTML = '<tbody class="table-body">'
    for (var key in books[0]) {
        console.log(key);
        if (key === 'imgUrl') {
            headStrHTML += `<th colspan = "3">actions</th>`
        } else headStrHTML += `<th class="header-sorter" onclick="onSetSorting('${key}')">${key}</th>`
    }
    books.forEach(book => {
        if(book.rate==='')book.rate=0
        strHTML += `<tr ><td class="id">${book.id}</td><td class="name">${book.name}</td><td class="price">${book.price}</td>
        <td class="price">${book.rate}</td>
    <td><button onclick="onRead('${book.id}')">read</button></td>
    <td><button onclick="onUpdateBook('${book.id}')">update</button></td>
    <td><button onclick="onRemoveBook('${book.id}')">delete</button></td></tr>`
    });
    headStrHTML+=' </tr></thead>'
    strHTML+=' </tbody></table>'
    document.querySelector('.books-container').innerHTML=headStrHTML+strHTML
    // document.querySelector('.table-head').innerHTML = headStrHTML
    // document.querySelector('.table-body').innerHTML = strHTML
    

}
function renderBooksCards(books){
    document.querySelector('.books-container').classList.add('cards')
    var strHTML = ''
    var cardsHolder=document.querySelector('.cards')

    books.forEach(book => {
        
        strHTML += `<div class="card">
        <div class="title">
        name: ${book.name}</div>
        <div class="cover">
        <img src=${book.imgUrl} alt="${book.name}"></div>    
        <div class="details">
        <h5>price: ${book.price}</h5>
        <h5>id: ${book.id}</h5></div>
        <div class="actions">
    <button onclick="onRead('${book.id}')">read</button><br>
    <button onclick="onUpdateBook('${book.id}')">update</button><br>
    <button onclick="onRemoveBook('${book.id}')">delete</button> 
    </div>
    </div>`
    });
    cardsHolder.innerHTML = strHTML


    // <div class=""></div><div class="card"></div><div class="card"></div>
    // <div class="card"></div><div class="card"></div><div class="card"></div>
    // <div class="card"></div><div class="card"></div><div class="card"></div>
    

}

function onPresentationChange(){
    var presentation = presentationChange()
    var elPresentationBtn = document.querySelector('.presentation img')
    if(presentation==='cards')elPresentationBtn.src = './img/cards-presentation.jpg'
    else if(presentation==='table')elPresentationBtn.src = './img/table-presentation.jpg'
    
    console.log(presentation);

    
    
    renderBooks()
}
function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: queryStringParams.get('maxPrice') || Infinity,
        minRate: +queryStringParams.get('minRate') || 0,
        txt: queryStringParams.get('name') || ''
    }

    if (!filterBy.maxPrice && !filterBy.minRate&&!filterBy.txt) return
    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.filter-txt').value = filterBy.txt
    setBookFilter(filterBy)
}

function onSetFilterBy(filterBy) {
    console.log(filterBy);
    filterBy = setBookFilter(filterBy)
    renderBooks()
    if(!filterBy.txt)filterBy.txt=''
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&name=${filterBy.txt}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onSetSorting(sortBy){
    const prop = sortBy
    const isDesc = document.querySelector('.sort-desc').checked
    // const direction = {
    //     [prop]: (isDesc) ? -1 : 1
    // }
    const direction =(isDesc) ? -1 : 1

    setSorting(sortBy, direction)
    renderBooks()

}
function onAddBook(ev) {
    ev.preventDefault()
    var elName = document.querySelector('[name=add-name]')
    var elPrice = document.querySelector('[name=add-price]')
    var name= elName.value
    var price= elPrice.value
    // var name = prompt('write the book name')
    // var price = prompt('write the price')
    addBook(name, price)
}

function onUpdateBook(bookId) {
    var price = +prompt('write the new price')
    console.log(price);
    if (price / price !== 1 || !price) return

    updateBook(bookId, price)
}

function onRemoveBook(bookId) {
    removeBook(bookId)
}

function onRead(bookId) {
    openBookModal(bookId)
}

function onNextPage(){
   
    nextPage()
    var elNextBtn = document.querySelector('.next-page')
    var elPprevBtn = document.querySelector('.prev-page')
    var elPageNum = document.querySelector('.page-link')
    if(gPageIdx*PAGE_SIZE>=gBooks.length-2)elNextBtn.disabled=true
    elPprevBtn.disabled=false
    elPageNum.innerText = gPageIdx+1
}
        
function onPrevPage(){
   prevPage()
   var elPprevBtn = document.querySelector('.prev-page')
   var elNextBtn = document.querySelector('.next-page')
   var elPageNum = document.querySelector('.page-link')
   if(gPageIdx<=0)elPprevBtn.disabled=true
   elNextBtn.disabled=false
   elPageNum.innerText = gPageIdx+1
}

function renderModalByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const book = {
        id: queryStringParams.get('id') || '',
        name: queryStringParams.get('name') || '',
        price: +queryStringParams.get('price') || 0,
        imgUrl: queryStringParams.get('imgUrl') || ''
    }
    const newUrl = window.location.protocol 
    window.history.pushState({ path: newUrl }, '', newUrl)

    if (!book.id && !book.name&&!book.price&&!book.imgUrl) return
    openBookModal(book.id)
}
function openBookModal(bookId) {
    var elModal = document.querySelector('.read-modal')
    elModal.classList.add('open')
    var book = getBookFromId(bookId)
    saveToStorage('book',book)

    renderBookModal(book)

    const queryStringParams = `?id=${book.id}&name=${book.name}&price=${book.price}&imgUrl=${book.imgUrl}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}


function renderBookModal(book){
    var elId = document.querySelector('.tId')
    var elName = document.querySelector('.tName')
    var elPrice = document.querySelector('.tPrice')
    var elImg = document.querySelector('.tImg')
    elId.innerHTML= `id: ${book.id}<br>`
    elName.innerHTML= `name: ${book.name}<br>`
    elPrice.innerHTML= `price: ${book.price}<br>`
    elImg.innerHTML= `<img src=${book.imgUrl} alt=" ${book.name} img"<br>`
    
  

}

function onUpdateRate(){
    var rating = document.querySelector('.rate-choose')
    if(rating.value>10)rating.value=10
    updateRating(rating.value)
    renderBooks()

}
function onCloseBookModal(elButton){
    var elModal = document.querySelector('.read-modal')
    console.log(elModal);
    elModal.classList.remove('open')
   

    window.history.replaceState(null, null, window.location.pathname)
    removeFromStorage('book')
}





// no mine!!!!!!!!
// its al yaron's stuff
// the above is mine
// it is time to stop writing this nonesense


// function renderVendorsInFilter() {

//     const vendors = getVendors()

//     const strHTMLs = vendors.map(vendor => `<option>${vendor}</option>`)
//     strHTMLs.unshift('<option value="">Select Vendor</option>')

//     const elSelect = document.querySelector('.filter-vendor-select')
//     elSelect.innerHTML = strHTMLs.join('')

// }


// function onSetFilterBy(filterBy) {
//     filterBy = setCarFilter(filterBy)
//     renderCars()

//     const queryStringParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}`
//     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
//     window.history.pushState({ path: newUrl }, '', newUrl)

// }

// function renderFilterByQueryStringParams() {
//     const queryStringParams = new URLSearchParams(window.location.search)
//     const filterBy = {
//         vendor: queryStringParams.get('vendor') || '',
//         minSpeed: +queryStringParams.get('minSpeed') || 0
//     }

//     if (!filterBy.vendor && !filterBy.minSpeed) return

//     document.querySelector('.filter-vendor-select').value = filterBy.vendor
//     document.querySelector('.filter-speed-range').value = filterBy.minSpeed
//     setCarFilter(filterBy)
// }




// // //////////////////////////////
// // service

// var gFilterBy = { vendor: '', minSpeed: 0 }

// function getCars() {
    
//     // Filtering:
//     var cars = gCars.filter(car => car.vendor.includes(gFilterBy.vendor) &&
//         car.maxSpeed >= gFilterBy.minSpeed)

//     // Paging:
//     const startIdx = gPageIdx * PAGE_SIZE
//     cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
//     return cars
// }


// function setCarFilter(filterBy = {}) {
//     if (filterBy.vendor !== undefined) gFilterBy.vendor = filterBy.vendor
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }