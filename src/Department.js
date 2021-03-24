import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component{


    constructor(props){
        super(props);
        this.state={deps:[], addModalShow: false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'department')
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

    render(){
        const {deps, depid, depname} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow: false})
        return(
            <div>
                <Table className="mt-4" strinped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>DepartmentId</td>
                        <td>DepartmentName</td>
                        <td>Options</td>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key = {dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true.valueOf,
                                depid:dep.DepartmentId, depname: dep.DepartmentName})}>
                                    Edit
                                </Button>
                                <EditDepModal show ={this.state.editModalShow}
                                onHide={editModalClose}
                                depid= {depid}
                                depname= {depname}/>
                            </ButtonToolbar>
                            </td>
                        </tr>
                        
                        )}
                </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow: true})}>
                    Add Department</Button>
                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}