import React, { Component } from 'react';
import './details.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import axios from '../axios/axios';
import swal from 'sweetalert';

class WeatherDetails extends Component{
    state={
        Temperature:[],
        data:[],
        weather:[]
    }
    componentDidUpdate() {
        if(this.props.newLoc){
            if(this.state.data.length===0 || (this.state.data.length!==0 && this.state.data.name.toLowerCase() !== this.props.newLoc.toLowerCase())){
                axios.get("/weather?q=" +this.props.newLoc+"&appid=9eda28c50838d8cff40a8dab527644ec").then(result => {
                    console.log(result.data.weather[0].main);
                    
                  this.setState({Temperature:result.data.main,data:result.data,weather:result.data.weather[0]})
                }).then(response=>{
                    console.log(response);
                    
                }).catch(error=>{
                    console.log(error.response.data);
                    swal(error.response.data.message,error.response.data.cod, "error"); 
                })
            }
        }
       
      
      }

    render(){
       
        const date=new Date();
        console.log(date.toDateString());
        if(this.state.data.length!==0){
        return(
            <Card>
                <Card.Body>
            <Row style={{}}>
                <Col md='4'><h1>{Math.floor(this.state.Temperature.temp-273.15)}°C</h1></Col>
                <Col md='4'>
                    <h5>{this.state.data.name}</h5>
                    <div>{date.toDateString()}</div>
                </Col>
                <Col md='4'>
                    <img alt="wheaterNow" width="50" height="50" src={process.env.PUBLIC_URL+"/images/"+this.state.weather.main+".png"}></img>
                    <p>{this.state.weather.main}</p>
                </Col>
            </Row>
            <Row>
                <Col md='4'><h5>Humidity: {this.state.Temperature.humidity} % </h5></Col>
                <Col md='4'><h5>Wind Speed : {this.state.data.wind.speed} km/h</h5></Col>
               
            </Row>
            </Card.Body>
        </Card>
        )
        } else{
            return <div>show your city's weather details...</div>
        }
    }
}
export default WeatherDetails;