import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export class Department extends Component{


    constructor(props){
        super(props);
        this.state={deps:[]}
    }

    refreshList(){
        console.log('function called')
        fetch(process.env.REACT_APP_API + 'department')
        .then(response=>response.json())
        .then(data=>{
            console.log("data log", data)
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
        const {deps} = this.state;
        console.log(process.env.REACT_APP_API)
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
                            <td>Edit/Delete</td>
                        </tr>
                        
                        )}
                </tbody>
                </Table>
            </div>
        )
    }
}