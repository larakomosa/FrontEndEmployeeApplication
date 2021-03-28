import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
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

    render(){
        const {deps, depid, depname, depisComplete} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow: false})
        return(
            <div>
                <Table className="mt-4" strinped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Completion Stations</td>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key = {dep.Id}>
                            <td>{dep.name}</td>
                            <td>{dep.isComplete}</td>
                            <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true.valueOf,
                                depid:dep.id, depname: dep.name, depisComplete: dep.isComplete})}>
                                    Edit
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
                    Add Department</Button>
                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}