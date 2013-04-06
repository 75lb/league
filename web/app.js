(function(){

function LeagueView(league, parentElement, dateElement){
    this.league = league;
    this.parentElement = parentElement;
    this.dateElement = dateElement;
    this.teamElements = [];
    this.build();
}
LeagueView.prototype.build = function(){
    var self = this;
    Object.keys(this.league.teams).forEach(function(teamId){
        var team = self.league.teams[teamId];
        var teamElement = {
            row: document.createElement("div"),
            colGroup1: document.createElement("div"),
            colGroup2: document.createElement("div"),
        };
        teamElement.row.id = team.name;
        teamElement.row.className = "team";
        teamElement.row.appendChild(teamElement.colGroup1);
        teamElement.row.appendChild(teamElement.colGroup2);
        self.parentElement.appendChild(teamElement.row);
        
        ["position", "team", "played", "won", "drawn", "lost", "goalsFor", "goalsAgainst", "goalDifference"].forEach(function(column){
            teamElement.colGroup1.appendChild(teamElement[column] = document.createElement("span"));
        });
        teamElement.colGroup2.appendChild(teamElement.points = document.createElement("span"));
        self.teamElements[team.id] = teamElement;
    });
    return this;
};
LeagueView.prototype.draw = function(matchdayIndex){
    var self = this,
        matchday = league.history[matchdayIndex];
    if (matchday) {
        this.dateElement.textContent = new Date(matchday.date).toDateString();
        matchday.table.forEach(function(team){
            var teamElement = self.teamElements[team.id],
                className;
            if (team.move == "up"){
                className = "team up";
            } else if (team.move == "down"){
                className = "team down";
            } else {
                className = "team";
            }
            className += " position" + team.position;
            teamElement.row.className = className;
            Object.keys(team).forEach(function(field){
                if (field !== "id" && field !== "move") teamElement[field].textContent = team[field];
            });
        });
    }
}

var league = new window.league.League()
    .addTeam(window.league._teams)
    .addResult(window.league._games);

var tableElement = document.getElementById("table"),
    dateElement = document.getElementById("date"),
    matchday = 0,
    leagueView = new LeagueView(league, tableElement, dateElement);

leagueView.draw(matchday);

tableElement.focus();
document.addEventListener("keydown", function(e){
    if (e.keyCode == 37){
        leagueView.draw(--matchday);
    } else if (e.keyCode == 39){
        leagueView.draw(++matchday);
    }
    if (matchday < 0) matchday = 0;
    if (matchday > league.history.length-1) matchday = league.history.length-1;
});

})();