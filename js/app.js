

document.getElementById("search-btn").addEventListener("click", function () {
    const inputText = document.getElementById("input");
    const inputValue = inputText.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}
    `
    fetch(url)
        .then(res => res.json())
        .then(data => getItems(data.drinks))
})

const getItems = items => {
    const showCaseItems = document.getElementById("show-case-items");
    showCaseItems.textContent = '';
    items.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div onclick="getDetails(${item.idDrink})" class="col" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <div class="card h-100">
                <img src="${item.strDrinkThumb}" class="item-image card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.strDrink}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
        `;
        showCaseItems.appendChild(div);
    })
}

const getDetails = id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showInModal(data.drinks[0]))
}

const showInModal = details => {
    const modalInner = document.getElementById("modal-inner");
    modalInner.textContent = '';
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="back-background modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">${details.strDrink}</h5>
    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class=""><img src="${details.strDrinkThumb}" class="item-image card-img-top" alt="...">
    <p><small>Category : ${details.strCategory}</small></p>
    <p>${details.strInstructions}</p>
    </div>
    <div></div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <a href="${details.strImageSource}" target="_blank"><button type="button" class="btn btn-primary">Order now</button></a>
    </div>
    </div>
    `;
    modalInner.appendChild(div)
}