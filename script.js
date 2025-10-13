let inputEle = document.getElementById("search-input");
let searchBtnEle = document.getElementById("search-button");
let resultsEle = document.getElementById("results");

function createAndAppendSearchResult(result) {
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
    resultsEle.innerHTML = "";
    if (searchResults.length === 0) {
        resultsEle.innerHTML = '<p class="p">Please Search</p>';
    } else {
        for (let result of searchResults) {
            createAndAppendSearchResult(result);
        }
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter" || event.type === "click") {
        let searchInput = inputEle.value.trim();
        if (searchInput === "") {
            displayResults([]);
            return;
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchInput);
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {search_results} = jsonData;
                displayResults(search_results);
            })
            .catch(function(error) {
                console.error("Error fetching search results:", error);
                displayResults([]);
            });
    }
}

searchBtnEle.addEventListener("click", searchWikipedia);
inputEle.addEventListener("keydown", searchWikipedia);

displayResults([]);
