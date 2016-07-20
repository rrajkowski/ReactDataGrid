/* ReactJS Table w/o JSX/Babel  */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FixedTable = function (_React$Component) {
  _inherits(FixedTable, _React$Component);

  function FixedTable(props) {
    _classCallCheck(this, FixedTable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      items: props.items,
      sortingProp: 'id',
      sortingDirectionAsc: true
    };

    _this.scrollSidebar = _this.scrollSidebar.bind(_this);
    _this.scrollBodyListHeader = _this.scrollBodyListHeader.bind(_this);
    return _this;
  }

  FixedTable.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var $fixedTableBodyList = ReactDOM.findDOMNode(this.refs.fixedTableBodyList);

    Ps.initialize($fixedTableBodyList);

    $fixedTableBodyList.addEventListener('ps-scroll-y', this.scrollSidebar);
    $fixedTableBodyList.addEventListener('ps-y-reach-start', function () {
      return _this2.scrollSidebar({ target: { scrollTop: 0 } });
    });
    $fixedTableBodyList.addEventListener('ps-scroll-x', this.scrollBodyListHeader);
    $fixedTableBodyList.addEventListener('ps-x-reach-start', function () {
      return _this2.scrollBodyListHeader({ target: { scrollLeft: 0 } });
    });
  };

  FixedTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.items,
      filteredItems: Immutable.List(),
      sortingProp: 'id',
      sortingDirectionAsc: true
    });
  };

  FixedTable.prototype.scrollSidebar = function scrollSidebar(event) {
    ReactDOM.findDOMNode(this.refs.sidebarList).style.top = -event.target.scrollTop + 'px';
  };

  FixedTable.prototype.scrollBodyListHeader = function scrollBodyListHeader(event) {
    ReactDOM.findDOMNode(this.refs.bodyListHeader).style.left = -event.target.scrollLeft + 'px';
  };

  FixedTable.prototype.sortAsc = function sortAsc(prop) {
    return this.state.items.sort(function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }

      if (a[prop] < b[prop]) {
        return -1;
      }

      return 0;
    });
  };

  FixedTable.prototype.sortDesc = function sortDesc(prop) {
    return this.state.items.sort(function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      }

      if (a[prop] > b[prop]) {
        return -1;
      }

      return 0;
    });
  };

  FixedTable.prototype.sortBy = function sortBy(prop) {
    if (prop === this.state.sortingProp) {
      if (this.state.sortingDirectionAsc) {
        this.setState({
          sortingDirectionAsc: false,
          items: this.sortDesc(prop)
        });
        return;
      } else {
        this.setState({
          sortingDirectionAsc: true,
          items: this.sortAsc(prop)
        });
        return;
      }
    }
    this.setState({
      sortingProp: prop,
      sortingDirectionAsc: true,
      items: this.sortAsc(prop)
    });
  };


  FixedTable.prototype.renderList = function renderList() {
    var items = this.state.items.map(function (i, index) {
      return React.createElement(
          'div',
          { key: index,
            className: 'fixed-table__row' },
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.id
          ),
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.first_name
          ),
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.last_name
          ),
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.email
          ),
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.country
          ),
          React.createElement(
              'div',
              { className: 'fixed-table__col' },
              i.ip_address
          )
      );
    });
    return React.createElement(
        'div',
        { ref: 'fixedTableBodyList',
          className: 'fixed-table__list'},
        items
    );
  };

  FixedTable.prototype.render = function render() {
    return React.createElement(
        'div',
        { className: 'fixed-table' },

        React.createElement(
            'div',
            { className: 'fixed-table__body' },
            React.createElement(
                'div',
                { className: 'fixed-table__header' },
                React.createElement(
                    'div',
                    { ref: 'bodyListHeader',
                      className: 'fixed-table__scrollable-header' },
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'id') },
                        'Id'
                    ),
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'first_name') },
                        'First Name'
                    ),
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'last_name') },
                        'Last Name'
                    ),
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'email') },
                        'Email'
                    ),
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'country') },
                        'Country'
                    ),
                    React.createElement(
                        'div',
                        { className: 'fixed-table__th',
                          onClick: this.sortBy.bind(this, 'ip_address') },
                        'Ip Address'
                    )
                )
            ),
            this.renderList()
        )
    );
  };

  return FixedTable;
}(React.Component);

FixedTable.propTypes = {
  data: React.PropTypes.array.isRequired
};


$.get('data/items.json', function (data) {
  ReactDOM.render(React.createElement(FixedTable, { data: data }), document.querySelector('#container'));
  //console.log(JSON.stringify(items));
});