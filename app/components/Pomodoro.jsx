var React = require("react");
var Clock = require("Clock");
var Controls = require("Controls");
var PomodoroForm = require("PomodoroForm");

var startSound = new Audio("/media/gong.mp3");
var breakSound = new Audio("/media/chime.mp3");


var Pomodoro = React.createClass({

  getDefaultProps: function(){
    return {
      breakColor: "	#87CEFA",
      sessionColor: "	#7CFC00",
    }
  },

  getInitialState: function(){

    return {
      defaultBreakLength: 0,
      itsBreak: false,
      defaultSessionLength: 0,
      count: 0,
      countdownStatus: "stopped",
      percentsDone: 0
    }
  },

  handleStatusChange: function(newStatus) {
    this.setState({
      countdownStatus: newStatus
    })
  },

  handleSetSession: function(data){
    var {defaultBreakLength, defaultSessionLength} = data;

    this.setState({
      defaultBreakLength,
      defaultSessionLength, 
      count: defaultSessionLength - 1,
      countdownStatus: "started",
      fillColor: this.props.sessionColor
    });

    startSound.play();
  },


  componentDidUpdate: function(prevProps, prevState){
    if (this.state.countdownStatus !== prevState.countdownStatus){
      switch (this.state.countdownStatus){
        case "started":
          this.startTimer();
          break;
        case "stopped":
          this.setState({
              count: 0,
              countdownStatus:"stopped",
              fillColor: undefined,
              percentsDone: 0
            });
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

  handleBreak: function(){
    var {defaultSessionLength, defaultBreakLength, count} = this.state;

    if (count > 0){
      count -= 1;
      var percentsDone = 100 - Math.floor((100 * count) / defaultBreakLength);
      this.setState({
        percentsDone,
        count,
      });
    } else {
      this.setState({
        itsBreak: false,
        count: defaultSessionLength - 1,
        fillColor: this.props.sessionColor,
        percentsDone: 0
      });
      startSound.play();
    }
  },

  handleSession: function(){
    var {defaultSessionLength, defaultBreakLength, count} = this.state;

    if(count > 0) {
      count -= 1;
      var percentsDone = 100 - Math.floor((100 * count) / defaultSessionLength);
      this.setState({
        percentsDone,
        count,
      });
    }
    else{
      this.setState({
        itsBreak: true, 
        fillColor: this.props.breakColor,
        count: defaultBreakLength - 1,
        percentsDone: 0
      });
      breakSound.play();
    } 
  },

  startTimer: function(){

    this.timer = setInterval(()=>{
      if (this.state.itsBreak){
        this.handleBreak();
      } else {
        this.handleSession();
      }
    }, 1000);
  },

  render: function(){

    var {count, countdownStatus, fillColor, percentsDone} = this.state;

    var renderControlArea = () => {
      if (countdownStatus !== "stopped") {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <PomodoroForm onSetSession={this.handleSetSession}/>
      }
    };

    return (
      <div>
        <h1 className="page-title">Pomodoro Clock</h1>
        <Clock totalSeconds = {count} fillColor={fillColor} percentsDone={percentsDone}/>
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Pomodoro;