/* ReactJS Table w/o JSX/Babel  */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FixedTable = function (_React$Component) {
  _inherits(FixedTable, _React$Component);

  function FixedTable(){};

  FixedTable.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      data: this.props.data,
      filteredData: this.props.data,
      sortingProp: 'id',
      sortingDirectionAsc: true
    });
  };

  FixedTable.prototype.componentDidMount = function componentDidMount() {

  };

  FixedTable.prototype.componentWillReceiveProps = function componentWillReceiveProps() {

  };

  FixedTable.prototype.scrollBodyListHeader = function scrollBodyListHeader(event) {
    ReactDOM.findDOMNode(this.refs.bodyListHeader).style.left = -event.target.scrollLeft + 'px';
  };

  FixedTable.prototype.sortAsc = function sortAsc(prop) {
    var data  = (this.state.data.length > this.state.filteredData.length) ? this.state.filteredData :  this.state.data;
    return data.sort(function (a, b) {
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
    var data  = (this.state.data.length > this.state.filteredData.length) ? this.state.filteredData :  this.state.data;
    return data.sort(function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      }

      if (a[prop] > b[prop]) {
        return -1;
      }

      return 0;
    });
  };


  // Method to Sort table columns
  FixedTable.prototype.sortBy = function sortBy(prop) {
    if (prop === this.state.sortingProp) {
      if (this.state.sortingDirectionAsc) {
        this.setState({
          sortingDirectionAsc: false,
          data: this.sortDesc(prop)
        });
        return;
      } else {
        this.setState({
          sortingDirectionAsc: true,
          data: this.sortAsc(prop)
        });
        return;
      }
    }
    this.setState({
      sortingProp: prop,
      sortingDirectionAsc: true,
      data: this.sortAsc(prop)
    });
  };


  // Method to Filter table row by column id
  FixedTable.prototype.filterBy = function filterBy(event) {
    event.preventDefault();
    var _this = this,
        value = event.target.value,
        filteredData = [],
        filterMap = {},
        list = Immutable.fromJS(this.state.data.length > this.state.filteredData.length ? this.state.filteredData :  this.state.data),
        $filterInput = $(".fixed-table__filterable-header input[type=text]"),
        len = $filterInput.length;

    // rest map if filter is removed
    if(value === ''){
      filterMap = {};
      list = Immutable.fromJS(this.state.data);
    }

    // onchange on every field
    $filterInput.each(function (index) {
      var val = $(this).val(),
          id = this.id;
      if (val !== '' && id.length) {
        filterMap[id] = new RegExp(val, 'i');

        for(var f in filterMap) {
          filteredData = list.filter(function (item) {
              var filterItem = item.get(f);
              if(!filterItem) console.warn('[MPS Tables] malformed or missing filter id: ',id);
              if (filterItem && filterItem.toString().search(filterMap[f]) > -1) {
                return filterItem;
              }
          });
        }
      }
    });


    // update filtered state
    this.setState({
      sortingProp: this.sortingProp,
      sortingDirectionAsc: this.sortingDirectionAsc,
      filteredData: $.map(filteredData.toJS(), function(val, i) { return [val]; })
    });

  };


  // Clear filters
  FixedTable.prototype.clearFilter = function clearFilter(event){
    event.preventDefault();
    console.log('[MPS Tables] Clear Table Filter',this.state.filteredData);
    $(".fixed-table__filterable-header input[type=text]").val('');
    this.setState({
      data: this.props.data,
      filteredData: this.props.data,
      sortingProp: 'id',
      sortingDirectionAsc: true
    });
  };


  FixedTable.prototype.renderList = function renderList() {
    var data  = (this.state.data.length > this.state.filteredData.length) ? this.state.filteredData :  this.state.data;
    var rowheaders = data.map(function(i, index) {
      return React.createElement('div', {
            key: index,
            className: 'fixed-table__row'
          },
          React.createElement('div', {
            className: 'fixed-table__col'
          }, i.id),
          React.createElement('div', {
            className: 'fixed-table__col'
          }, i.first_name), React.createElement('div', {
            className: 'fixed-table__col'
          }, i.last_name), React.createElement('div', {
            className: 'fixed-table__col'
          }, i.email), React.createElement('div', {
            className: 'fixed-table__col'
          }, i.country), React.createElement('div', {
            className: 'fixed-table__col'
          }, i.ip_address));
    });
    return React.createElement('div', { ref: 'fixedTableBodyList',
      className: 'fixed-table__list' }, rowheaders);
  };


  FixedTable.prototype.render = function render() {
  return React.createElement('div', {
    className: 'fixed-table'
  }, React.createElement('div', {
      className: 'fixed-table__body'
    }, React.createElement('div', {
        className: 'fixed-table__header'
      }, React.createElement('div', {
        ref: 'bodyListHeader',
        className: 'fixed-table__title-header'
        }, React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'id')
        }, 'Id'), React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'first_name')
        }, 'First Name'), React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'last_name')
        }, 'Last Name'), React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'email')
        }, 'Email'), React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'country')
        }, 'Country'), React.createElement('div', {
          className: 'fixed-table__th',
          onClick: this.sortBy.bind(this, 'ip_address')
        }, 'Ip Address')),
      React.createElement('div', {
        ref: 'bodyFilterHeader',
        className: 'fixed-table__filterable-header'
        }, React.createElement('input', {
          type: 'text',
          className: 'fixed-table__fh',
          placeholder: 'Id',
          id: 'id',
          onChange: this.filterBy.bind(this)
        }), React.createElement('input', {
          type: 'text',
          className: 'fixed-table__fh',
          placeholder: 'First Name',
          id: 'first_name',
          onChange: this.filterBy.bind(this)
        }), React.createElement('input', {
          type: 'text',
          className: 'fixed-table__th',
          placeholder: 'Last Name',
          id: 'last_name',
          onChange: this.filterBy.bind(this)
        }), React.createElement('input', {
          type: 'text',
          className: 'fixed-table__fh',
          placeholder: 'Email',
          id: 'email',
          onChange: this.filterBy.bind(this)
        }), React.createElement('input', {
          type: 'text',
          className: 'fixed-table__fh',
          placeholder: 'Country',
          id: 'country',
          onChange: this.filterBy.bind(this)
        }), React.createElement('input', {
          type: 'text',
          className: 'fixed-table__fh',
          placeholder: 'IP Address',
          id: 'ip_address',
          onChange: this.filterBy.bind(this)
        }),
        React.createElement('input', {
          type: 'button',
          value: 'Clear',
          className: 'fixed-table__fh btn',
          onClick: this.clearFilter.bind(this)
        }))),
    this.renderList()
    ));
  };
  return FixedTable;
}(React.Component);

FixedTable.propTypes = {
  data: React.PropTypes.array.isRequired,
  filteredData: React.PropTypes.array
};


// get JSON array from file/endpoint
$.get('data/data.json', function (data) {
  ReactDOM.render(React.createElement(FixedTable, { data: data, filteredData: Immutable.fromJS(data) }), document.querySelector('#container'));
  //console.log(JSON.stringify(data));
});
