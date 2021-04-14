import React, {Component} from 'react';
import {Button, ButtonToolbar, Row, Col} from 'react-bootstrap';
import {AddDepModal} from './AddTaskModal';
import {EditDepModal} from './EditDepModal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        return(<>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Todo Item (100g serving)</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Adjust Item&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {deps.map(dep=>
            <TableRow key={dep.id}>
              <TableCell component="th" scope="row">
                {dep.name}
              </TableCell>
              <TableCell align="right">{dep.isComplete.toString()}</TableCell>
              <TableCell>
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
          </TableCell>
        </TableRow>
        )}
     </TableBody>
     </Table>
     </TableContainer>
      <ButtonToolbar>
      <Button variant='primary'
      onClick={()=>this.setState({addModalShow: true})}>
      Add Task</Button>
      <AddDepModal show={this.state.addModalShow}
      onHide={addModalClose}/>
  </ButtonToolbar>
  </>
  );}}

  export default TodoItems;  