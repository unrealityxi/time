var React = require("react");


var CountdownForm = React.createClass({

  onSubmit: function(e){
    e.preventDefault();
    var minutes = parseInt(this.refs.minutes.value);
    var seconds = parseInt(this.refs.seconds.value);



    if (!minutes && !seconds){
      return;
    } else if (!minutes && seconds > 0){
      minutes = 0;
    } else if (!seconds && minutes > 0){
      seconds = 0;
    }
    minutes = Math.abs(minutes);
    seconds = Math.abs(seconds);

    minutes *= 60;

    let total = minutes + seconds;
    this.props.onSetCountdown(total);
  },

  render: function(){
    return (
      <div>
        <form onSubmit={this.onSubmit} className="pomodoro-form">
          <label className="small-6">
            <input ref="minutes" type="number" placeholder="Minutes"/>
          </label>
          <label className="small-6">
            <input ref="seconds"type="number" placeholder="Seconds"/>
          </label>

          <button className="button expanded">Start</button>
        </form>
      </div>
    )
  }

});

module.exports = CountdownForm;