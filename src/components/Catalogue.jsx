import React, { Component } from 'react';
import Table from "./Table";
import { makeStyles } from '@material-ui/core/styles';
 
class Catalogue extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      data: [],
      excelRows: [],
      showResults: false,
      page: 'Home'
    }
  };
  async componentDidMount() {
    
  }

  render() {
    const classes = makeStyles((theme) => ({
        toolbar: theme.mixins.toolbar,
        content: {
          flexGrow: 1,
          padding: theme.spacing(3),
          flex:1
        },
      }));
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div style={{flex:1, height:'100%', width:'100%'}}>
            <div >
            <Table ref={this.inputRef} />
            </div>
        </div>
      </main>
    );
  };
}

export default Catalogue;