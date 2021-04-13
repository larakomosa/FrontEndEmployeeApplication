import React, {Component} from 'react';
import {Button, ButtonToolbar, Row, Col} from 'react-bootstrap';


export class Home extends Component{
    state = {
        name: ""
      };


    handleInputChange = (name) => (event) => {
        this.setState({
            ...this.state.name,
          name: event.target.value
        });
        
        console.log('name', event.target.value)
      };

    SearchDep(name){
        fetch(process.env.REACT_APP_API + `TodoItems/search?name`+ this.state.name)
        console.log('search name', this.state.name)
            .then(response=>response.json());
  
        }
     

            
              render() {
                return (
                  <form>
                    <input
                      placeholder="Search for..."
                      value={this.state.name}
                      onChange={this.handleInputChange('name')}
                    />
                    <Button onClick ={this.SearchDep('name')}>Search</Button>
                    <p>{this.state.query}</p>
                  </form>
                );
              }
            }
            
            export default Home;   

   