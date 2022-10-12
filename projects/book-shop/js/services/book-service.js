'use strict'
const STORAGE_KEY = 'books'
const gBooksNames = ['federalist', 'harry', 'bible', 'tania', 'bread',]
const PAGE_SIZE = 6

var gPageIdx = 0
var gFilterBy = { minRate: 0, maxPrice: 0, txt: '' }
var gBooks
var gSort

_createBooks()

function _createBook(name, bookPrice, imgIdx) {
    if (imgIdx < 1 || imgIdx > 6) imgIdx = 1
    return {
        id: makeId(),
        name,
        price: bookPrice ? bookPrice : getRandomIntInclusive(20, 60),
        rate: 0,
        imgUrl: `./img/book-${imgIdx}.jpg`,
    }

}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        var books = []
        for (var i = 0; i < 15; i++) {
            var bookName = gBooksNames[getRandomIntInclusive(0, gBooksNames.length - 1)]
            books.push(_createBook(bookName, null, i))
        }
    }
    gBooks = books
    saveBooksToStorage()
    console.log(gBooks);
}

function getBooks() {
    // var books = gBooks

    // // Filtering:

    var books = gBooks.filter(book => book.price <= (gFilterBy.maxPrice) &&
        book.rate >= gFilterBy.minRate && book.name.includes(gFilterBy.txt)
    )
    console.log(books);
    // sorting

    // books.sort((a, b) => {
    //     if (gSort === 'name') return a.name.localeCompare(b.name)
    //     return a[gSort] - b[gSort]
    // })
    // // Paging:

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    console.log(gPageIdx);
    return books
}

function presentationChange() {
    var presentationStyle = loadFromStorage('presentation')
    if (!presentationStyle || presentationStyle === 'cards') saveToStorage('presentation', 'table')
    else if (presentationStyle === 'table') saveToStorage('presentation', 'cards')

    return loadFromStorage('presentation')
}


function setBookFilter(filterBy = {}) {
    console.log(filterBy);

    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    console.log(gFilterBy);
    return gFilterBy
}

function removeBook(id) {
    console.log(id);
    var bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)

    console.log(gBooks);
    renderBooks()
    saveBooksToStorage()
}
function updateBook(bookId, bookPrice) {
    const book = getBookFromId(bookId)

    book.price = bookPrice
    saveBooksToStorage()
    renderBooks()
}

function getBookFromId(bookId) {
    const book = gBooks.find(currBook => {

        return currBook.id === bookId
    })
    return book
}

function updateRating(rate) {
    var tempBook = loadFromStorage('book')
    var book = getBookFromId(tempBook.id)
    book.rate = rate
    console.log(gBooks);
    saveBooksToStorage()
}

function setSorting(sortBy, direction) {
    var books = gBooks
    if (sortBy) gSort = sortBy
    books.sort((a, b) => {
        if (gSort === 'name') return a.name.localeCompare(b.name) * direction
        return (a[gSort] - b[gSort]) * direction
    })
}
function addBook(name, price) {
    let i = 0
    gBooksNames.forEach(bookName => {
        // console.log(book);
        i++
        if (bookName === name) {
            gBooks.unshift(_createBook(name, price, i))
            saveBooksToStorage()
            renderBooks()
        }
    })
}
function nextPage() {
    gPageIdx++
    // if(gPageIdx*PAGE_SIZE>=gBooks.length)gPageIdx--
    // console.log(gPageIdx);
    renderBooks()
}
function prevPage() {
    gPageIdx--
    // if(gPageIdx<0)gPageIdx=0
    // console.log(gPageIdx);
    renderBooks()
}


function saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeFromStorage(item) {
    localStorage.removeItem(item)
}