const foodList = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodList(data.meals));
}

const displayFoodList = data => {
    console.log(data);
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = ``;
    data.forEach(data => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('col');
        foodDiv.innerHTML = `
        <div class="card">
            <img src="${data.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text">${data.strInstructions.slice(0, 250)}</p>
            </div>
        </div>
        `;
        foodList.appendChild(foodDiv);
    });

}

const searchFood = search => {
    const searchText = document.getElementById('search-field');
    const text = searchText.value;

    foodList(text);

    searchText.value = '';
}


foodList('');