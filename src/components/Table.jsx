import React, { Component } from "react";
import { forwardRef } from "react";
import MaterialTable from 'material-table';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@material-ui/core/Typography';

import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Chip from '@material-ui/core/Chip';

import Avatar from '@material-ui/core/Avatar';
import { ContactlessOutlined } from "@material-ui/icons";

class MaterialTableDemo extends Component {
  constructor(props) {
    super();
    this.tableRef = React.createRef();
    this.state = {
      excelRows: props.data,
      modal_open: false,
      curIndex: -1,
      selectedItem: [],
      collapseState: 'All Expand',
      constPathColors : {
        1: 'rgb(0 0 0 / 5%)',
        2: 'rgb(0 0 0 / 4%)',
        3: 'rgb(0 0 0 / 3%)',
        4: 'rgb(0 0 0 / 0%)'
      },
      currentID: '',
      teamList: []//[{ name: "DC Supply", status: true }, { name: "Hospital Supply", status: true }, { name: "Hospital Procurement Directors", status: true }]
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen = (state) => {
    this.setState({ modal_open: state });
  }

  handleClose = () => {
    this.setOpen(false);
  };
  handleOpen = (e) => {
    this.setOpen(true);
    var index = e.target.getAttribute("data-index");
    if (typeof index === 'undefined' || index === null) {
      index = e.target.parentElement.getAttribute("data-index");
    }
    this.setState({ selectedItem: this.state.excelRows[index] });
  };

  allCollapseFunc = (e) =>{
    var arrBuf = this.state.excelRows;
    this.setState({ excelRows: [] });
    this.setState({ excelRows: arrBuf });
  }

  componentDidMount() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btn_close");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  closeModalOk = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";    
  }

  

  render() {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////// 
    // Handling catalogue json data
    ///////////////////////////////////////////////////////////////////////////////////////////////////////// 
    let rawData = require("./../assets/data/catalgoue1.json");
    let rawDataArray = rawData.Sheet1;
    let rowsData = new Array();
    let rowsData1 = new Array();
    //Function 1 - Phases
    const getPhases = () => {
      var uniqueData = rawDataArray.filter(function (a) {
        var key = a.ID1;
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, Object.create(null));
      for (var i = 0; i < uniqueData.length; i++) {
        rowsData.push({
          id: uniqueData[i].ID1, // MAIN ELEMENT
          name: uniqueData[i].Phase,
          type: "Phase"
        });
      }
    };

    //Function 2 - Services
    const getServices = () => {
      let uniqueData = rawDataArray.filter(function (a) {
        var key = a.ID1 + "|" + a.ID2;
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, Object.create(null));
      for (var i = 0; i < uniqueData.length; i++) {
        let currentID =
          String(uniqueData[i].ID1) + "." + String(uniqueData[i].ID2);
        let parentID = String(uniqueData[i].ID1);
        rowsData.push({
          id: currentID, // MAIN ELEMENT
          name: uniqueData[i].Service,
          type: "Service",
          parentId: parentID
        });
      }
    };

    //Function 3 - Activity
    const getActivities = () => {
      let uniqueData = rawDataArray.filter(function (a) {
        var key = a.ID1 + "|" + a.ID2 + "|" + a.ID3;
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, Object.create(null));
      for (var i = 0; i < uniqueData.length; i++) {
        let currentID =
          String(uniqueData[i].ID1) +
          "." +
          String(uniqueData[i].ID2) +
          "." +
          String(uniqueData[i].ID3);
        let parentID =
          String(uniqueData[i].ID1) +"."+ String(uniqueData[i].ID2);
        rowsData.push({
          id: currentID, // MAIN ELEMENT
          name: uniqueData[i].Activity,
          Phase: uniqueData[i].Phase,
          Service: uniqueData[i].Service,
          Activity: uniqueData[i].Activity,
          Description: uniqueData[i].Description,
          Team: uniqueData[i].Team,
          type: "Activity",
          parentId: parentID
        });
      }
    };

    const arrangeRows = () =>{
      var childlist = [];
      var rowsBuf = [];
      var rowsBuf2 = [];
      //deep1
      for(var i = 0;i<rowsData.length;i++){
        if(rowsData[i].type!='Phase')
          continue;
        childlist = [];
        for(var j = i+1;j<rowsData.length;j++){
          if(rowsData[i].id==rowsData[j].parentId)
            childlist.push(rowsData[j]);
        }
        rowsBuf.push(rowsData[i]);
        if(childlist.length>0)
        {
          childlist.filter(function(item){
            rowsBuf.push(item);  
          });
        }
      }
      //deep3
      var index = 0;
      for(var i = 0;i<rowsBuf.length;i++){
        childlist = [];
        var itemBuf=rowsBuf[i];
        rowsBuf2.push(itemBuf); 
        if(rowsBuf[i].type=='Service')
        {
          for(var j = 0;j<rowsData.length;j++){
            if(rowsBuf[i].id==rowsData[j].parentId)
              childlist.push(rowsData[j]);
          }
          if(childlist.length>0)
          {
            childlist.filter(function(item){
              itemBuf=item;
              rowsBuf2.push(itemBuf); 
            });
          }
        }
      }
      rowsData=rowsBuf2;
    }
    getPhases();
    getServices();
    getActivities();
    arrangeRows();
   

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
   
    return (
      <div>
        <Button onClick={this.allCollapseFunc} variant="contained" style={{float:'right'}} color="secondary">All Collapse</Button>
        <MaterialTable
          tableRef={this.tableRef}
          title="P&SC Service Catalogue"
          icons={tableIcons}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          columns={[
            {
              field: "id",
              title: "ID",
              width: 100,
            },
            {
              field: "type",
              width: 120,
              render: (rowData) => {
                let character = rowData.type.substring(0,1)
                let chipColour = "rgb(245,205,102)";
                if(rowData.type == "Phase") { chipColour = "#f44336" };
                if(rowData.type == "Service") { chipColour = "#2196f3" };
                return(
                  <Chip
                    variant="outlined"
                    size="medium"
                    label={rowData.type}
                    avatar={<Avatar style={{color:"white", backgroundColor:chipColour}}>{character}</Avatar>}
                    style={{color:chipColour}}
                  />  
                )
              }
            },
            {
              field: "name",
              title: "Description"
            },
            {
              field: "team",
              title: "Team",
              width: 200,
            },
            {
              title: "",
              width: 100,
              render: (rowData) => {
                if(rowData.type == 'Activity') {
                    return(
                        <Chip
                            size="medium"     
                            onClick={() => { 
                              document.getElementById("myModal").style.display = "block"
                            }}
                            label="View"
                            icon={<PageviewOutlinedIcon />}/>
                    )
                }
              }
            },
          ]}
          data={rowsData}          
          parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}          
          options={{
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(59,64,72,0.9)",
              color: "#FFF",
              fontSize: "17px",
            },
            selection: false,
            rowStyle: rowData => {
              if(rowData.tableData.isTreeExpanded === false && rowData.tableData.path.length === 1) {
                return {};
              }
              const rowBackgroundColor =this.state.constPathColors[rowData.tableData.path.length];
              return {backgroundColor: rowBackgroundColor};
            }
          }}
          onRowClick={(event, rowData, togglePanel) =>  (
            console.log(event.target),
            rowData.type === "Activity" && (document.getElementById("myModal").style.display = "block",
            document.getElementById('m_current').innerHTML= 'Task - '+rowData.id,
            document.getElementById('m_phase').innerHTML= rowData.Phase,
            document.getElementById('m_service').innerHTML= rowData.Service,
            document.getElementById('m_activity').innerHTML= rowData.Activity,
            document.getElementById('m_activity1').innerHTML= rowData.Activity,
            document.getElementById('m_description').innerHTML= rowData.Description,
            document.getElementById('m_team').innerHTML= rowData.Team,
            document.getElementById('m_artefact').innerHTML= rowData.Activity 
          ))
          }
        />
        <div id="myModal" className="modal">
          <div className="modal-content" style={{borderRadius:'10px', padding:'20px'}}>
            <div style={{flex:1, textAlign:'center'}}>
              <Typography variant="h5" id="m_activity1">
                {this.state.activity}
              </Typography> 
              <Typography variant="subtitle2" id="m_current">
                Task - {this.state.currentID}
              </Typography> 
            </div>
            <div style={{flex:1, display:'flex', flexDirection:'row', padding:20}}>
              <div style={{flex:1}}>
                <table className="taskTable">
                  <tbody>
                    <tr><td>Phase</td><td id="m_phase">{this.state.phase}</td></tr>
                    <tr><td>Service</td><td id="m_service">{this.state.service}</td></tr>
                    <tr><td>Activity</td><td id="m_activity">{this.state.activity}</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{flex:1}}>
                <table className="taskTable">
                  <tbody>
                    <tr><td>Team</td><td id="m_team">{this.state.team}</td></tr>
                    <tr><td>Artefacts</td><td id="m_artefact">{this.state.artefact}</td></tr>
                  </tbody>
                </table>                
              </div>
            </div>

            <div style={{flex:1, padding:20, paddingTop:0}}>
                <table className="taskDescriptionTable" style={{width:'100%'}}>
                  <tbody>
                    <tr><td>Task description</td></tr>
                    <tr><td id="m_description">{this.state.description}</td></tr>
                  </tbody>
                </table>
            </div>
            
            <div align="center">              
              <Button
                  variant="contained"
                  style={{backgroundColor:"rgb(59,64,72)", color:"white"}}
                  size="large"
                  onClick={() => { this.closeModalOk() }}                
                  startIcon={<CheckCircleOutlineOutlinedIcon />}>
                  Ok
              </Button>
            </div>
          </div>
        </div>
      </div >
    )
  };
}
export default MaterialTableDemo;
