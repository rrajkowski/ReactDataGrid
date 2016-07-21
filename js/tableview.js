/* ReactJS Table JSX Transpiler (Bable)  */
'use strict';

var TableView = React.createClass({
  getInitialeState: function() {
    this.state = {
      data: Immutable.List(),
      filteredData: Immutable.List(),
      sortingProp: 'id',
      sortingDirectionAsc: true
    }
  },
  componentWillMount: function() {
    this.setState({
      data: this.props.data,
      filteredData: this.props.data,
      sortingProp: 'id',
      sortingDirectionAsc: true
    });
  },
 /* componentWillReceiveProps: function(nextProps) {
    this.setState({
      data: this.nextProps.data
    });
  },*/
  statics: {
    // Custom event handlers
    sortBy: function (prop) {
      console.log('sortBy: ', prop);
      // TODO: replace $r with the TableView 'state'
      if (prop === $r.state.sortingProp) {
        if ($r.state.sortingDirectionAsc) {
          $r.setState({
            sortingDirectionAsc: false,
            data: TableView.sortDesc(prop)
          });
          return;
        } else {
          $r.setState({
            sortingDirectionAsc: true,
            data: TableView.sortAsc(prop)
          });
          return;
        }
      }
      $r.setState({
        sortingProp: prop,
        sortingDirectionAsc: true,
        data: TableView.sortAsc(prop)
      });
    },
    // Method to sort Ascending
    sortAsc: function(prop) {
      var data  = ($r.state.data.length > $r.state.filteredData.length) ? $r.state.filteredData :  $r.state.data;
      return data.sort(function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        }

        if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      });
    },

    // Method to sort Descending
    sortDesc: function(prop) {
      var data  = ($r.state.data.length > $r.state.filteredData.length) ? $r.state.filteredData :  $r.state.data;
      return data.sort(function (a, b) {
        if (a[prop] < b[prop]) {
          return 1;
        }

        if (a[prop] > b[prop]) {
          return -1;
        }

        return 0;
      });
    },
    // Method to Filter table row by column id
    filterBy: function(event) {
      event.preventDefault();
      var _this = this,
          value = event.target.value,
          filteredData = [],
          filterMap = {},
          list = Immutable.fromJS($r.state.data.length > $r.state.filteredData.length ? $r.state.filteredData : $r.state.data),
          $filterInput = $(".fixed-table__filterable-header input[type=text]");
      console.warn('filterBy: ', value);
      // rest map if filter is removed
      if (value === '') {
        filterMap = {};
        $r.setState({
          sortingProp: $r.sortingProp,
          sortingDirectionAsc: $r.sortingDirectionAsc,
          filteredData: $r.state.data
        });
      }

      // onchange on every field
      $filterInput.each(function (index) {
        var val = $(this).val(),
            id = this.id;
        if (val !== '' && id.length) {
          filterMap[id] = new RegExp(val, 'i');

          for (var f in filterMap) {
            filteredData = list.filter(function (item) {
              var filterItem = item.get(f);
              if (!filterItem) console.warn('[MPS Tables] malformed or missing filter id: ', id);
              if (filterItem && filterItem.toString().search(filterMap[f]) > -1) {
                return filterItem;
              }
            });
          }
        }
      });

      // update filtered state

      if (filteredData.size){
        setTimeout(function () {
          console.warn('filtered count: ', Immutable.List(filteredData.toJS()).size);
          $r.setState({
            sortingProp: $r.sortingProp,
            sortingDirectionAsc: $r.sortingDirectionAsc,
            filteredData: $.map(filteredData.toJS(), function (val, i) {
              return [val];
            })
          });
        }, 100)
      }
    },
    clearFilter: function(){
      console.log('[MPS Tables] Clear Table Filter');
      $(".fixed-table__filterable-header input[type=text]").val('');
      $r.setState({
        data: $r.props.data,
        filteredData: $r.props.data,
        sortingProp: 'id',
        sortingDirectionAsc: true
      });
    }
  }, //end statics
  render: function() {
    var data  = (this.state.data.length > this.state.filteredData.length) ? this.state.filteredData :  this.state.data;
    console.log('data:',data.length);
    return(
        <div className="fixed-table" >
        <div className="fixed-table__body" >
        <FixedTableHeader />
        <div className="fixed-table__list" >
        {data.map(function(item, i) {
          return(
           <div key={i} className="fixed-table__row" >
           <div className="fixed-table__col" >{ item.id }</div>
           <div className="fixed-table__col" >{ item.first_name }</div>
           <div className="fixed-table__col" >{ item.last_name }</div>
           <div className="fixed-table__col" >{ item.email }</div>
           <div className="fixed-table__col" >{ item.country }</div>
           <div className="fixed-table__col" >{ item.ip_address }</div>
           </div>)
        })}
      </div>
      </div>
      </div>)
  }
});

var FixedTableHeader = React.createClass({
  render: function() {
    return (

          <div className="fixed-table__header" >
            <div className="fixed-table__title-header" >
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'id')} >Id</div>
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'first_name')} >First Name</div>
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'last_name')} >Last Name</div>
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'email')} >Email</div>
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'country')} >Country</div>
              <div className="fixed-table__th" onClick={TableView.sortBy.bind(this, 'ip_address')} >Ip address</div>
            </div>
            <div className="fixed-table__filterable-header" >
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="Id" type="text" id="id"/>
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="First Name" type="text" id="first_name"/>
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="Last Name" type="text" id="last_name"/>
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="Email" type="text" id="email"/>
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="Country" type="text" id="country"/>
              <input className="fixed-table__fh" onChange={TableView.filterBy.bind(this)} placeholder="Ip address" type="text" id="ip_address"/>
              <input className="fixed-table__fh btn" onClick={TableView.clearFilter.bind(this)} type="button" id="clear" value="Clear"/>
            </div>
        </div>
    )
  }
});

$.get('data/data.json', function (data) {
  ReactDOM.render(
        <TableView data={data} />,
    document.getElementById('container')
  );
}).fail(function(err) {
  console.warn('[MPS Tables] Failed to fetch data: ', err.status + ':' + err.statusText);
});