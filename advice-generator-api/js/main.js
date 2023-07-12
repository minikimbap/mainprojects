
let url = `https://api.adviceslip.com/advice`

function fetchData(){
  fetch(url, callback)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => console.log(`error ${err}`))
}

function callback(advices){
  document.querySelector('span').innerText = advices.slip.id
  document.querySelector('p').innerText = advices.slip.advice
}

fetchData(callback)

document.querySelector('button').addEventListener('click', fetchData)


//---------------reference to understand the concept-----------//

// function greet(){
//   console.log(`hello mini`)
// }

// function outputing(callback){
//   console.log('please enter name:')
//   callback()
// }

// outputing(greet)