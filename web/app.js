(function(){

var league = new window.league.League()
    .addTeam(window.league._teams)
    .addResult(window.league._games);

var table = document.getElementById("table"),
    date = document.getElementById("date"),
    teamElements = [],
    i=0;
    
function updateTable(){
    var history = league.history[i++];
    if (history){
        date.textContent = new Date(history.date).toDateString();
        history.table.forEach(function(team){
            var teamElement = teamElements[team.id];
            if (!teamElement){
                teamElement = buildRow(team);
                table.appendChild(teamElement.row);
                teamElements[team.id] = teamElement;
            }
            
            teamElement.row.style.top = ((team.position-1) * 28) + "px";
            if (team.move == "up"){
                teamElement.row.className = "team up";
            } else if (team.move == "down"){
                teamElement.row.className = "team down";
            } else {
                teamElement.row.className = "team";
            }
            teamElement.played.textContent = team.played;
            teamElement.won.textContent = team.won;
            teamElement.drawn.textContent = team.drawn;
            teamElement.lost.textContent = team.lost;
            teamElement.for.textContent = team.goalsFor;
            teamElement.against.textContent = team.goalsAgainst;
            teamElement.diff.textContent = team.goalDifference;
            teamElement.points.textContent = team.points;
        });
    } else {
        clearInterval(updateInterval);
    }
}

updateTable();
var updateInterval = setInterval(updateTable, 1600);

function buildRow(team){
    var teamElement = {
        id: team.id,
        row: document.createElement("div"),
        name: document.createElement("span"),
        played: document.createElement("span"),
        won: document.createElement("span"),
        drawn: document.createElement("span"),
        lost: document.createElement("span"),
        for: document.createElement("span"),
        against: document.createElement("span"),
        diff: document.createElement("span"),
        points: document.createElement("span"),
    }
    teamElement.name.textContent = team.team;
    teamElement.played.textContent = team.played;
    teamElement.won.textContent = team.won;
    teamElement.drawn.textContent = team.drawn;
    teamElement.lost.textContent = team.lost;
    teamElement.for.textContent = team.goalsFor;
    teamElement.against.textContent = team.goalsAgainst;
    teamElement.diff.textContent = team.goalDifference;
    teamElement.points.textContent = team.points;

    teamElement.row.appendChild(teamElement.name);
    teamElement.row.appendChild(teamElement.played);
    teamElement.row.appendChild(teamElement.won);
    teamElement.row.appendChild(teamElement.drawn);
    teamElement.row.appendChild(teamElement.lost);
    teamElement.row.appendChild(teamElement.for);
    teamElement.row.appendChild(teamElement.against);
    teamElement.row.appendChild(teamElement.diff);
    teamElement.row.appendChild(teamElement.points);
    teamElement.row.className = "team";
    teamElement.row.id = team.team;
    return teamElement;
}

})();