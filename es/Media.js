var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import json2mq from 'json2mq';

/**
 * Conditionally renders based on whether or not a media query matches.
 */

var Media = function (_React$Component) {
  _inherits(Media, _React$Component);

  function Media() {
    var _temp, _this, _ret;

    _classCallCheck(this, Media);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      matches: _this.props.defaultMatches
    }, _this.updateMatches = function () {
      return _this.setState({ matches: _this.mediaQueryList.matches });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Media.prototype.componentWillMount = function componentWillMount() {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;

    var query = this.props.query;


    if (typeof query !== 'string') query = json2mq(query);

    this.mediaQueryList = window.matchMedia(query);
    this.mediaQueryList.addListener(this.updateMatches);
    this.updateMatches();
  };

  Media.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  };

  Media.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        render = _props.render;
    var matches = this.state.matches;


    return render ? matches ? render() : null : children ? typeof children === 'function' ? children(matches) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
    matches ? React.Children.only(children) : null : null : null;
  };

  return Media;
}(React.Component);

Media.propTypes = {
  defaultMatches: PropTypes.bool,
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.arrayOf(PropTypes.object.isRequired)]).isRequired,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
Media.defaultProps = {
  defaultMatches: true
};


export default Media;