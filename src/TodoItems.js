import React, {Component} from 'react';
import {AddDepModal} from './AddTaskModal';
import {EditDepModal} from './EditDepModal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Grid, Button} from '@material-ui/core';
import './TodoItems.css'

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
        <Grid container spacing ={1}>
        <Grid item sm={2} md={2} lg={2}></Grid>
            <Grid item sm={8} md={8} lg={8}>
    <TableContainer>
      <Table aria-label="customized table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Todo Item</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="left">Adjust Item&nbsp;</TableCell>
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
              <Button className= "Edit" variant="contained" color="primary" size="small"
              onClick={()=>this.setState({editModalShow:true.valueOf,
              depid:dep.id, depname: dep.name, depisComplete: dep.isComplete})}>
                  Edit
              </Button>
              
              <Button variant="contained" color="primary" size="small"
              onClick={()=>this.deleteDep(dep.id)}>
                  Delete
              </Button>
              <EditDepModal show ={this.state.editModalShow}
              onHide={editModalClose}
              depid= {depid}
              depname= {depname}
              depisComplete= {depisComplete}/>
          </TableCell>
        </TableRow>
        )}
     </TableBody>
     </Table>
     </TableContainer>
  </Grid>
  <Grid item sm={2} md={2} lg={2}></Grid>
</Grid>
  );}}

  export default TodoItems;  