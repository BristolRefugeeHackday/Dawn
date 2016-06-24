'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var SlideTransition = React.createClass({
  displayName: 'SlideTransition',

  propTypes: {
    depth: React.PropTypes.number.isRequired,
    name: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: 'slider'
    };
  },
  getInitialState: function getInitialState() {
    return { direction: 'right' };
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var direction = newProps.depth > this.props.depth ? 'right' : 'left';
    this.setState({ direction: direction });
  },
  render: function render() {
    var _props = this.props;
    var name = _props.name;
    var depth = _props.depth;

    var outerProps = {
      className: name + '-outer-wrapper ' + this.props.className
    };
    var transProps = {
      component: 'div',
      transitionName: name + '-' + this.state.direction,
      className: name + '-transition-group'
    };
    var innerProps = {
      ref: 'inner',
      key: depth,
      className: name + '-inner-wrapper'
    };

    return React.createElement(
      'div',
      _extends({}, this.props, outerProps),
      React.createElement(
        CSSTransitionGroup,
        transProps,
        React.createElement(
          'div',
          innerProps,
          this.props.children
        )
      )
    );
  }
});

var Browser = React.createClass({
  displayName: 'Browser',
  getInitialState: function getInitialState() {
    return {
      path: []
    };
  },
  navUp: function navUp() {
    this.setState({ path: this.state.path.slice(0, -1) });
  },
  navDown: function navDown(index) {
    this.setState({ path: this.state.path.concat(index) });
  },
  render: function render() {
    var path = this.state.path;

    var items = path.reduce(function (items, key) {
      return items[key].children;
    }, this.props.items);

    return React.createElement(
      'div',
      { className: 'browser' },
      React.createElement(
        'h3',
        null,
        path.length > 0 ? React.createElement(
          'a',
          { onClick: this.navUp },
          '← Back'
        ) : 'Home'
      ),
      React.createElement(
        SlideTransition,
        { depth: path.length, className: 'items-container' },
        items.map(function (item, index) {
          var _this = this;

          if (item.children) {
            return React.createElement(
              'a',
              { className: 'item', onClick: function onClick(e) {
                  return _this.navDown(index);
                }, key: item.name },
              item.name
            );
          } else {
            return React.createElement(
              'div',
              { className: 'item', key: item.name },
              item.name
            );
          }
        }.bind(this))
      )
    );
  }
});

var data = [{ name: 'Animal', children: [{ name: 'Land', children: [{ name: 'Cheetah' }, { name: 'Ant' }] }, { name: 'Air', children: [{ name: 'Eagle' }] }, { name: 'Water', children: [{ name: 'Nessy' }] }] }, { name: 'Vegetable', children: [{ name: 'Broccoli' }, { name: 'IE6' }] }, { name: 'Mineral', children: [{ name: 'Granite' }, { name: 'Uraninite' }] }];

React.render(React.createElement(Browser, { items: data }), document.body);