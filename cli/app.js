var League = require("../lib/league").League,
    data = require("./data"),
    cursor = require("ansi")(process.stdout),
    sprintf = require("sprintf-js").sprintf;

function LeagueView(league){
    this.league = league;
}
LeagueView.prototype.draw = function(matchdayIndex){
    var self = this,
        matchday = this.league.history[matchdayIndex],
        format      = "%-13s %3s %3s %3s %3s %3s %3s %3s %3s\n",
        formatShort = "%-13s %3s %3s %3s %3s %3s %3s %3s";
    if (matchday) {
        cursor.eraseData(2)
            .goto(1,1)
            .bold()
            .write(sprintf(format, "Team", "P", "W", "D", "L", "F", "A", "GD", "Pts" ))
            .reset();
        matchday.table.forEach(function(team){
            cursor.write(sprintf(
                formatShort, 
                team.team, 
                team.played, 
                team.won, 
                team.drawn, 
                team.lost, 
                team.goalsFor, 
                team.goalsAgainst,
                team.goalDifference
            ));
            if (team.move == "up"){
                cursor.fg.green();
            } else if (team.move == "down"){
                cursor.fg.red();
            } else {
                cursor.fg.reset();
            }
            cursor.write(sprintf("%3s", team.points.toString()))
                .write("\n")
                .reset();
        });
    }
};

var league = new League().addTeam(data.loadTeams()).addResult(data.loadGames()),
    leagueView = new LeagueView(league),
    matchday = 0;

var anim = setInterval(function(){
    if (matchday == league.history.length){
        clearInterval(anim)
    } else{
        leagueView.draw(matchday++);
    }
},500);
