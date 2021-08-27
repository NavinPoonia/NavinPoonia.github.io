
const api = obj.apikey
let newscard = document.getElementById('newscard')
const xhr = new XMLHttpRequest()
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${api}`, true)
let news = ''
xhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
        content = JSON.parse(this.response)['articles']
        for (let index = 0; index < content.length; index++) {
            news += `<div class="col">
                        <div class="card mb-3" style="max-width: 540px; height:100%">
                            <div class="row g-0 px-3" style="margin:auto">
                                <div class="col-md-4">
                                    <img src="${content[index]['urlToImage']}" alt="Click on Read More to Watch Video" style="width:100%; height:100%">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${content[index]['title']}</h5>
                                        <p class="card-text"></p>
                                        <a href="${content[index].url}" class="card-link" target = "_blank">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        }
        newscard.innerHTML = news
    }
}
xhr.send()

