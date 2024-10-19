import React, { Fragment, useState, useRef, useEffect } from "react";

// import { styled, withStyles } from "@mui/styles";
import './home.css';
import { styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
//import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import minCashFlow from "./script";

var fianlAns = [];
var personColumn = [];
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  // useEffect(() => {
  //   const input = document.querySelector('.your-input-class'); 
  //   if (input) {
  //     input.style.backgroundColor = 'white';
  //   }
  // }, []);
  
  borderRadius: 4,
  position: "relative",
  backgroundColor: 'white', // Set to white
  border: "1px solid #ced4da", // Border color for visibility
  fontSize: 16,
  width: "60%",
  padding: "5px 6px",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  marginTop: theme.spacing(3),
  "&:focus": {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}));

const buttonStyle = {
  backgroundColor: "white",
  border: "1px solid rgb(255, 255, 255)",
  borderRadius: 2,
  color: "#ff7366",
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: 'inherit',
  fontWeight: 800,
  padding: "5px 8px 5px 8px",
  ':hover': {
    cursor: 'pointer',
    backgroundColor: "#ffff9b",
    color: "#fd0808"
  }
};

export default function DataTabelVariable() {
  // Table
  const classes = useStyles();
  const [rowValue, setRowValue] = useState(0);
  const [columnsValue, setColumnsValue] = useState(0);
  const [tableCellsData, setTableCellsData] = useState();
  const [tableArrayData] = useState([[]]);
  const ref = useRef(null);
  const [showResult, setShowResult] = useState(false);


  const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
    return `${rowNum}-${columnNum}`;
  };

  //   useEffect(() => {
  //     // console.log(tableArrayData);
  //     getDataDictionary(tableArrayData);
  //   }, [tableCellsData]);

  //   const getDataDictionary = (data) => {
  //     const headers = data[0];
  //     let dictionary = [];

  //     for (let i = 0; i < data.length; i++) {
  //       let object = {};
  //       for (let j = 0; j < data[i].length; j++) {
  //           if (i == j)
  //             data[i][j] = 0;
  //         object[headers[j]] = data[i][j];
  //       }
  //       dictionary.push(object);
  //     }

  // console.log(dictionary);
  //     return dictionary;
  //   };

  // const onChangeHandler = (e) => {
  //   let [row, col] = e.target.name.split("-");
  //   if (row === col) {
  //       e.target.value = 0;
  //   }
  //   console.log(e.target.name, e.target.value);
  //   setTableCellsData({
  //     ...tableCellsData,
  //     [e.target.name]: e.target.value
  //   });
  //   setShowResult(false);
  //   row = parseInt(row);
  //   col = parseInt(col);

  //   if (!tableArrayData[row]) {
  //     tableArrayData[row] = [];
  //   }
  //   // console.log(row, col);
  //   tableArrayData[row][col] = e.target.value;
  // };
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = (e) => {
    let [row, col] = e.target.name.split("-");
    if (row === col) {
      e.target.value = 0;
    }
    let value = parseFloat(e.target.value) || 0;

    // if (isNaN(value) || value < 0) {
    //   e.target.value = 0; 
    //   return; 
    // }
    if (isNaN(value) || value < 0) {
      setErrorMessage('Please enter a valid non-negative number.');
      //alert(errorMessage)
      e.target.value = 0; 
      return;
    } else {
      setErrorMessage(''); 
    }

    if (value < 0) {
      e.target.value = 0; 
      return;
    }

    if (row === col) {
      value = 0; 
    }

    console.log(e.target.name, value);
    setTableCellsData({
      ...tableCellsData,
      [e.target.name]: value
    });
    setShowResult(false);
    row = parseInt(row);
    col = parseInt(col);

    if (!tableArrayData[row]) {
      tableArrayData[row] = [];
    }
    tableArrayData[row][col] = value;
  };


  const generateTable = () => {
    let table = [];
    for (let i = 0; i < rowValue; i++) {
      let children = [];
      for (let j = 0; j < columnsValue; j++) {
        children.push(
          <TableCell key={getUniqueKeyFromArrayIndex(i, j)}>
            <BootstrapInput
              name={getUniqueKeyFromArrayIndex(i, j)}
              onChange={onChangeHandler}
              style={{backgroundColor: 'white', borderRadius: '5px'}}
            />
            <div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>

          </TableCell>
        );
      }
      table.push(
        <TableRow key={i}>
          <TableCell style={{ padding: "10px" }}>
            Person {i + 1} has to pay
          </TableCell>
          {children}
        </TableRow>
      );
    }
    return table;
  };


  //creating the graph
  function addZeros(array) {
    var graph = [];
    for (var i = 0; i < rowValue; i++) {
      var col = [];
      for (var j = 0; j < columnsValue; j++) {
        col.push(0);
      }
      graph[i] = col;
    }

    for (var p = 0; p < array.length; p++)
      for (i = 0; i < array[p].length; i++) {
        if (array[p][i] === undefined || array[p][i] === Array(0))
          array[p][i] = 0;
        // document.write(array[p][i] + " ");
        graph[p][i] = array[p][i];
      }

    fianlAns = [];
    fianlAns = minCashFlow(graph);
  }

  function handleChangeInPersons(e) {
    setRowValue(e.target.value);
    setColumnsValue(e.target.value);
    setShowResult(false);
    personColumn = [];
    for (var i = 0; i < e.target.value; i++) {
      personColumn.push(`Person ${i + 1} `);
    }
  }

  function handleChangeInResult(e) {
    // showResult?setShowResult(false):setShowResult(true);
    if (tableArrayData.length === 0 || rowValue === 0 || columnsValue === 0)
      return;
    addZeros(tableArrayData)
    setShowResult(true);
  }

  return (
    <Fragment>
      <div>


        <div className={"rowColumnsNumber"} style={{ marginTop: 20, display: "flex" }}>
          <h4 style={{ paddingRight: 20 }}>Enter total number of persons involved in cash flow: </h4>
          <TextField
            id="Row-number"
            label="Persons"
            type="number"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: "3", max: "10", step: "1" }}
            onChange={handleChangeInPersons}
            variant="outlined"
          />
        </div>
        <div>
          <h4>
            For each cell, enter the amount that Person i: "the left most row" has to pay to Person j : "people of that row".values are set 0 by default, any character or negative input will be taken as zero.
            <br />Note: Diagonals values represent the person itself and are bound to be zero.
          </h4>
        </div>
        <br />
        <div>
          <div className={"TableContainer"}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                {/* <div style={{paddingLeft: 165}}>
            {personColumn.map((item, index) => {
                    return <div style={{float: "left", width: 100/{rowValue}, paddingRight: 97}}>
                      {`To ${item}`}
                    </div>
                  })}
            </div> */}
                <TableBody style={{ backgroundColor: "#ff7366" }} ref={ref}>{generateTable()}</TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ paddingTop: 30 }}>
            <input type="button" style={buttonStyle} onClick={handleChangeInResult} value={showResult ? "Result" : "Compute"} />
          </div>
          <div>
            {showResult ?
              fianlAns.map((item, index) => {
                return <div>
                  <h4>{item}</h4>
                </div>
              })
              : null}
          </div>
          <h5>Welcome <br />used : graph, greedy, heaps</h5>
        </div>
      </div>
    </Fragment>
  );
}