
const profiles = [
    {
        name: 'Rohan',
        age: 18,
        city: 'kolkata',
        language: 'Python',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
        name: 'shubham',
        age: 20,
        city: 'london',
        language: 'JavaScript',
        framework: 'Angular',
        image: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
    {
        name: 'Mansi',
        age: 21,
        city: 'Delhi',
        language: 'Web Developer',
        framework: 'MERN',
        image: 'https://randomuser.me/api/portraits/women/79.jpg'
    },
    {
        name: 'Navin',
        age: 21,
        city: 'Pune',
        language: 'Python',
        framework: 'Flask',
        image: 'https://randomuser.me/api/portraits/men/79.jpg'
    },
    {
        name: 'Khusi',
        age: 19,
        city: 'Mumbai',
        language: 'C++',
        framework: 'Data Structures',
        image: 'https://randomuser.me/api/portraits/women/75.jpg'
    },
]


function cvIterator(profiles) {
    let nextIndex = 0
    return {
        first: function () {
            return { value: profiles[nextIndex]}
        },
        next: function () {
            return nextIndex < profiles.length ? { value: profiles[++nextIndex], done: false } : { done: true }
        },
        previous: function () {
            return { value: profiles[--nextIndex], done: false }
        }
    }
}

const candidates = cvIterator(profiles)

let image = document.getElementById('image')
let profile = document.getElementById('profile')

let next = document.getElementById('next')
next.addEventListener('click', nextCV)

let previous = document.getElementById('previous')
previous.addEventListener('click', previousCV)

function display(currentCandidate){
    image.innerHTML = `<img class=" rounded mx-auto d-block" src='${currentCandidate.image}'>`
        profile.innerHTML = `<ul class="list-group">
        <li class="list-group-item text-center">Name : ${currentCandidate.name}</li>
        <li class="list-group-item text-center">Age : ${currentCandidate.age} yrs</li>
        <li class="list-group-item text-center">City : ${currentCandidate.city}</li>
        <li class="list-group-item text-center">Primarly Works on : ${currentCandidate.language}</li>
        <li class="list-group-item text-center">Framework : ${currentCandidate.framework}</li>
        </ul>`
}

function start() {
    const currentCandidate = candidates.first().value
    display(currentCandidate)
}


start()
let currentCandidate;

function nextCV(e) {
    e.preventDefault()
    currentCandidate = candidates.next().value

    if (currentCandidate != undefined) {
        display(currentCandidate)
    }
    else{
        next.innerText = 'Click on Previous'
        next.setAttribute('disabled','true')
        currentCandidate = candidates.previous().value
    }
    if (previous.innerText == 'Click on Next'){
        previous.innerText = `Previous`
        previous.removeAttribute("disabled");
    }
}
function previousCV(e) {
    e.preventDefault()
    currentCandidate = candidates.previous().value

    if (currentCandidate != undefined) {
        display(currentCandidate)
    }
    else{
        previous.setAttribute('disabled','true')
        previous.innerText = 'Click on Next'
        currentCandidate = candidates.next().value
    }
    if (next.innerText == 'Click on Previous') {
        next.innerText = 'Next'
        next.removeAttribute('disabled')
        
    }
}

