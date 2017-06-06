var React = require("react");

var PomodoroForm = React.createClass({

  onSubmit: function(e){
    e.preventDefault();
    var defaultSessionLength = this.refs.defaultSessionLength.value;
    var defaultBreakLength = this.refs.defaultBreakLength.value;

    if (!defaultSessionLength || !defaultBreakLength) return;

    if (defaultSessionLength.match(/^[0-9]*$/) && defaultBreakLength.match(/^[0-9]*$/)){
      defaultSessionLength = parseInt(defaultSessionLength, 10) * 60;
      defaultBreakLength = parseInt(defaultBreakLength, 10) * 60; 
      this.props.onSetSession({defaultSessionLength, defaultBreakLength});
    }
  },

  render: function(){
    return (
      <div>
        <form onSubmit={this.onSubmit} className="pomodoro-form">
          <label className="small-6">
            <input ref="defaultSessionLength" type="number" placeholder="Session length" min="1"/>
          </label>
          <label className="small-6">
            <input ref="defaultBreakLength"type="number" placeholder="Break length" min="1"/>
          </label>

          <button className="button expanded">Start</button>
        </form>
      </div>
    )
  }

});


module.exports = PomodoroForm;