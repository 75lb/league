(function(){

var league = new window.league.League()
    .addTeam(window.league._teams)
    .addResult(window.league._games);

var table = document.getElementById("table");

var teamElements = [];
league.history[0].table.forEach(function(team){
    var teamElement = buildRow(team);
    table.appendChild(teamElement.row);
    teamElements[team.id] = teamElement;
});

var i=1;
function updateTable(){
    var history = league.history[i++];
    if (history){
        history.table.forEach(function(team){
            var teamElement = teamElements[team.id];
            teamElement.row.style.top = (team.position - 1) + "em";
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

var updateInterval = setInterval(updateTable, 2000);

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
    teamElement.row.style.top = (team.position - 1) + "em";
    return teamElement;
}

})();