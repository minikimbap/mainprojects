//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

const button = document.querySelector('button')

button.addEventListener('click', getFetch)

function getFetch(){
  const date = document.querySelector('input').value
  const apiKey = '4GJ3LsdYe8adzKFp6rrNxD3nSejEARUiPPGcATNC'
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
  // let url = ``
  fetch(url)
        .then(res => res.json())
        .then(data =>{
          console.log(date)
          console.log(data.title)
          document.querySelector('h2').textContent = data.title
          
          document.querySelector('h3').textContent = data.explanation
          if(data.media_type === 'video'){
            // document.querySelector('img').src = ''
            document.querySelector('img').style.display = 'none'
            document.querySelector('iframe').style.display = 'block'
            document.querySelector('iframe').src = data.url
            document.querySelector('iframe').style.borderRadius = '10px'
          }
          else{
            // document.querySelector('iframe').src = ''
            document.querySelector('iframe').style.display = 'none'
            document.querySelector('img').style.display = 'block'
            document.querySelector('img').src = data.hdurl
            document.querySelector('img').style.borderRadius = '15px'

          }
          
        })
        .catch(err => console.log(`error is ${err}`))
}

getFetch()