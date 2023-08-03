//API methods and functions
const foodList = (search, limit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodList(data.meals, limit));
}

//display all food items
const displayFoodList = (data, limit) => {
    // console.log(data);
    const foodList = document.getElementById('food-list');
    const noResults = document.getElementById('no-results-found');
    const showAll = document.getElementById('btn-show-all');
    foodList.innerHTML = ``;

    //no results found for food
    if (data === null) {
        noResults.classList.remove('d-none');
        showAll.classList.add('d-none');
        return;
    }
    else {
        noResults.classList.add('d-none');
    }

    //food list limitaion and show all button
    if (data.length > limit) {
        data = data.slice(0, limit);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    data.forEach(data => {
        //create a div for every items data
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('col');
        foodDiv.innerHTML = `
        <div class="card">
            <img src="${data.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text">${data.strInstructions.slice(0, 250)}</p>
                <button onclick="getFoodDetails(${data.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#foodDetailsModal">
                Show Details
            </button>
            </div>
        </div>
        `;
        foodList.appendChild(foodDiv);
    });

}

//common function for searching food
const processSearch = (limit) => {
    const searchText = document.getElementById('search-field');
    const text = searchText.value;

    foodList(text, limit);

    searchText.value = '';
}
//Search using buttons
const searchFood = search => {
    processSearch(10);
}

//search using enter key
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

//get food Details
const getFoodDetails = async foodId => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`);
    const data = await res.json();
    showFoodDetails(data);
}

//Show Food details
const showFoodDetails = food => {
    // console.log(food);
    const foodName = document.getElementById('foodDetailsModalLabel');
    foodName.textContent = food.meals[0].strMeal;

    const foodDetails = document.getElementById('food-details');
    foodDetails.innerHTML = `
    <p>ID: ${food.meals[0].idMeal}</p>
    <p>Area: ${food.meals[0].strArea}</p>
    <p>Category: ${food.meals[0].strCategory}</p>
    <p>Tags: ${food.meals[0].strTags ? food.meals[0].strTags : "No Tags"}</p>
    `;
}

//show all button works
document.getElementById('btn-show').addEventListener('click', function () {
    foodList('');
});

foodList('', 10);