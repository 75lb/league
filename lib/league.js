(function(){

var util; 

if (typeof exports === "undefined"){
    window.league = window.league || {}; 
    window.league.League = League;
} else {
    exports.League = League;
}

function l(){ console.log.apply(this, Array.prototype.slice.call(arguments)); }

function League(){
    this.teams = {};
    this.history = [];
    this.results = [];
}
League.prototype.addTeam = function(team){
    var self = this;
    if (Array.isArray(team)){
        team.forEach(function(team){
            self.addTeam(team);
        });
    } else {
        this.teams[team.id] = team;
    }
    return this;
}
League.prototype.addResult = function(result){
    var table,
        self = this;
        
    if (Array.isArray(result)){
        result.forEach(function(result){
            self.addResult(result);
        })
    } else {
        if (this.history.length == 0){
            table = new Table(this.teams);
            this.history.push({
                date: result.date,
                table: table
            });
        } else if (!this.getTable(result.date)){
            table = this.history[this.history.length-1].table.clone();
            this.history.push({
                date: result.date,
                table: table
            })
        } else {
            table = this.getTable(result.date);
        }
        
        var matchdayIndex = this.history.length-1;
        this.results[matchdayIndex] = this.results[matchdayIndex] || [];
        this.results[matchdayIndex].push(result);
    
        if (result.homeGoals > result.awayGoals ){
            result.homePointsEarned = 3;
            result.awayPointsEarned = 0;
            result.homeWin = 1;
            result.draw = 0;
            result.homeLoss = 0;
            result.awayWin = 0;
            result.awayLoss = 1;
        } else if (result.homeGoals == result.awayGoals){
            result.homePointsEarned = 1;
            result.awayPointsEarned = 1;
            result.homeWin = 0;
            result.draw = 1;
            result.homeLoss = 0;
            result.awayWin = 0;
            result.awayLoss = 0;
        } else {
            result.homePointsEarned = 0;
            result.awayPointsEarned = 3;
            result.homeWin = 0;
            result.draw = 0;
            result.homeLoss = 1;
            result.awayWin = 1;
            result.awayLoss = 0;
        }
    
        var homeTeam = table.getTeam(result.homeTeamId);
        homeTeam.played++;
        homeTeam.points += result.homePointsEarned;
        homeTeam.goalsFor += Number(result.homeGoals);
        homeTeam.goalsAgainst += Number(result.awayGoals);
        homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
        homeTeam.won += result.homeWin;
        homeTeam.drawn += result.draw;
        homeTeam.lost += result.homeLoss;
        var awayTeam = table.getTeam(result.awayTeamId);
        awayTeam.played++;
        awayTeam.points += result.awayPointsEarned;
        awayTeam.goalsFor += Number(result.awayGoals);
        awayTeam.goalsAgainst += Number(result.homeGoals);
        awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
        awayTeam.won += result.awayWin;
        awayTeam.drawn += result.draw;
        awayTeam.lost += result.awayLoss;
        
        table.sort();
    }
    return this;
}
League.prototype.getTable = function(date){
    var history = this.history.filter(function(day){
        return day.date == date;
    });
    return history[0] ? history[0].table : null;
}

function Table(teams){
    var self = this;
    Array.call(this);
    if (teams){
        Object.keys(teams).forEach(function(id, index){
            self.push({
                id: id,
                team: teams[id].name,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0,
                move: "-",
                position: index + 1
            });
        })
    }
}
Table.prototype = Object.create(Array.prototype); 
Table.prototype.constructor = Table;

Table.prototype.clone = function(){
    var output = new Table();
    output.previous = this;
    this.forEach(function(team){
        output.push({
            id: team.id,
            team: team.team,
            played: team.played,
            won: team.won,
            drawn: team.drawn,
            lost: team.lost,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            points: team.points,
            move: team.move,
            position: team.position
        });
    });
    return output;
};
Table.prototype.getTeam = function(id){
    return this.filter(function(team){ return team.id == id; })[0];
};
Table.prototype.sort = function(){
    var self = this;
    Array.prototype.sort.call(this, function(a, b){
        if (a.points < b.points){
            return 1;
        } else if (a.points == b.points && a.goalDifference < b.goalDifference){
            return 1;
        } else if (a.points == b.points && a.goalDifference == b.goalDifference && a.goalsFor < b.goalsFor){
            return 1;
        } else if (a.points == b.points && a.goalDifference == b.goalDifference && a.goalsFor == b.goalsFor){
            return 0;
        } else {
            return -1;
        }
    });
    this.forEach(function(team, index){
        team.position = index + 1;

        if (!self.previous){
            team.move = "-";
        } else if (team.position < self.previous.getTeam(team.id).position){
            team.move = "up";
        } else if (team.position == self.previous.getTeam(team.id).position){
            team.move = "-";
        } else {
            team.move = "down";
        }        
    });
    return this;
};

}());
