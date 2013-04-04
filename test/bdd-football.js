var assert = require("assert"),
    util = require("util"),
    League = require("../lib/league").League;

function l(){console.log(Array.prototype.slice.call(arguments))}
function i(obj){console.log(util.inspect(obj, true, null, true));}

it("basic scenario", function(){
    var league = new League();
    
    league.addTeam({ id: 1, name: "Man United" });
    league.addTeam({ id: 2, name: "Chelsea" });
    league.addTeam({ id: 3, name: "Spurs" });
    league.addTeam({ id: 4, name: "Newcastle" });
    
    league.addResult({
        "date": "13 aug 11",
        "homeTeamId": 1,
        "awayTeamId": 2,
        "homeGoals": "0",
        "awayGoals": "4"
    });
    league.addResult({
        "date": "13 aug 11",
        "homeTeamId": 3,
        "awayTeamId": 4,
        "homeGoals": "1",
        "awayGoals": "1"
    });
    league.addResult({
        "date": "20 aug 11",
        "homeTeamId": 1,
        "awayTeamId": 3,
        "homeGoals": "2",
        "awayGoals": "0"
    });
    league.addResult({
        "date": "20 aug 11",
        "homeTeamId": 2,
        "awayTeamId": 4,
        "homeGoals": "5",
        "awayGoals": "0"
    });
    
    var table1 = league.getTable("13 aug 11");
    var table2 = league.getTable("20 aug 11");
    // i(table1);
    // i(table2);
    
    assert.deepEqual(table1[0], { 
        id: '2',
        team: 'Chelsea',
        played: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        goalsFor: 4,
        goalsAgainst: 0,
        goalDifference: 4,
        points: 3,
        move: '-',
        position: 1
    });
    assert.deepEqual(table1[1], { 
        id: '3',
        team: 'Spurs',
        played: 1,
        won: 0,
        drawn: 1,
        lost: 0,
        goalsFor: 1,
        goalsAgainst: 1,
        goalDifference: 0,
        points: 1,
        move: '-',
        position: 2
    });
    assert.deepEqual(table1[2], { 
        id: '4',
        team: 'Newcastle',
        played: 1,
        won: 0,
        drawn: 1,
        lost: 0,
        goalsFor: 1,
        goalsAgainst: 1,
        goalDifference: 0,
        points: 1,
        move: '-',
        position: 3
    });
    assert.deepEqual(table1[3], { 
        id: '1',
        team: 'Man United',
        played: 1,
        won: 0,
        drawn: 0,
        lost: 1,
        goalsFor: 0,
        goalsAgainst: 4,
        goalDifference: -4,
        points: 0,
        move: '-',
        position: 4
    });
    
    assert.deepEqual(table2[0], { 
        id: '2',
        team: 'Chelsea',
        played: 2,
        won: 2,
        drawn: 0,
        lost: 0,
        goalsFor: 9,
        goalsAgainst: 0,
        goalDifference: 9,
        points: 6,
        move: '-',
        position: 1
    });
    assert.deepEqual(table2[1], { 
        id: '1',
        team: 'Man United',
        played: 2,
        won: 1,
        drawn: 0,
        lost: 1,
        goalsFor: 2,
        goalsAgainst: 4,
        goalDifference: -2,
        points: 3,
        move: 'up',
        position: 2
    });
    assert.deepEqual(table2[2], { 
        id: '3',
        team: 'Spurs',
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        goalsFor: 1,
        goalsAgainst: 3,
        goalDifference: -2,
        points: 1,
        move: 'down',
        position: 3
    });
    assert.deepEqual(table2[3], { 
        id: '4',
        team: 'Newcastle',
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        goalsFor: 1,
        goalsAgainst: 6,
        goalDifference: -5,
        points: 1,
        move: 'down',
        position: 4
    });
});

it("teams should correctly state a move 'up', 'down' or '-'", function(){
    var league = new League();
    
    league.addTeam({ id: 1, name: "Man United" });
    league.addTeam({ id: 2, name: "Chelsea" });
    league.addTeam({ id: 3, name: "Spurs" });
    league.addTeam({ id: 4, name: "Newcastle" });
    
    league.addResult({
        "date": "13 aug 11",
        "homeTeamId": 1,
        "awayTeamId": 2,
        "homeGoals": "1",
        "awayGoals": "1"
    });
    league.addResult({
        "date": "13 aug 11",
        "homeTeamId": 3,
        "awayTeamId": 4,
        "homeGoals": "2",
        "awayGoals": "2"
    });
    league.addResult({
        "date": "20 aug 11",
        "homeTeamId": 1,
        "awayTeamId": 3,
        "homeGoals": "2",
        "awayGoals": "0"
    });
    league.addResult({
        "date": "20 aug 11",
        "homeTeamId": 2,
        "awayTeamId": 4,
        "homeGoals": "0",
        "awayGoals": "2"
    });
    
    var table1 = league.getTable("13 aug 11");
    var table2 = league.getTable("20 aug 11");
    // i(table1);
    // i(table2);
    
    assert.deepEqual(table1[0],  
        { id: '3',
          team: 'Spurs',
          played: 1,
          won: 0,
          drawn: 1,
          lost: 0,
          goalsFor: 2,
          goalsAgainst: 2,
          goalDifference: 0,
          points: 1,
          move: '-',
          position: 1 }
    );
    assert.deepEqual(table1[1], 
        { id: '4',
          team: 'Newcastle',
          played: 1,
          won: 0,
          drawn: 1,
          lost: 0,
          goalsFor: 2,
          goalsAgainst: 2,
          goalDifference: 0,
          points: 1,
          move: '-',
          position: 2 }
    );
    assert.deepEqual(table1[2], 
        { id: '1',
          team: 'Man United',
          played: 1,
          won: 0,
          drawn: 1,
          lost: 0,
          goalsFor: 1,
          goalsAgainst: 1,
          goalDifference: 0,
          points: 1,
          move: '-',
          position: 3 }
    );
    assert.deepEqual(table1[3], 
        { id: '2',
          team: 'Chelsea',
          played: 1,
          won: 0,
          drawn: 1,
          lost: 0,
          goalsFor: 1,
          goalsAgainst: 1,
          goalDifference: 0,
          points: 1,
          move: '-',
          position: 4 }
    );
    
    assert.deepEqual(table2[0], 
        { id: '4',
          team: 'Newcastle',
          played: 2,
          won: 1,
          drawn: 1,
          lost: 0,
          goalsFor: 4,
          goalsAgainst: 2,
          goalDifference: 2,
          points: 4,
          move: 'up',
          position: 1 }
    );
    assert.deepEqual(table2[1], 
        { id: '1',
          team: 'Man United',
          played: 2,
          won: 1,
          drawn: 1,
          lost: 0,
          goalsFor: 3,
          goalsAgainst: 1,
          goalDifference: 2,
          points: 4,
          move: 'up',
          position: 2 }
    );
    assert.deepEqual(table2[2], 
        { id: '3',
          team: 'Spurs',
          played: 2,
          won: 0,
          drawn: 1,
          lost: 1,
          goalsFor: 2,
          goalsAgainst: 4,
          goalDifference: -2,
          points: 1,
          move: 'down',
          position: 3 }
    );
    assert.deepEqual(table2[3], 
        { id: '2',
          team: 'Chelsea',
          played: 2,
          won: 0,
          drawn: 1,
          lost: 1,
          goalsFor: 1,
          goalsAgainst: 3,
          goalDifference: -2,
          points: 1,
          move: '-',
          position: 4 }
    );
});