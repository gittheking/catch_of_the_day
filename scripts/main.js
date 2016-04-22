var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; // mixin
var History = ReactRouter.History;

var createBrowserHistory = require('history/lib/createBrowserHistory');
var h = require('./helpers');



var App = React.createClass({
  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
});

// Add Fish form
// <AddFishForm/>
var AddFishForm = React.createClass({
  render: function() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Price"/>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to image"/>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
});

// <Header/>
var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});

// <Order/>
var Order = React.createClass({
  render: function() {
    return (
      <p>Order</p>
    )
  }
});

// <Inventory/>
var Inventory = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm/>
      </div>
    )
  }
});

// storePicker
// This will let us make <StorePicker>
var StorePicker = React.createClass({
  // mixins HAVE to be an array
  mixins: [History],
  goToStore: function(event) {
    event.preventDefault();
    // get data from the input
    var storeId = this.refs.storeId.value;
    // transistion from StorePicker to App
    this.history.pushState(null, '/store/' + storeId);
  },
  render: function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
        <input type="Submit"/>
      </form>
    )
  }
});

// Not found
var NotFound = React.createClass({
  render: function() {
    return <h1>404 Not Found!</h1>
  }
});

// Routes
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
