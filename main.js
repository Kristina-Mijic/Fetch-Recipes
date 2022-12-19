let btnSearchFood = document.getElementById('btn-search-food-id');
let inputSearch = document.getElementById('input-id').value;


//About one card info:
let cardsWrapper = document.getElementById('cards-wrapper-id');
let cardFood = document.getElementById('card-id');
let foodPhoto = document.getElementById('card-photo-id');
let foodName = document.getElementById('card-food-name-id');


//Modal info:
let modalWrapper = document.getElementById('modal-food-wrapper-id');
let modalCategory = document.getElementById('modal-food-category-id');
let foodPreparationDescription = document.getElementById('modal-food-preparation-id');
let errorWrapper = document.getElementById('error-msg-food');


//Fetch data list all meals:
let fetchData = async() => {
  let inputSearch = document.getElementById('input-id').value.trim();
  const fetchUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
  const data = await fetchUrl.json();
  console.log(data);

  try {
    createAllCards(data)
  }
  catch (err) {
    createErrorMsg('The name you entered does not exist, try again!')
  }
};

btnSearchFood.addEventListener('click', () => {
  if(document.getElementById('input-id').value.trim() != '') {
    fetchData()
  }
});


//Created error mess. when food doesn't exist:
let createErrorMsg = (msg) => {
  let templateErrorMsg = '';
  templateErrorMsg =  
  `
  <img class="no-name-food-photo" src="./no-name-food.png" alt="">
  <p class="no-name-food-text">${msg}</p>
  `
  errorWrapper.innerHTML = templateErrorMsg; 
  showErrorModal()
};

//Show error modal on display when food doesn't exist:
let showErrorModal = () => {
  cardsWrapper.style.display = 'none'
  errorWrapper.style.display = 'flex'
};


//Create template with food cards:
let createAllCards = (data) => {
  let templateCards = '';
  data.meals.map(e => {
    templateCards +=  
    ` 
    <div class="card" data-id=${e.idMeal}>
      <img src='${e.strMealThumb}' alt="food-img" class="card-food-img" id="card-photo-id">
      <h1 class="card-food-name" id="card-food-name-id">${e.strMeal}</h1>
      <button class="card-read-more-btn">Read more</button>
    </div>
    `
    cardsWrapper.innerHTML = templateCards;
    showAllCards()
  }) 
  openMealModal()
};


//Show all food cards on display:
let showAllCards = () => {
  errorWrapper.style.display = 'none'
  cardsWrapper.style.display = 'grid'
};


//Fetch data ID meal:
let fetchDataMealId = async(idMeal) => {
  // const cardMeal = document.querySelectorAll('.card')
  const fetchUrlId = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  console.log(fetchUrlId)
  const dataFetchUrlId = await fetchUrlId.json();
  console.log(dataFetchUrlId.meals[0]);
  
  createMealModal(dataFetchUrlId);
};

//Create ID Meal Modal:
let createMealModal = (data) => {
  console.log(data.meals[0].strCategory);
  let templateMealModal = '';
  templateMealModal = 
  `
  <button class="modal-food-close-modal" id="btn-close-modal">X</button>
  <h1 class="card-food-name modal-food-name">${data.meals[0].strMeal}</h1>
  <h2 class="modal-food-category" id="modal-food-category-id">Category: ${data.meals[0].strCategory}</h2>
  <p class="modal-food-preparation" id="modal-food-preparation-id">${data.meals[0].strInstructions}</p>
  <a href=${data.meals[0].strYoutube} target="_blank"><img src='${data.meals[0].strMealThumb}' alt="food-img" class="card-food-img modal-food-photo" id="card-photo-id"> </a>
  `
  modalWrapper.innerHTML = templateMealModal;

  closeModal()
};


//Open meal modal when click read-more btn:
let openMealModal = () => {
  let btnReadMore = document.querySelectorAll('.card-read-more-btn');
  
  btnReadMore.forEach(btn => {
    btn.addEventListener('click', (e) => {
      modalWrapper.style.display = 'flex'
      let btnId = e.target.parentElement.dataset.id
      console.log(btnId);
      fetchDataMealId(btnId)
    });
  })
};


let closeModal = () => {
  let btnCloseModal = document.getElementById('btn-close-modal');

  btnCloseModal.addEventListener('click', () => {
    modalWrapper.style.display = 'none'
  })
}





