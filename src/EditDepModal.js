import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap'
import { isArrayLiteralExpression } from 'typescript';

export class EditDepModal extends Component {

    constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.state={isComplete: false}
}

toggle=()=> {
    if (this.props.depisComplete=== true){
        return (
            <p>Yes</p>
        );
    } else {
        return (<p>No</p>)
    }
}

handleSubmit(event){
    console.log('submit called')
    console.log(event.target.id.value, event.target.isComplete.value, event.target.name.value)
    fetch(process.env.REACT_APP_API + 'TodoItems', {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            Id: event.target.id.value,
            Name: event.target.name.value,
            IsComplete: event.target.isComplete.value
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
                    Update Department
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit = {this.handleSubmit}>
                        <Form.Group controlId= "DepartmentId">
                                <Form.Label>Todo Id</Form.Label>
                                <Form.Control type="text" name="id" required
                                disabled
                                defaultValue={this.props.depid}
                                placeholder = "Id"/>
                                </Form.Group>
                            <Form.Group controlId= "Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" required
                                placeholder = {this.props.depname}/>
                                </Form.Group>
                                <Form.Group controlId= "IsComplete">
                                <Form.Label>CompletionStatus</Form.Label>
                                <Form.Control type="text" name="isComplete" required
                                placeholder = {this.toggle}/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Todo Items
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