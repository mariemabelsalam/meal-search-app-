const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchinput')
const myText = document.querySelector('.text')
// console.log(searchInput, searchBtn, detailBtn, myText)
searchBtn.addEventListener('click', function () {
  let searchValue = searchInput.value.trim();
  if (searchValue === ' ') {
    myText.innerHTML = "Type the Meal in the search box."
  }
  else {
    let mealname = searchValue;
    getMeals(mealname)
  }
})
let meal = []
async function getMeals(mealname) {
  try {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);

    myText.innerHTML = "Fetching recipes..."
    var finalResponse = await response.json()
    meal = finalResponse.meals
    display()
    myText.innerHTML = " "
    searchInput.value = null
  } catch (error) {
    console.log('error')
  }
}

function display() {
  let items = ' '
  for (let i = 0; i < meal.length; i++) {
    items += `
         <div class="col-lg-4">
            <div class="card mt-3 h-100">
              <img src="${meal[i].strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                <h3 class="card-title">${meal[i].strMeal}</h3>
                <p class="card-text fs-4">${meal[i].strArea} Dish</p>
                <p class=fs-4>Belongs to ${meal[i].strCategory} category</p>
                <button href="#"  class="px-2 py-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="details" onclick="getModal(${i})">View Recipes</button>
              </div>
            </div>
          </div>
        `
  }
  document.getElementById('rowData').innerHTML = items
}
function getModal(index) {
  var get = `<div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">${meal[index].strMeal}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
             <img src="${meal[index].strMealThumb}" class="card-img-top" alt="...">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>`

  document.getElementById('content').innerHTML = get
}