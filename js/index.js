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
              { className: 'item', key: item },
              item
            );
          }
        }.bind(this))
      )
    );
  }
});

var data = [{"name":"English","children":[{"name":"Need help on Immigration","children":["Need legal advice - Go to Bristol Refugee Rights Aid centre on Wedenessday (10am to 12:30pm) and Thursday (10am to 3pm) http://www.bristolrefugeerights.org/what-we-do/welcome-centre/ - Call Borderlands on 07718 598 188 or visit on Monday (10am to 12noon) and Tuesday (10am to 3pm) http://borderlands.uk.com/contact-us/ - Make an appointment",{"name":"Need solicitor","children":["Go to Bristol Refugee Rights Aid centre on Wedenessday (10am to 12:30pm) and Thursday (10am to 3pm) http://www.bristolrefugeerights.org/what-we-do/welcome-centre/","Call Borderlands on 07718 598 188 or visit on Monday (10am to 12noon) and Tuesday (10am to 3pm) http://borderlands.uk.com/contact-us/","Call Avon and Bristol Law Centre on  0117 924 8662 or visit them http://www.ablc.org.uk/immigration.html"]},{"name":"Can't read a letter","children":["Go to Bristol Refugee Rights Aid centre on Wedenessday (10am to 12:30pm) and Thursday (10am to 3pm) http://www.bristolrefugeerights.org/what-we-do/welcome-centre/"]},"Need help with interviwes","Go to Bristol Refugee Rights Aid centre on Wedenessday (10am to 12:30pm) and Thursday (10am to 3pm) http://www.bristolrefugeerights.org/what-we-do/welcome-centre/",{"name":"Need help for filling up forms/writing letters","children":["http://www.bristolrefugeerights.org/"]},{"name":"Make an appointment","children":[{"name":"NAME","children":[]},{"name":"PHONE NO.","children":[]},{"name":"PROBLEM","children":[]},{"name":"PREFERRED ORGANISATION","children":[]}]}]},{"name":"Need help with health issues","children":["Find/register with GP","Mental health issues","Disability","Pregnancy","Appointemnt with hospital/GP","Find the hospital"]},{"name":"Need help with Housing","children":["I am asylum seeker. Need accommodation","I am refugee. Need Accommodation","I need night shelter","I have a house. Need help"]},{"name":"Need help with education","children":["Want to learn English","Want to enroll in college","Want to study in university","Want help with other courses"]},{"name":"Need help with food","children":["Where to get hot meals","Find food bank"]},{"name":"Need a creche","children":[]},{"name":"Need a space for recreation/games","children":[]}]},{"name":"Kurdish","children":[{"name":"پێویستیم به‌ هاوکارییه‌ له‌ بواری په‌نابه‌رییدا","children":["پێویستیم به‌ ئامۆژگاری یاساییه‌","سه‌ردانی بریستۆڵ ڕه‌فیوجی ڕایتس به‌شی ئه‌یید بکه‌ له‌ ڕۆژانی چوار شه‌ممه‌ ۱۰ به‌یانی بۆ۱۲،۳۰ دوانیوه‌ڕۆ وه‌ پێنج شه‌ممه‌ ۱۰ به‌یانی بۆ ۳ دوانیوه‌ڕۆ - http://www.bristolrefugeerights.org/what-we-do/welcome-centre/ - په‌یوه‌ندی بکه‌ به‌ بۆرده‌لاند ۰۷۷۱۸ ۵۹۸ ۱۸۸ یاخود سه‌ردانیان بکه‌ له‌ ڕۆژانی دوو شه‌ممه‌ ۱۰به‌یانی بۆ۱۲نیوه‌ڕۆ وه‌ سێ شه‌ممه‌ ۱۰به‌یانی بۆ  دوانیوه‌ڕۆ http://borderlands.uk.com/contact-us/ - درووستکردنی یه‌کتر بینین / مه‌وعید","پێویستیم به‌ بینینی پارێزه‌ره‌ / محامی - سه‌ردانی بریستۆڵ ڕه‌فیوجی ڕایتس به‌شی ئه‌یید بکه‌ له‌ ڕۆژانی چوار شه‌ممه‌ ۱۰ به‌یانی بۆ۱۲،۳۰ دوانیوه‌ڕۆ وه‌ پێنج شه‌ممه‌ ۱۰ به‌یانی بۆ ۳ دوانیوه‌ڕۆ http://www.bristolrefugeerights.org/what-we-do/welcome-centre/ - په‌یوه‌ندی بکه‌ به‌ بۆرده‌لاند ۰۷۷۱۸ ۵۹۸ ۱۸۸ یاخود سه‌ردانیان بکه‌ له‌ ڕۆژانی دوو شه‌ممه‌ ۱۰به‌یانی بۆ۱۲نیوه‌ڕۆ وه‌ سێ شه‌ممه‌ ۱۰به‌یانی بۆ دوانیوه‌ڕۆ http://borderlands.uk.com/contact-us/ - په‌یوه‌ندی بکه‌ به‌ ئه‌یڤن بریستۆڵ له‌و سه‌نته‌ر  ۸٦٦۲ ۹۲٤ ۰۱۱۷ یاخود سه‌ردانیان بکه‌://www.ablc.org.uk/immigration.html",{"name":"ناتوانم نامه‌کانم بخوێنمه‌وه‌ یاخود لێی تێبگه‌م","children":["سه‌ردانی بریستۆڵ ڕه‌فیوجی ڕایتس به‌شی ئه‌یید بکه‌ له‌ ڕۆژانی چوار شه‌ممه‌ ۱۰ به‌یانی بۆ۱۲،۳۰ دوانیوه‌ڕۆ وه‌ پێنج شه‌ممه‌ ۱۰ به‌یانی بۆ ۳ دوانیوه‌ڕۆ http://www.bristolrefugeerights.org/what-we-do/welcome-centre/"]},"پێویستیم به‌ یارمه‌تیه‌ له‌ بواری ئه‌نته‌رڤیووه‌که‌م","سه‌ردانی بریستۆڵ ڕه‌فیوجی ڕایتس به‌شی ئه‌یید بکه‌ له‌ ڕۆژانی چوار شه‌ممه‌ ۱۰ به‌یانی بۆ۱۲،۳۰ دوانیوه‌ڕۆ وه‌ پێنج شه‌ممه‌ ۱۰ به‌یانی بۆ ۳ دوانیوه‌ڕۆ http://www.bristolrefugeerights.org/what-we-do/welcome-centre/","پێویستیم به‌ یارمه‌تیه‌ له‌ پڕکردنه‌وه‌ی فۆڕم یاخود نوسینی نامه‌دا - http://www.bristolrefugeerights.org/","دروستکردنی  یه‌کتربینین / مه‌وعید - ناو - ژماره‌ی ته‌له‌ فون - جۆری کێشه‌ - ئه‌و ڕێخراوه‌ی که‌ پێویستت پێیه‌تی"]},"پێویستیم به‌ یارمه‌تیه‌ له‌ بواری ته‌ندروستیدا - دۆزینه‌وه‌ی/ ناونوسکردن پزیشکی خێزانی ( جی پی ) - بواری نه‌خۆشی ده‌روونی - که‌م ئه‌ندام/ که‌سانی پێداویستی تایبه‌ت -  ئافره‌تانی سکپڕ/ دووگیان - سه‌ردان / مه‌وعید  نه‌خۆشخانه‌  یاخود  جی پی - دۆزینه‌وه‌ی نه‌خۆشخانه‌ و بنکه‌ ته‌ندروستیه‌کان","پێویستیم به‌ یارمه‌تیه‌ له‌ بواری خانووبه‌ره‌ و نیشته‌جێ بووندا - من په‌نابه‌رم ( ئه‌سایله‌م سیکه‌ )  و پێویستیم به‌ خانوی نیشته‌جێ بوونه‌ - من  په‌نابه‌رم و پێویستیم به‌ خانوی نیشته‌جێ بوونه‌ -  پێویستیم به‌ شو ێنی خه‌وی کاتییه‌ ( نایت شه‌ڵته‌ره‌ ) - I have a house. Need help",{"name":"Need help with education","children":["Want to learn English","Want to enroll in college","Want to study in university","Want help with other courses"]},{"name":"Need help with food","children":["Where to get hot meals","Find food bank"]},{"name":"Need a creche","children":[]},{"name":"Need a space for recreation/games","children":[]}]}]

React.render(React.createElement(Browser, { items: data }), document.body);
