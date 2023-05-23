// console.log("from script file");

const mini = document.querySelector('button')
const deleteDrinks = document.querySelector('.delete-drinks')
const list = document.querySelector('.list')
const getDrinks = document.querySelector('.get-drinks')
const drinksList = document.querySelector('.drinksList')
const oldInputValue = document.querySelector('input').value



getDrinks.addEventListener('click', getDrink)


function getDrink(){
  let drink = document.querySelector('input').value
  // if(drink !== ''){
  
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`, callback)
  .then(response => response.json())
  .then(data => callback(data))   
 
  .catch(err => console.log(`error: ${err}`))
// }
}

function callback(data){    
    if(list.children.length === 0){
      
      for(let i=0; i<= data.drinks.length-1; i++){
        let unit = document.createElement('div')
        let item = document.createElement('h3')
        let itemImage = document.createElement('img')

        unit.setAttribute('class', 'delete')

        item.textContent = data.drinks[i].strDrink
        item.style.fontSize = '.5rem'
        item.style.textAlign = 'center'

        itemImage.src = data.drinks[i].strDrinkThumb
        
       
        
        unit.appendChild(itemImage)
        unit.appendChild(item)
        list.append(unit)
        
        carousel()
       }
       
      
    }
    else{
      let newInputValue = document.querySelector('input').value
      if(newInputValue !== oldInputValue){
        
        //if new input is entered the old list is deleted
        deleteDrink()

        //check if list i empty, if it's empty then add next searched list else no changes occur
        if(list.children.length === 0){
          for(let i=0; i<= data.drinks.length-1; i++){
            let unit = document.createElement('div')
            let item = document.createElement('h3')
            let itemImage = document.createElement('img')

            unit.setAttribute('class', 'delete')

            item.textContent = data.drinks[i].strDrink
            item.style.fontSize = '.5rem'
            item.style.textAlign = 'center'
            
            itemImage.src = data.drinks[i].strDrinkThumb

            unit.appendChild(itemImage)
            unit.appendChild(item)
            list.append(unit)

            carousel()
           }
           
        }
      }

    }

   
}

function carousel(){
  const carousel = document.querySelector('.delete')
  const carouselItems = document.querySelectorAll('.delete > *')
  const carouselWidth = carousel.clientWidth
  let currentPosition = 0;
  const interval = 1000;

  setInterval(()=>{
    currentPosition = (currentPosition + carouselWidth) % (carouselWidth * carouselItems.length)
    carouselItems.forEach(e => {
      e.style.transform = `translateX(-${currentPosition}px)`
    })
    
  }, interval)
}

function deleteDrink(){
  let toDelete = document.querySelectorAll('.delete')
  console.log(toDelete)
  toDelete.forEach(e => {
    list.removeChild(e)
  })
}


getDrink(callback)

