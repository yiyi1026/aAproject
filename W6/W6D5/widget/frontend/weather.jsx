import React from 'react';

class Weather extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      weather: '',
      name: ''
    };
    this.pollWeather = this.pollWeather.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  }

  pollWeather(pos){
    let crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    let starturl = 'http://api.openweathermap.org/data/2.5/weather?lat='
    let midurl = '&lon=';
    let thirdurl = '&&APPID=';
    const apikey = '35cc88bf712cf18e9eb24f6a7d08c4b9';
    let fahr = '&units=imperial';
    let url = starturl + latitude + midurl + longitude + fahr + thirdurl + apikey;
    this.request(url);
  }

  request(url){
    let that = this;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function(){
      if (request.status >= 200 && request.status < 400) {
        // Success!
        // console.log('Success');
        let resp = JSON.parse(request.responseText);
        let weather = resp.main.temp + ' degrees';
        let name = resp.name;
        // console.log(weather);
        // console.log(name);
        that.setState({weather: weather});
        that.setState({name: name});
      } else {
        console.log('Something is wrong for now.');
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();

    // };
  }




  render(){
    let content = this.state.weather;

    if (this.state.weather){
      content = <ul>
        <li className='weatherlocation'>{this.state.name}</li>
        <li className='weather_value'>{this.state.weather}</li>
      </ul>;
    }else{

      content = <ul>
        <li className='weather_value'>loading weather...</li>
      </ul>;
    }

    return (
      <div>
        <h1>Weather</h1>
        <div className="weather">
          <ul className='weather'>
            {content}
          </ul>

        </div>
        <br/>
      </div>

    );
  };
}

export default Weather;
