import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar, Row, Col} from 'react-bootstrap';
import {AddDepModal} from './AddTaskModal';
import {EditDepModal} from './EditDepModal';

export class TodoItems extends Component{


    constructor(props){
        super(props);
        this.state={deps:[], addModalShow: false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'TodoItems')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        })
    
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
fetch(process.env.REACT_APP_API+ `TodoItems/`+ depid,{
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
    }

    render(){
        const {deps, depid, depname, depisComplete} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow: false})
        return(
            <div>
        Weekly To Do List
        <Row className = "To Do Table">
        <div>
      <label htmlFor="table-search-bar" className="w-100">
        <span className="sr-only">Search This Data Table</span>
        <input
          id="table-search-bar"
          className="form-control form-control-sm"
          type="text"
          placeholder="Search"
        />
      </label>
    </div>
            <Col lg={{span: 10, offset: 1}} md={{span: 10, offset: 1}} >
                
                <Table className="mt-4" strinped bordered hover size="sm">
                <thead>
                    <tr>
                    <td colspan="6">Todo Task</td>
                    <td>Completed?</td>
                    <td>Adjust</td>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key = {dep.id}>
                            <td colspan="6">{dep.name}</td>
                            <td colspan="2">{dep.isComplete.toString()}</td>
                            <td colspan="2">  
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true.valueOf,
                                depid:dep.id, depname: dep.name, depisComplete: dep.isComplete})}>
                                    Edit
                                </Button>
                                <Button className="mr-2" variant="info"
                                onClick={()=>this.deleteDep(dep.id)}>
                                    Delete
                                </Button>
                                <EditDepModal show ={this.state.editModalShow}
                                onHide={editModalClose}
                                depid= {depid}
                                depname= {depname}
                                depisComplete= {depisComplete}/>
                            </ButtonToolbar>
                            </td>
                        </tr>
                        
                        )}
                </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow: true})}>
                    Add Task</Button>
                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </Col>
        </Row>
    </div>
        )
    }
}