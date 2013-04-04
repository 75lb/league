(function(){

var league = new window.league.League()
    .addTeam(window.league._teams)
    .addResult(window.league._games);

window.league.prem = league;
    
})();

