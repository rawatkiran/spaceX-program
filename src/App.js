import './App.css';
import React from "react";
import querystring from 'querystring';
import LaunchDetails from "./components/LaunchDetails"
import loader from './loader.gif';

const API_BASE_URL = "https://api.spaceXdata.com/v3/launches?limit=100";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      }
    }
  }
  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }
  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }
  componentDidMount(){
    this.fetchAPI(this.state.filters);
  }
   updateApiFilters(type, value) {
    if (this.state.filters[type] === value) {
      value = undefined;
    }
    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }
  render(){
    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);
  if(!isLoaded){
     return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
  }
  return (
    <div className="App" >
      <h2 className="App-header">SpaceX Launch Programs</h2>
      <div style={{display:"flex",flexDirection:'row',width:window.innerWidth}}>
        <div style={{height:"max-content",backgroundColor:"white",marginLeft:15,padding:10}}>
          <div style={{fontWeight:"bold"}}>Filters</div>
          <div style={{textAlign:'center'}}>
            Launch Year
            <hr></hr>
            <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",padding:2,justifyContent:"space-around"}}>
              {uniqueLaunchYears.map((year,i)=>(
                <button  key={i} className="Button-block" value={year}
                onClick={(e) => this.updateApiFilters("launch_year",e.target.value)}
                >{year}</button>
              ))}
            </div>
          </div>
          <div style={{textAlign:'center'}}>
             Successful Launch
             <hr></hr>
            <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",padding:2,justifyContent:"space-around"}}>
                <button className="Button-block" value="true"
                onClick={(e) => this.updateApiFilters("launch_success",e.target.value)}>
                  True
                </button>
                <button className="Button-block" value="false" onClick={(e) => this.updateApiFilters("launch_success",e.target.value)}>
                  False
                </button>
            </div>
          </div>
          <div style={{textAlign:'center'}}>
            Successful Landing
            <hr></hr>
            <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",padding:2,justifyContent:"space-around"}}>
                <button className="Button-block" value="true" onClick={(e) => this.updateApiFilters("land_success",e.target.value)}>
                  True
                </button>
                <button className="Button-block" valur="false" onClick={(e) => this.updateApiFilters("land_success",e.target.value)}>
                  False
                </button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",padding:15,paddingTop:0,width:"450%"}}>
             {data.map((details) => {
                    return (
                      <div className="block">
                        <LaunchDetails details={details} />
                      </div>
                    );
                  })}
        </div>
      </div>
      <div>
         <h5 className="App-Developers-name">
            Developed by : Kiran Rawat 
         </h5>
      </div>
    </div>
  );
 }
}

export default App;
