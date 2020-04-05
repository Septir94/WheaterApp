import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col,Form,FormControl, Button } from "react-bootstrap";
import WeatherDetails from "../Component/WeatherDetails";
import ListCard from '../Component/ListCardLocation';
import axios from "../axios/axios";
import bg from './images/background.png';
import  './container.css';

export default class WeatherContainer extends Component {
  state = {
    countryChoose:'Jakarta',
    Temperature:[],
    data:[],
    weather:[],
    newLoc:'',
    locForPost:''
  };
  componentDidMount() {
    axios.get("/weather?q=" + this.state.countryChoose+"&appid=9eda28c50838d8cff40a8dab527644ec").then(result => {
        console.log(result.data);
        
      this.setState({Temperature:result.data.main,data:result.data,weather:result.data.weather[0]})
    })
  }
  locationChangeHandler=(e)=>{
    this.setState({newLoc:e.target.value})
  }
  SubmitLocHandler=()=>{
    this.setState({locForPost:this.state.newLoc})
  }
  render() {
   
    return (
      <div  style={{paddingLeft:'20px',backgroundImage:`url(${bg})`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',width:'1700px',height:'1000px'}}>
        <Row style={{paddingTop:'20px'}}>
          <Col>
          <h3><img alt="icon" width="35" height="35" src={process.env.PUBLIC_URL+"/images/logo.png"}></img>Due Weather</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" style={{marginBottom:'50px',marginTop:'50px'}}>
            <Form>
              <Form.Label>Find out about your city Weather</Form.Label>
            <FormControl style={{width:'700px'}} placeholder='Input Your City' onChange={this.locationChangeHandler}/>
            <Button onClick={this.SubmitLocHandler} className='btn btn-primary'>Search</Button>
            </Form>
            <Row>
              <Col md='12' style={{marginTop:'16px'}}>
            <WeatherDetails  newLoc={this.state.locForPost}/>
            </Col>
            </Row>
          </Col>
          <Col md="6" style={{marginBottom:'50px',marginTop:'50px'}}>
           <ListCard/>
          </Col>
        </Row>
      </div>
    );
  
  }

}
