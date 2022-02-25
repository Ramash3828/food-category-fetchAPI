// Get Element
const heading = document.getElementById('heading');
let text = "Select Your Fevorite Food";
const massage = document.getElementsByClassName('massage')[0];
const inputValue = document.getElementById('input-value');
const foodContainer = document.getElementById('food-container');
const foodModal = document.getElementById('foodModal');
//Heading animation
let start = 0;
function textTypieng() {
    heading.innerText = text.slice(0, start);
    start++;
  console.log(start)
    if(heading.innerText.length == text.length){
        console.log('clear')
        clearInterval(time)       
        return false;
    }
}
let time = setInterval(textTypieng, 100)


// Get Data
const getData = () => {
    // Validation part
    if (!isNaN(inputValue.value) || inputValue.value == "") {
        massage.textContent = "Please enter the valid text....";
        massage.style.display = "block";
        inputValue.value = "";
        setTimeout(() => {
            massage.style.display = "none";
        }, 2000)
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue.value}`)
            .then((res => res.json()))
            .then(data => displayItem(data.meals))
    }
}

const displayItem = (items) => {
        // Remove Previous element
        foodContainer.textContent = "";
        //Create All element
        items.forEach(meal => {
            let div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div onclick = "signleItem('${meal.idMeal}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
        </div>
        `
            foodContainer.appendChild(div);
        });
        inputValue.value = "";
    }
    // GET Signle Item
const signleItem = function(foodID) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`)
            .then((res => res.json()))
            .then(data => displayData(data.meals[0]))
    }
    // Display Signle Item
function displayData(data) {

    // Remove Previous element
    foodModal.textContent = "";
    //Create div element
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
                <div class="modal-header">
                    <h5 class="modal-title text-success" id="exampleModalLabel">${data.strMeal}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body w-75 mx-auto">
                    <img src="${data.strMealThumb}" class="card-img-top img-fluid " alt="${data.strMeal}">
                    <div class="card-body">                       
                        <p class="card-text">${data.strInstructions.slice(0, 100)}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <a type="button" href="${data.strYoutube}" class="btn btn-primary">Go to youtube</a>
                </div>
            `;
    foodModal.appendChild(div);

}