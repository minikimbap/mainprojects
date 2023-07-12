//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

let maxTemperatures = document.querySelectorAll('.temp') 
let tableName = document.querySelectorAll('.table__name')


function getFetch(click){
  const choice = document.querySelector('input').value
  console.log(choice)
  const keyUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=8MkIhsqRtTxiPLLKo3os35GA9j9ZEGdR&q=${choice}`
  

  fetch(keyUrl)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        // console.log(data)
        let locationKey = data[0].Key
        const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=W3pVxg8UN1IeGeg6ebn0hHDaoFbiSuyB&details=false`
        
        
        fetch(forecastUrl)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)                   

              let arr = data.DailyForecasts
              console.log(arr)
              let headlines = data.Headline.Text
              document.querySelector('h3').textContent = '(' + headlines +')'

              // if(headlines.includes === 'Thunderstorms'){
                // document.body.style.background = 'url("https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://images.pexels.com/lib/api/island-during-golden-hour-and-upcoming-storm-1118873.png"'
                
              // }

              fetch("https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://wallhaven.cc/api/v1/search?q=thunderstorm")
              .then(res => res.json())
              .then(data => {
                
                console.log(data.data[1].path)
                
                if(headlines.includes('thunder')||headlines.includes('Thunder')){
                  document.querySelector('img').src = data.data[4].path
                  document.querySelector('img').classList.add('fade')
                }
                else{
                  document.querySelector('img').src = data.data[16].path
                  document.querySelector('img').classList.add('fade')
                }
                
                
              })
              .catch(err => console.log(`Error is ${err}`))

              document.querySelector('img').classList.remove('fade')


              // Array.from(tableName).forEach(e => e.style.borderBottom = '1px solid white')
              document.querySelector('.line').width = '100%'
              document.querySelector('.line').style.marginTop = '1rem'
              document.querySelector('.line').style.borderBottom = '1px solid white'
              
              arr.map((e,i) =>{
                console.log(e.Temperature.Maximum.Value + ' ' + data.DailyForecasts[0].Temperature.Maximum.Unit)
                
                Array.from(maxTemperatures).forEach((element,index) =>{
                  
                  if(index === i){
                    element.textContent = e.Temperature.Maximum.Value + data.DailyForecasts[0].Temperature.Maximum.Unit 
                    
                  }
                  
                })
                
              })
              
            })
            .catch(err => {
                console.log(`error ${err}`)
        });
      })
      .catch(err => {
          console.log(`error ${err}`)
  });
}


