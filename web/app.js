(function(){

function LeagueView(league, tableElement, resultSection, dateElement){
    this.league = league;
    this.tableElement = tableElement;
    this.resultSection = resultSection;
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
        self.tableElement.appendChild(teamElement.row);
        
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
        matchday = this.league.history[matchdayIndex];
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
        
        this.resultSection.innerHTML = "";
        this.league.results[matchdayIndex].forEach(function(result){
            var resultElement = document.createElement("div");
            var homeElement = document.createElement("span");
            var scoreElement = document.createElement("span");
            var awayElement = document.createElement("span");
            homeElement.textContent = self.league.teams[result.homeTeamId].name;
            scoreElement.textContent = result.homeGoals + " - " + result.awayGoals;
            awayElement.textContent = self.league.teams[result.awayTeamId].name;
            resultElement.appendChild(homeElement);
            resultElement.appendChild(scoreElement);
            resultElement.appendChild(awayElement);
            self.resultSection.appendChild(resultElement);
        })
    }
}

function Match(date, homeTeamId, awayTeamId, homeGoals, awayGoals){
    this.date = date,
    this.homeTeamId = homeTeamId,
    this.awayTeamId = awayTeamId,
    this.homeGoals = homeGoals
    this.awayGoals = awayGoals
}

var league = new window.league.League()
    .addTeam(window.league._teams)
    .addResult(window.league._games);

var tableElement = document.getElementById("table"),
    resultSection = document.getElementById("results"),
    dateElement = document.getElementById("date"),
    notification = document.getElementById("notification"),
    addResults = document.getElementById("addResults"),
    left = document.getElementById("left"),
    right = document.getElementById("right"),
    matchday = 0,
    leagueView = new LeagueView(league, tableElement, resultSection, dateElement);

leagueView.draw(matchday);

tableElement.focus();

function navigate(dir){
    if (dir == "backward"){
        leagueView.draw(--matchday);
    } else if (dir == "forward"){
        leagueView.draw(++matchday);
    }
    if (matchday < 0) matchday = 0;
    if (matchday > league.history.length-1) matchday = league.history.length-1;
}
document.addEventListener("keydown", function(e){
    if (e.keyCode == 37){
        navigate("backward");
    } else if (e.keyCode == 39){
        navigate("forward");
    }
});

addResults.addEventListener("click", function(e){
    e.preventDefault();
    var results = [],
        newDate = league.history[league.history.length-1].date + (1000 * 60 * 60 * 24);
            
    for(var i = 0; i < parseInt(Math.random() * 10) + 1; i++){
        var homeTeamId = parseInt(Math.random() * 20) + 1,
            awayTeamId = parseInt(Math.random() * 20) + 1;        
        results.push({
            date: newDate,
            homeTeamId: homeTeamId,
            awayTeamId: awayTeamId, 
            homeGoals: parseInt(Math.random() * 10) + 1,
            awayGoals: parseInt(Math.random() * 10) + 1
        })
    }
    league.addResult(results);
    notify("added " + results.length + " results to " + new Date(newDate).toDateString());
});

left.addEventListener("click", function(e){
    e.preventDefault();
    navigate("backward");
});
right.addEventListener("click", function(e){
    e.preventDefault();
    navigate("forward");
});

function notify(text){
    notification.innerHTML = "";
    var msg = document.createElement("span");
    msg.className = "notification";
    msg.textContent = text;
    notification.appendChild(msg);
    msg.style.opacity = 1;
    setTimeout(function(){
        msg.style.opacity = 0;
    },10);
}

})();