import React from 'react';
import data from './data/scores.json' //The supplied data
//import data from 'https://raw.githubusercontent.com/aphex1984/techTest/main/scores.json';
import Table from './Table.js'

// Constants
const minimumSubs = 3;
const maximumSubs = 24;
const leaderBoardSize = 10;

function JsonProcessor() {
  var table = []; // The data for the table
  var player = []; // The playet names
  var position = []; // The players "rank" in the table

  // Iterate through the JSON data, group up scores for each player
  for(var i = 0; i < data.length; i++){
    var name = data[i];
    if(name.submissions.length > minimumSubs) { // Ruling out players with less than 3 submissions
      var arr = name.submissions;
      var scoreTotal = [];

      for(var j = 0; j < arr.length; j++){
        var scores = arr[j];
        scoreTotal.push(scores.score);
      }
      var entry = [];
      entry.push(name.name);
      entry.push(totalScores(scoreTotal)); // Totalling submissions for each player
      table.push(entry); // This is the Score and Name data for the highscore table
    }
  }

  // Sorting table data in score order
  table.sort(function(a,b) {
    return b[1] - a[1];
  });

  // Reducing the size of our table to the most successful participants
  table.length = leaderBoardSize;

  // Calculating the positions of each entry and adding it to the table array
  position.push(calculatePostion(table, position));
  for(var n = 0; n < table.length; n++){
    table[n].push(position[n]);
  }

  return (
    <div><Table data={table}/></div> // Rendering the table
  );
}


// This function iterates through the sorted submissions and adds them up.
// It sorts the submissions in order of score size and adds up the first 24 as per
// requirement.
function totalScores(input){
  var sum = 0;

  // Sorting the scores so we can add up the best submissions
  input.sort(function(a,b) {
    return b - a;
  });

  for(var k = 0; k < input.length; k++){ //Adding up everything
    if(k <= maximumSubs - 1){ // Keeping submissions to the best 24.
      sum += input[k];
    }
  }
  return(sum);
}

// This function ensures that the rankings are fair. People with equal scores
// should have equal ranks.
function calculatePostion(arr, position) {
  position.push(1);
  for(var m = 1; m < arr.length; m++){
    if(arr[m][1] == arr[m - 1][1]){
      position.push(position[m - 1])
    } else {
      position.push(position[m - 1] + 1)
    }
  }
  return(position);
}


export default JsonProcessor;
