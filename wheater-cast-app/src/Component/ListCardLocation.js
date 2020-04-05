import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './CardLocation';
import { Row,Col, Form, Button ,FormControl} from 'react-bootstrap';
import axios from '../axios/axios';
import swal from 'sweetalert';


class ListCardLocation extends Component{
    state={
        locations:[],
        changeLoc:undefined,
        loc:undefined
    }
    componentDidUpdate(){
        if(this.state.loc){
            if(this.state.locations.length===0 || (this.state.locations.length>0 && this.state.locations.findIndex(item=>{return item.country.toLowerCase()===this.state.loc.toLowerCase()})===-1)){
                axios.get("/weather?q=" +this.state.loc+"&appid=9eda28c50838d8cff40a8dab527644ec").then(result => {
                    console.log(result.data.name);  
                    console.log(this.state.locations);
                    this.setState({locations:this.state.locations.concat({country:result.data.name,temp:result.data.main.temp,detail:result.data.weather[0].main})})
                }).then(response=>{
                    console.log(response);
                    
                }).catch(e=>{
                    console.log(e.response.data.message);
                    swal(e.response.data.message,e.response.data.cod, "error"); 
                    
                })
            }
        }
            
        
    }

    cityChangeHandler=(event)=>{
        const value=event.target.value;
        this.setState({changeLoc:value});
    }
    weatherHandler=()=>{
        let newLoc=this.state.changeLoc;
        this.setState({loc:newLoc})
    }
    deleteHandler=(name)=>{
        let newLocations=this.state.locations.filter((item)=>{
            return item.country.toLowerCase() !== name.toLowerCase();
        })
        this.setState({locations:newLocations})
        
        
    }
    render(){
        const listCard=this.state.locations.map((item)=>{
            return <Card Country={item.country} temp={Math.floor(item.temp-273.15)} img={item.detail} details={item.detail} deleteHandler={()=>{this.deleteHandler(item.country)}} />
        })
        return(
            <div>
        <Row className='justify-content-center'>
         <Col md='8'>
             <Form>
             <Form.Label>Compare Cities's weather here!!</Form.Label>
         <FormControl style={{width:'600px'}} placeholder='City you want to show?' onChange={this.cityChangeHandler}/>
         <Button className='btn btn-primary' onClick={this.weatherHandler}>Add Weather Card</Button>
         </Form>
         </Col>
        </Row>
        <Row>
            {listCard}
        </Row>
        </div>
        )
    }
}
export default ListCardLocation;