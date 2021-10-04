import './App.css';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import React from 'react';
import settings from "./settings.json"


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      forcast : settings.WeatherStructure,
      isFetching : false,
      postleitzahl : ""
    };
    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.state.postleitzahl+ '&appid=' + settings.OpenWeatherApiKey)
        .then(response => response.json())
        .then(data => 
          this.setState({
            isFetching : false,
            forcast : data})
          ).catch(err =>
            console.log(err));
  }
  handleChange({target}){
    this.setState({
      [target.name]: target.value
    });
  }

  render(){
    if (this.state.hasError){
      return <h1>Something went wrong</h1>
    }
    return (
      <div class="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div>
            <HeaderLine></HeaderLine>
            </div>
            <form>
            <div>
            <Input type="text" placeholder="stadt" name="postleitzahl" value={this.state.postleitzahl} onChange={this.handleChange}/>
            <Button variant="contained" onClick={this.fetchWeather}>Search</Button>
            </div>
            </form>        
            <h3> 
              temp: {(this.state.forcast.main.temp -273).toFixed(2)} <br/>
              city: {this.state.forcast.name} <br/>
              sky: {this.state.forcast.weather[0].main}
            </h3>
      </div>
      
    );
  }


}

function HeaderLine(){
  return(
    <header class="App">
      <h1>Weather App</h1>
    </header>
  );
}
export default App;
