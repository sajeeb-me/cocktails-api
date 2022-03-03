

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
        <div class="col" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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