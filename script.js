let inputEle = document.getElementById("search-input");
let searchBtnEle = document.getElementById("search-button");
let resultsEle = document.getElementById("results");
function createAndAppendSearcgResult(result) {
    let {title, link, description} = result;
    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    resultsEle.appendChild(resultItemEle);

    let titleEle = document.createElement("a");
    titleEle.textContent = title;
    titleEle.href = link;
    titleEle.target = "_blank";
    titleEle.classList.add("result-title");
    resultItemEle.appendChild(titleEle);

    let breakEle = document.createElement("br");
    resultItemEle.appendChild(breakEle);

    let urlEle = document.createElement("a");
    urlEle.textContent = link;
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.classList.add("result-url");
    resultItemEle.appendChild(urlEle);

    let descriptionEle = document.createElement("p");
    descriptionEle.textContent = description;
    descriptionEle.classList.add("result-description");
    resultItemEle.appendChild(descriptionEle);

    let lineEle = document.createElement("hr");
    resultItemEle.appendChild(lineEle);

}

function displayResults(searchResults) {
    for (let result of searchResults) {
        createAndAppendSearcgResult(result);
    }
}

function searchWikipedia(event) {
    if(event.key === "Enter" || event.type === "click") {
        let searchInput = inputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
        .then(function(response){
            return response.json()
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            displayResults(search_results);
        })
    }
}

searchBtnEle.addEventListener("click", searchWikipedia);
inputEle.addEventListener("keydown", searchWikipedia);
