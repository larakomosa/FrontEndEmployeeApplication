import React, {Component} from 'react';
import {EditDepModal} from './EditDepModal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {Grid, Button} from '@material-ui/core';
import './Home.css';
import blueGrey from '@material-ui/core/colors/blueGrey';



export class Home extends Component{
    state = {
        name: "",
        array: [], 
        editModalShow:false
      };

    handleInputChange = (name) => (event) => {
        this.setState({
            ...this.state.name,
          name: event.target.value
        });
        
        console.log('name', event.target.value)
      };

    SearchName(name){
        console.log ('searchDep', this.state.name)
        fetch(process.env.REACT_APP_API + `TodoItems/search?name=${this.state.name}`)
        .then(response => response.json())
      .then(responseData => {
        this.setState({
          array: responseData.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  SearchCompletion(name){
    console.log ('searchDep', this.state.name)
    fetch(process.env.REACT_APP_API + `TodoItems/search?isComplete=${this.state.name}`)
    .then(response => response.json())
  .then(responseData => {
    this.setState({
      array: responseData.data,
      loading: false
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
}

        
      render() {
        const {array} = this.state
        const {deps, depid, depname, depisComplete} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow: false})
       return (
            <>
              <Grid container spacing ={1}>
        <Grid item sm={2} md={2} lg={2}></Grid>
           <> <Grid item sm={8} md={8} lg={8}>
            <form>
                      <TextField style={{marginBottom: "15px"}} fullWidth placeholder="Search for ..." id="outlined-basic" label="Search For.... " variant="outlined" 
                      value={this.state.name}
                      onChange={this.handleInputChange('name')}
                    />
                    <Button className= "Edit" variant="contained" color="secondary" size="small" style={{marginBottom: "15px", fontFamily: "nerko one", color: "white", fontWeight:"bold"}} onClick={() => this.SearchName()}>Search By Name</Button>&nbsp;&nbsp;
                    <Button className= "Edit" variant="contained" color="secondary" size="small" style={{marginBottom: "15px", fontFamily: "nerko one", color: "white", fontWeight:"bold"}} onClick={() => this.SearchCompletion()}>Search By Completion Status</Button>
            
                  </form>
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
        <TableBody>
        {array.map(dep=>
            <TableRow key={dep.id}>
              <TableCell style= {{fontFamily: "nunito", color: blueGrey['700'], fontWeight:"bold"}} component="th" scope="row">
                {dep.name}
              </TableCell>
              <TableCell style= {{fontFamily: "nunito", color: blueGrey['700'], fontWeight:"bold"}} align="right">{dep.isComplete.toString()}</TableCell>
              <TableCell>
              <Button className= "Edit" variant="contained"  size="small" style={{backgroundColor: blueGrey['700'], fontFamily: "nerko one", color: "white", fontWeight:"bold"}}
              onClick={()=>this.setState({editModalShow:true.valueOf,
              depid:dep.id, depname: dep.name, depisComplete: dep.isComplete})}>
                  Edit
              </Button>
              &nbsp;
              <Button className= "Edit" variant="contained" size="small" style={{backgroundColor: blueGrey['700'], fontFamily: "nerko one", color: "white", fontWeight:"bold"}}
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
     </Grid></>
  <Grid item sm={2} md={2} lg={2}></Grid>
</Grid>
                 </>            
                )}}
            
export default Home;   

   