ShowBooks()

function Book(name, author, category) {
    this.name = name
    this.author = author
    this.category = category
}

// Display constructor
function Display() {

}


Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm')
    libraryForm.reset()
}

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true
    }
}

Display.prototype.show = function (type, msg) {
    let message = document.getElementById('message')
    message.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>
                        <div class="alert alert-${type} d-flex align-items-center" role="alert" style="display: flexbox;justify-content: center;align-items: center;">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                            ${msg}
                            </div>
                        </div>`
    setTimeout(() => {
        message.innerHTML = ''
    }, 5000)
}

// Add submit event listener to form

let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(event) {
    event.preventDefault()
    let name = document.getElementById('bookName').value
    let author = document.getElementById('author').value
    let category = document.getElementsByName('gridRadios')
    category.forEach(element => {
        if (element.checked) {
            category = element.value
        }
    });


    let book = new Book(name, author, category)

    let display = new Display()
    if (display.validate(book)) {
        display.clear()
        display.show('success', 'Book Successfully Added To Library 👍')

        let storage = localStorage.getItem('storage')
        if (storage == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(storage)
        }
        let myobj = {
            bookName: name,
            authorName: author,
            categoryType: category
        }
        bookObj.push(myobj)
        localStorage.setItem('storage', JSON.stringify(bookObj))
    }
    else {
        display.show('danger', 'Name and Author should be atleast 2 Letters')
    }
    ShowBooks()

}


function ShowBooks() {
    let storage = localStorage.getItem('storage')
    if (storage == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(storage)
    }

    let Content = ''
    bookObj.forEach(function (element, index) {
        Content += `<tr>
                        <td>${index + 1}</td>
                        <td class="BookName">${element.bookName}</td>
                        <td class="AuthorName">${element.authorName}</td>
                        <td class="CategoryType">${element.categoryType}</td>
                        <td><button id="${index}" onclick="deleteBook(this.id)" type="button" class="btn btn-danger">Delete</button></td>
                    </tr>`
    });

    let tableBody = document.getElementById('tableBody')

    if (bookObj.length != 0) {
        tableBody.innerHTML = Content;
    }
    else {
        tableBody.innerHTML = ``

    }
}

function deleteBook(index) {
    let storage = localStorage.getItem('storage')

    bookObj = JSON.parse(storage)

    bookObj.splice(index, 1)
    localStorage.setItem('storage', JSON.stringify(bookObj))
    ShowBooks()

}


let searchAll = document.getElementsByClassName('searchTxt')
Array.from(searchAll).forEach(Object => {
    Object.addEventListener('input', function () {
        let inputVal = Object.value
        let table = document.getElementById('tableBody')
        let booksearch = table.getElementsByTagName('tr')
        console.log(inputVal);

        Array.from(booksearch).forEach(element => {
            let BookName = element.querySelector('.BookName')
            let AuthorName = element.querySelector('.AuthorName')
            let CategoryType = element.querySelector('.CategoryType')

            if (BookName.innerText.includes(inputVal) || AuthorName.innerText.includes(inputVal) || CategoryType.innerText.includes(inputVal)) {
                element.style.visibility = 'visible'
            }
            else {
                element.style.display = 'none'

            }
        })

        setTimeout(() => {
            if (inputVal == '') {
                ShowBooks()
            }
        }, 500);
    
    })
})