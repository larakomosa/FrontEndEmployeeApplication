import React, {Component} from 'react';
import {AddTaskModal} from './AddTaskModal';
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
import blueGrey from '@material-ui/core/colors/blueGrey';


export class TodoItems extends Component{


    constructor(props){
        super(props);
        this.state={deps:[], addModalShow: false, editModalShow:false, isComplete: false}
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
        <TableHead style={{
    backgroundColor: blueGrey['700'],
    color: "white",
    fontFamily: 'nunito',
  }}>
          <TableRow>
            <TableCell  style={{fontFamily: "nerko one", color: "white", fontWeight:"bold"}}>Todo Item</TableCell>
            <TableCell style={{fontFamily: "nerko one", color: "white", fontWeight:"bold"}}align="right">Completed</TableCell>
            <TableCell style={{fontFamily: "nerko one", color: "white", fontWeight:"bold"}} align="left">Adjust Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style = {{marginBottom: '20px'}}>
        {deps.map(dep=>
            <TableRow key={dep.id}>
              <TableCell style={{fontFamily: "nunito", color: blueGrey['700'], fontWeight:"bold"}} component="th" scope="row">
                {dep.name}
              </TableCell>
              <TableCell style= {{fontFamily: "nunito", color: blueGrey['700'], fontWeight:"bold"}} align="right">
                {dep.isComplete.toString()}</TableCell>
              <TableCell>
              <Button className= "Edit" variant="contained" color="secondary" size="small" style={{fontFamily: "nerko one", color: "white", fontWeight:"bold"}}
              onClick={()=>this.setState({editModalShow:true.valueOf,
              depid:dep.id, depname: dep.name, depisComplete: dep.isComplete})}>
                  Edit
              </Button>
              &nbsp;
              <Button className= "Edit" variant="contained" color="secondary" size="small" style={{fontFamily: "nerko one", color: "white", fontWeight:"bold"}}
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

                    <Button variant="contained" style={{color: "white", backgroundColor: blueGrey['700'], fontFamily: "nerko one", color: "white", fontWeight:"bold"}} size="small"
                    onClick={()=>this.setState({addModalShow: true})}>
                    Add Another Task</Button>
                    <AddTaskModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                
  </Grid>
  <Grid item sm={2} md={2} lg={2}></Grid>
</Grid>

  );}}

  export default TodoItems;  