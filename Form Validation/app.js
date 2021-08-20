
const username = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

let validusername = false
let validemail = false
let validphone = false

username.addEventListener('blur', () => {
    let regex = /^[a-zA-Z]([0-9a-zA-Z]){5,10}$/
    let str = username.value
    console.log(regex, str);
    if (regex.test(str)) {
        validusername = true
        username.classList.remove('is-invalid')
    }
    else {
        validusername = false
        username.classList.add('is-invalid')
    }
})
email.addEventListener('blur', () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]+){2,7}$/
    let str = email.value
    console.log(regex, str);
    if (regex.test(str)) {
        validemail = true
        email.classList.remove('is-invalid')
    }
    else {
        email.classList.add('is-invalid')
        validemail = false

    }
})
phone.addEventListener('blur', () => {
    let regex = /^([0-9]){10}$/
    let str = phone.value
    console.log(regex, str);
    if (regex.test(str)) {
        validphone = true
        phone.classList.remove('is-invalid')
    }
    else {
        validphone = false
        phone.classList.add('is-invalid')
    }
})

let submit = document.getElementById('submit')
let success = document.getElementById('success')
let danger = document.getElementById('danger')

submit.addEventListener('click', (event) => {
    event.preventDefault()

    if (validusername && validemail && validphone) {
        success.style.display = 'block'
        setTimeout(() => {
            success.style.display = 'none'
        }, 4000)
    }
    else{
        danger.style.display = 'block'
        setTimeout(() => {
            danger.style.display = 'none'
        }, 4000)
    }

})