/**
global application namespace
*/
window.league = window.league || {};

/**
global functions required by the JsonP files
*/
loadTeams = function(teams){
    window.league._teams = teams;
}
loadGames = function(games){
    games.forEach(function(game){
        var date = game.date.split("/");
        game.date = new Date("20" + date[2], Number(date[1])-1, date[0]).getTime();
    });
    league._games = games;
}