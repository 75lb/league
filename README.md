[![NPM version](https://badge.fury.io/js/league.png)](http://badge.fury.io/js/league)
[![Build Status](https://travis-ci.org/75lb/league.png?branch=master)](https://travis-ci.org/75lb/league)
[![Dependency Status](https://david-dm.org/75lb/league.png)](https://david-dm.org/75lb/league)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-11/league/README.md?pixel)

League
======
A Football League model. Put teams and results in, get a league table history out. 

* One language, one Application Layer, one test suite - each used on both client and server (the Holy Grail?) 
* MVC architecture
* 100% Handrolled javascript and CSS, no dependecies on 3rd party libraries or frameworks
* Tested in Chrome, Safari, Firefox, Opera
* HTML5, CSS3, EcmaScript 5

Todo

* Responsive CSS
* Connection to a live result service

Web View
--------
###View league
The left and right arrow keys move forward and backward through time. 

http://75lb.github.io/league/web/
###Test
http://75lb.github.io/league/web/test-runner/

CLI View
--------
###View league
Watch an animation showing the League transform over time.
```sh
$ git clone https://github.com/75lb/league.git
$ npm install
$ node cli/app.js
```
A screencast showing the CLI animation is [here](cli/screencast.m4v).
###Test
```sh
$ npm test
```

API Synopsis
--------
```javascript
var league = new League();
league.addTeam({ id: "1", name: "Stoke" });
league.addTeam({ id: "2", name: "Port Vale" });
league.addResult({ date: "10 Sep 2012", homeTeamId: 1, awayTeamId: 2, homeGoals: 6, awayGoals: 0 });
console.log(league.getTable("10 Sep 2012"));
```
