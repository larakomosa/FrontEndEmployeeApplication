import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap'
import { isArrayLiteralExpression } from 'typescript';

export class EditDepModal extends Component {

    constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleSubmit(event){
    console.log('submit called')
    fetch(process.env.REACT_APP_API + 'department', {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            DepartmentId:event.target.DepartmentId.value,
            DepartmentName:event.target.DepartmentName.value
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
                                <Form.Control type="text" name="DepartmentId" required
                                disabled
                                defaultValue={this.props.depid}
                                placeholder = "DepartmentId"/>
                                </Form.Group>
                            <Form.Group controlId= "Task">
                                <Form.Label>Task</Form.Label>
                                <Form.Control type="text" name="Task" required
                                placeholder = "Task"/>
                                </Form.Group>
                                <Form.Group controlId= "CompletionStatus">
                                <Form.Label>CompletionStatus</Form.Label>
                                <Form.Control type="text" name="CompletionStatus" required
                                placeholder = "CompletionStatus"/>
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