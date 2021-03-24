import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap'

export class addDepModal extends Component {

    constructor(props){
    super(props);
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
                    Add Department
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit = {this.handleSubmit}>
                            <Form.Group controlId= "DepartmentName">
                                <Form.Label>DepartmentName</Form.Label>
                                <Form.Control type="text" name="DepartmentName" required
                                placeholder = "DepartmentName"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Department
                                    </Button>
                                </Form.Group>
                    </Form>
                    </Col>
                </Row>
         </Modal.Body>
            </Modal>
    </div>
    )
}


}