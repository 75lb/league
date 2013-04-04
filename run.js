var League = require("./lib/league").League,
    data = require("./jsonp/data");

function l(){console.log.apply(this, Array.prototype.slice.call(arguments))}
function i(obj){console.log(util.inspect(obj, true, null, true));}

var league = new League()
    .addTeam(data.loadTeams())
    .addResult(data.loadGames());

league.history.forEach(function(history){
    l("");
    history.table.forEach(function(team){
        l("%d %s  %s  %s  %s  %s  %s", team.position, team.team, team.won, team.drawn, team.lost, team.points, team.move); 
    });
});

// league.history[35].table.forEach(function(team){
    // l("%d %s  %s  %s  %s  %s  %s", team.position, team.team, team.won, team.drawn, team.lost, team.points, team.move); 
// });