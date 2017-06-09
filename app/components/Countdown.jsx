var React = require("react");
var Clock = require("Clock");
var CountdownForm = require("CountdownForm");
var Controls = require("Controls");
var startSound = new Audio("/media/ding.mp3");
var stopSound = startSound;

var Countdown = React.createClass({
  getInitialState: function(){
    return {
      count: 0, 
      percentsDone: 0,
      countdownStatus: "stopped",
      fillColor: "#87CEFA"
    }
  },
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.countdownStatus !== prevState.countdownStatus){
      switch (this.state.countdownStatus){
        case "started":
          this.startTimer();
          break;
        case "stopped":
          this.setState({count: 0, percentsDone: 0});
        case "paused":
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  
  componentWillUnmount: function(){
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function(){
    this.timer = setInterval(() => {
      var {count, initialCount} = this.state

      if (count === 0) {
        this.setState({countdownStatus: "stopped"});
        return;
      }

      
      count -= 1;
      var percentsDone = 100 - Math.floor((100 * count) / initialCount);
      this.setState({
        count,
        percentsDone
      });

      if (count == 0){
        stopSound.play();
      }

    }, 1000);
  },
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      initialCount: seconds, 
      countdownStatus: "started"
    });
    startSound.play();
  },
  handleStatusChange: function(newStatus) {
    this.setState({
      countdownStatus: newStatus
    })
  },
  render: function(){
    var {count, countdownStatus, fillColor, percentsDone} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== "stopped") {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };
    return (
      <div>
        <h1 className="page-title">Countdown</h1>
        <Clock totalSeconds={count} fillColor={fillColor} percentsDone={percentsDone}/>
        {renderControlArea()}
      </div>
    )
  }

});

module.exports = Countdown;