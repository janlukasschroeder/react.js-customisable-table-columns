import React from "react";
import { Table, Button } from "antd";
import data from "./data.json";
import allColumns from "./Columns";

const activeColumns = columns =>
  columns.filter(c => c.active).map(c => c.column);

export default class StaffTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: allColumns,
      table: {
        loading: false,
        size: "small"
      }
    };
    this.toggleColumn = this.toggleColumn.bind(this);
    this.ToggleColumn = this.ToggleColumn.bind(this);
  }

  componentDidMount() {}

  toggleColumn(id) {
    const columns = this.state.columns.map(c => {
      c.active = c.id === id ? !c.active : c.active;
      return c;
    });
    this.setState({ columns });
  }

  ToggleColumn({ id, children }) {
    const active = (this.state.columns.find(c => c.id === id) || {}).active;
    return (
      <Button onClick={() => this.toggleColumn(id)}>
        <input type="checkbox" checked={active} /> &nbsp; {children}
      </Button>
    );
  }

  render() {
    const { ToggleColumn } = this;
    return (
      <>
        <h2>Table</h2>
        {this.state.columns.map(c => (
          <ToggleColumn id={c.id}>{c.column.title || c.title}</ToggleColumn>
        ))}

        <Table
          columns={activeColumns(this.state.columns)}
          dataSource={data.data.allPeople.people}
          {...this.state.table}
        />
      </>
    );
  }
}
