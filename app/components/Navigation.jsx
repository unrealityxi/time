var React = require("react");
var {Link, IndexLink} = require("react-router");

var Navigation = React.createClass({

  
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      navStatus: window.innerWidth < 700 ? "hide" : "show"
    }
  },
  handleResize: function() {
    var windowWidth = window.innerWidth;
    var navStatus;
    if (windowWidth < 700){
      navStatus = "hide";
    } else {
      navStatus = "show";
    }
    this.setState({windowWidth, navStatus});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  toggleNav: function(){

    var navStatus = this.state.navStatus == "hide" ? "show" : "hide";

    this.setState({
      navStatus
    });
  },

  render: function(){
    var showToggle = this.state.windowWidth < 700 ? "show" : "hide";
    var showCreatedBy = this.state.windowWidth > 428 ? "show" : "hide";

    return (
      <nav className="top-bar">

      <div className = "top-bar-left">
        <ul className="menu">
          <li>
            <button  className={"toggle-button menu-icon dark " + showToggle } onClick = {this.toggleNav} type="button"></button>
          </li>
          <li className = "menu-text">
            React Time
          </li>
        </ul>

        <div className={"toggle-on-mobile " + this.state.navStatus } >
          <ul className="menu">
            <li>
              <IndexLink to="/" activeClassName="active-link">Pomodoro</IndexLink>
            </li>
            <li>
              <Link to="/countdown" activeClassName="active-link">Countdown</Link>
            </li>
            <li>
              <Link to="/timer" activeClassName="active-link">Timer</Link>
            </li>
          </ul>
        </div>


      </div>

        

        <div className="top-bar-right">
          <ul className="menu">
            <li className={"menu-text " + showCreatedBy}>
              Created by <a href="https://unrealityxi.github.io/portfolio/" target="_blank">Dragan Roganović</a>
            </li> 
          </ul>
        </div>
      </nav>
    );
  }
})
module.exports = Navigation;
