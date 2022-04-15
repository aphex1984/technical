import React from "react";


// This function simply produces a HTML table using JSX.
function Table(props){

  return (
    <div>
    <table>
    <thead>
    <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Score</th>
    </tr>
    </thead>
    <tbody>
    {props.data.slice(0, props.data.length).map((item, index) => {
      return (
        <tr>
        <td>{item[2]}</td>
        <td>{item[0]}</td>
        <td>{item[1]}</td>
        </tr>
      );
    })}
    </tbody>
    </table>
    </div>
  );
}

export default Table;
