import React, {Component} from 'react';
import {Button, ButtonToolbar, Row, Col} from 'react-bootstrap';
import {EditDepModal} from './EditDepModal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

    SearchDep(name){
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

        
        render() {
            const {array} = this.state;
        console.log(array)

                return (
                  <><form>
                    <input
                      placeholder="Search for..."
                      value={this.state.name}
                      onChange={this.handleInputChange('name')}
                    />
                    <Button onClick={() => this.SearchDep()}>Search</Button>
                    <p>{this.state.deps}</p>
                  </form>
                  <TableBody>
        {array.map(object=>
            <TableRow key={object.id}>
              <TableCell component="th" scope="row">
                {object.name}
              </TableCell>
              <TableCell align="right">{object.isComplete.toString()}</TableCell>
        </TableRow>
        )}
     </TableBody>
                 </>
            
                )}}
            
            export default Home;   

   