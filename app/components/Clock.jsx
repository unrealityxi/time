var React = require("react");

var Clock = React.createClass({

  // Default properties for formatSeconds,
  // to be rendered initially
  getDefaultProps: function(){
    return {
      totalSeconds: 0
    }
  },

  // specify property types
  propTypes: {
    totalSeconds: React.PropTypes.number
  },


  // Takes seconds as arguments, produces 
  // a string in mm:ss format
  formatSeconds: function(totalSeconds){
    var seconds = totalSeconds % 60; 
    var minutes = Math.floor(totalSeconds / 60);

    if (seconds < 10){
      seconds = "0" + seconds;
    }
    if (minutes < 10){
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },

  getStyle: function(){
    
    var defaultColor = "#b5d0e2";
    var color = defaultColor;
    var {fillColor, percentsDone} = this.props;

    if (fillColor){
      color = fillColor;
    }

    if (!percentsDone){
      percentsDone = 0;
    }

    return {background: `linear-gradient(to top, ${color}, ${color} ${percentsDone}%, ${defaultColor} ${percentsDone}%, ${defaultColor})`};
  },

  // render method
  render: function(){
    var {totalSeconds} = this.props;
    

    return (
      <div className="clock" style={this.getStyle()}>
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
});

module.exports = Clock;
