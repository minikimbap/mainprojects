const recipeButton = document.querySelector('.recipe-button')
const refreshButton = document.querySelector('.refresh-button')
const recipeList = document.querySelector('ul')


// media queries
// const h4 = document.querySelector('h4')
// const mql = window.matchMedia("(max-width: 600px)")
// function screen(e){
//   if(e.matches){
//     h4.textContent = 'Less than 600px'
//     h4.style.backgroundColor = 'red'
//   }
//   else {
//     h4.textContent = 'more than 600px'
//     h4.style.backgroundColor = 'blue';
//   }
// }
// mql.addEventListener("change", screen);






recipeButton.addEventListener('click', getRecipes)
refreshButton.addEventListener('click', getCategories)
document.addEventListener('DOMContentLoaded', getCategories)

const apiKey = 1


function getCategories(){ 
  let dbURL = `https://www.themealdb.com/api/json/v1/${apiKey}/categories.php`
  fetch(dbURL, putCategories)
      .then(res => res.json())
      .then(data =>{
        // console.log(data.categories[0].strCategory)
        emptyList()
        // console.log('emptied')
        putCategories(data)
        document.querySelector('input').value = ``
        document.querySelector('p').textContent = ``
      })
      .catch(err => console.log(`err is ${err}`))
}

function putCategories(meals){

  for(let i = 0; i <= meals.categories.length-1; i++){
    let item = document.createElement('a')

    item.textContent = meals.categories[i].strCategory
    item.classList.add('grid-item')
    item.style.color = 'var(--clr-text)' 
    recipeList.classList.add('grid')   
    recipeList.append(item)
   


    // testing filter

    item.addEventListener('click', ()=>{
      let dbURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.textContent}`
      fetch(dbURL, filter)
          .then(res => res.json())
          .then(data =>{
            // console.log(data.categories)
            filter(data)
          })
          .catch(err => console.log(`err is ${err}`))
    })


  } 
}

function emptyList(){
  recipeList.innerHTML = ``
  recipeList.classList.remove('grid')
}

function getRecipes(){
  const input = document.querySelector('input').value
  if(input === ``){
    document.querySelector('p').textContent = randomQuote()
    document.querySelector('p').style.color = 'var(--clr-secondary)'
  }
  else{
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${input}`
    fetch(url)
        .then(res => res.json())
        .then(data =>{
          // console.log(data)
          emptyList()
          putMeals(data)
        })
        .catch(err => console.log(`err is ${err}`))
        document.querySelector('p').textContent = ``
  } 
}

function putMeals(mealRecipes){
  for(let i = 0; i <= mealRecipes.meals.length-1; i++){
    let recipe = document.createElement('li')
    let instructionsTitle = document.createElement('h3')
    let instructions = document.createElement('p')
    let itemContainer = document.createElement('div')
    let title = document.createElement('h2')
    let image = document.createElement('img')

    title.textContent = mealRecipes.meals[i].strMeal
    instructionsTitle.textContent = `Recipe Instructions`

    instructions.textContent = mealRecipes.meals[i].strInstructions
    // instructions.style.textWrap = 'balance'
    instructions.style.fontSize = '.85rem'
    instructions.style.lineHeight = '1.5'
    // item.classList.toggle('grid-item')
    recipe.style.marginTop = '1.5rem' 
    recipe.style.width = 'min(100% - 3rem, 75rem)'
    recipe.style.marginInline = 'auto'

    image.src = mealRecipes.meals[i].strMealThumb
    
   
    recipe.append(image)
    itemContainer.append(title)
    itemContainer.append(instructionsTitle)
    itemContainer.append(instructions)
    recipe.style.gap = '1.5rem'
    recipe.append(itemContainer)
    recipeList.append(recipe)
  }
}

function filterByCategory(){
  item.addEventListener('click', ()=>{
      let dbURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.textContent}`
      fetch(dbURL, filter)
          .then(res => res.json())
          .then(data =>{
            // console.log(data.categories)
            filter(data)
          })
          .catch(err => console.log(`err is ${err}`))
    })
}

function filter(filterElement){
  // console.log(filterElement)
  document.querySelector('p').textContent = ``
  emptyList()

  let mealID = []
  let body = document.querySelector('body')
  let wrapper = document.querySelector('.wrapper')
  let modal = document.createElement('dialog')
  let modalHeader = document.createElement('div')
  let modalTitle = document.createElement('h3')
  let modalInstructions = document.createElement('p')
  let modalCloseBtn = document.createElement('h3')
  
  
  for(let i = 0; i <= filterElement.meals.length-1; i++){
    
    let item = document.createElement('li')
    item.style.cursor = 'pointer'
    mealID.push(filterElement.meals[i].idMeal)
 
    item.addEventListener('click', ()=>{
      let dbURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID[i]}`
      fetch(dbURL)
          .then(res => res.json())
          .then(data =>{
            for(let i = 0; i <= filterElement.meals.length-1; i++){
              console.log(data.meals[i])

              modalHeader.classList.add('flex')
              modalHeader.style.justifyContent = 'space-between'

              modalTitle.textContent = data.meals[i].strMeal
              modalInstructions.textContent = data.meals[i].strInstructions
              modal.style.maxWidth = `100ch`
              modal.style.boxShadow = '0 0 1rem rgb(0 0 0 / .7)'
                       
              modalCloseBtn.textContent = 'close'.toUpperCase()
              modalCloseBtn.style.color = 'hsl(96, 25%, 51%)'
              modalCloseBtn.style.cursor = 'pointer'
              
              modalHeader.append(modalTitle)
              modalHeader.append(modalCloseBtn)
              modal.append(modalHeader)
              modal.append(modalInstructions)
              wrapper.append(modal)
              modal.showModal() 
            }            
          })
          .catch(err => `error is ${err}`)
    })
    
    body.addEventListener('click', ()=>{
      modal.close()
    })

    


    let mealTitle = document.createElement('h5')
    let mealImage = document.createElement('img')
        
    mealTitle.textContent = filterElement.meals[i].strMeal
    mealImage.src = filterElement.meals[i].strMealThumb

    // console.log(mealTitle)
    item.style.display = 'block'
    item.style.margin = '0'  

    recipeList.style.paddingBlock = '1.5rem'
    mealTitle.style.textAlign = 'center'
    recipeList.classList.add('grid')

    item.append(mealImage)
    item.append(mealTitle)
    recipeList.append(item)


   
  }

  

  // console.log(mealID)



  // let dbURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  // fetch(dbURL)
  //     .then(res => res.json())
  //     .then(data =>{
  //       console.log(data)
  //     })
  //     .catch(err => `error is ${err}`)

}


function randomQuote(){
  let arr = ['Buddy, please enter something valid.',
             'Do you wanna try that again?',
             'Wha-Seriously? You\'re going to leave it empty?',
             'My patience is running thin. Type something, will you?',
             'Please just enter \'apple\' or something. Okay?']

  // console.log(Math.floor(Math.random()*arr.length))
  return arr[Math.floor(Math.random()*arr.length)]
}

