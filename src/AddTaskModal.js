import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap'
import { isArrayLiteralExpression } from 'typescript';

export class AddDepModal extends Component {

    constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleSubmit(event){
    console.log('submit called')
    fetch(process.env.REACT_APP_API + 'TodoItems', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            Name: event.target.Name.value,
            IsComplete: event.target.IsComplete.value
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Failed')
    })
}

render(){
    return(
    <div className= "container">
        <Modal {...this.props}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Task Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit = {this.handleSubmit}>
                            <Form.Group controlId= "Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="Name" required
                                placeholder = "Name"/>
                                </Form.Group>
                                <Form.Group controlId= "IsComplete">
                                <Form.Label>Completion Status</Form.Label>
                                <Form.Control type="text" name="IsComplete" required
                                placeholder = "IsComplete"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add To Do Items
                                    </Button>
                                </Form.Group>
                    </Form>
                    </Col>
                </Row>
         </Modal.Body>
         <Modal.Footer>
             <Button variant="danger" onClick={this.props.onHide}>Close</Button>
         </Modal.Footer>
            </Modal>
    </div>
    )
}


}