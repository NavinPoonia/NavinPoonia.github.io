
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none'

let jsonradio = document.getElementById('jsonradio')
jsonradio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('jsonBox').style.display = 'block'

})

let customradio = document.getElementById('customradio')
customradio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block'
    document.getElementById('jsonBox').style.display = 'none'

})


function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

let addParameterCount = 2
let addparameter = document.getElementById('addparameter')
addparameter.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = `<div class="row newparams">
                    <label for="url" class="col-md-3 col-form-label">Paramter ${addParameterCount}</label>
                    <div class="col-md-9 col-form-label">
                        <div class="row g-3">
                            <div class="col-sm-4 col-form-label">
                                <input type="text" class="form-control" placeholder="key"  id = "parameterkey${addParameterCount}">
                            </div>
                            <div class="col-sm-7 col-form-label">
                                <input type="text" class="form-control" placeholder="Value"  id = "parametervalue${addParameterCount}">
                            </div>
                            <div class="col-sm-1 col-form-label">
                                <button type="button" class="btn btn-primary deleteParam">-</button>
                            </div>
                        </div>
                    </div>
                </div>`


    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.parentElement.remove()
            let newparams = document.getElementsByClassName('newparams')
            for (let index = 0; index < Array.from(newparams).length; index++) {
                Array.from(newparams)[index].firstElementChild.innerHTML = `Paramter ${index + 2}`

            }
        })
    }
    addParameterCount++;

    let newparams = document.getElementsByClassName('newparams')
    for (let index = 0; index < Array.from(newparams).length; index++) {
        Array.from(newparams)[index].firstElementChild.innerHTML = `Paramter ${index + 2}`

    }
})


let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    document.getElementById('responseText').innerHTML = 'Please Wait... Fetching Response'


    let url = document.getElementById('url').value
    let requestType = document.querySelector('input[name = "requestType"]:checked').value
    let contentType = document.querySelector('input[name = "contentType"]:checked').value


    if (contentType == 'CUSTOM') {
        data = {}
        for (let index = 0; index < addParameterCount; index++) {
            if (document.getElementById('parameterkey' + (index + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (index + 1)).value
                let value = document.getElementById('parametervalue' + (index + 1)).value
                data[key] = value
            }

        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('jsonText').value
    }

    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseText').innerHTML = text
            Prism.highlightAll()

        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then(response => response.text()).then((text) => {
            document.getElementById('responseText').innerHTML = text
            Prism.highlightAll()
        })
    }

})