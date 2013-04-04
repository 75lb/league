var _games, _teams;

/**
global functions called by jsonp files
*/
global.loadTeams = function(teams){
    _teams = teams;
}
global.loadGames = function(games){
    games.forEach(function(game){
        var date = game.date.split("/");
        game.date = new Date("20" + date[2], Number(date[1])-1, date[0]).getTime();
    });
    _games = games;
}

/**
API
*/
exports.loadGames = function(){
    // lazy load on demand
    require("./games-jsonp");
    return _games;    
};

exports.loadTeams = function(){
    require("./teams-jsonp");
    return _teams;
};

