var React = require("react");
var {Link, IndexLink} = require("react-router");

var Navigation = React.createClass({
  render: function(){
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">React Time</li>
            <li>
              <IndexLink to="/" activeClassName="active-link">Get Weather</IndexLink>
            </li>
            <li>
              <Link to="/about" activeClassName="active-link">About</Link>
            </li>
            <li>
              <Link to="/examples" activeClassName="active-link">Examples</Link>
            </li>
          </ul>
        </div>

        <div className="top-bar-right">
          <ul className="menu">
            <li className="menu-text">
              Created by <a href="https://unrealityxi.github.io/portfolio/" target="_blank">Dragan Roganović</a>
            </li> 
          </ul>
        </div>
      </div>
    );
  }
})

module.exports = Navigation;
