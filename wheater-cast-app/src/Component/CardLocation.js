import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

class ListLocation extends Component{

    render(){
        const date=new Date();
        return(
            
            <Card style={{textAlign:'center',margin:'10px'}}>
                <Card.Title>{this.props.Country}</Card.Title>
                <Card.Body><img alt="wheaterNow" width="50" height="50" src={process.env.PUBLIC_URL+"/images/"+this.props.img+".png"}></img></Card.Body>
                <Card.Body>{this.props.temp} °C</Card.Body>
                <Card.Body>{this.props.details}</Card.Body>
                <Card.Body>{date.toDateString()}</Card.Body>
                <Card.Body><button className='btn btn-danger' onClick={this.props.deleteHandler}>delete</button></Card.Body>
            </Card>
        )

    }
}

export default ListLocation;