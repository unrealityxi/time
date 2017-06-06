var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, browserHistory, hashHistory} = require("react-router");
var Main = require("Main");
var Countdown = require("Countdown");
var Timer = require("Timer");
var Pomodoro = require("Pomodoro");

// Load foundation
require("style!css!foundation-sites/dist/css/foundation.min.css");

// app css 
require("style!css!sass!applicationStyles");


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="countdown" component={Countdown}></Route>
      <Route path="timer" component={Timer}></Route>
      <IndexRoute component={Pomodoro}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById("app")
);

