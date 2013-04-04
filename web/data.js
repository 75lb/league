(function(){

window.league = window.league || {};

window.loadTeams = function(teams){
    window.league._teams = teams;
}
window.loadGames = function(games){
    games.forEach(function(game){
        var date = game.date.split("/");
        game.date = new Date("20" + date[2], Number(date[1])-1, date[0]).getTime();
    });
    window.league._games = games;
}
    
})();