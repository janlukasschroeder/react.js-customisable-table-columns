import React from "react";
import { Dropdown, Menu, Popconfirm } from "antd";

const Id = () => ({
  title: "ID",
  key: "id",
  dataIndex: "id"
});

const Name = () => ({
  title: "Name",
  dataIndex: "name"
});

const BirthYear = () => ({
  title: "Birth Year",
  dataIndex: "birthYear"
});

const Homeworld = () => ({
  title: "Homeworld",
  dataIndex: "homeworld",
  render: homeworld => homeworld.name
});

const Movies = () => ({
  title: "Movies",
  dataIndex: "filmConnection",
  render: filmConnection => filmConnection.edges.map(e => e.node.title + ", "),
  width: 300
});

const ActionsMenu = user => (
  <Menu>
    <Menu.Item>
      <i className="far fa-envelope" />
      &nbsp; Invite
    </Menu.Item>

    <Menu.Divider />
    <Menu.Item key={"delete" + user.id}>
      <Popconfirm
        title="Do you want to delete this user?"
        onConfirm={() =>
          this.props.deleteUser(user, () =>
            this.props.getUsers({ withTags: true, withRoleInstances: true })
          )
        }
        onCancel={() => console.log("Cancel delete")}
        okText="Yes"
        cancelText="No"
      >
        <i className="fa fa-trash-alt" /> &nbsp; Delete
      </Popconfirm>
    </Menu.Item>
  </Menu>
);

const ActionsRender = user => {
  return (
    <Dropdown overlay={ActionsMenu(user)}>
      <button className="ant-dropdown-link">Action</button>
    </Dropdown>
  );
};

const Actions = () => ({
  title: "",
  key: "actions",
  render: ActionsRender
});

const allColumns = [
  { position: 0, active: true, column: Id(), id: "id" },
  { position: 1, active: true, column: Name(), id: "name" },
  { position: 2, active: true, column: BirthYear(), id: "birthYear" },
  { position: 3, active: true, column: Homeworld(), id: "homeworld" },
  { position: 4, active: true, column: Movies(), id: "Movies" },
  // { position: 3, active: true, column: ColumnMobile(), name: "Mobile" },
  // { position: 4, active: true, column: ColumnRole(), name: "Roles" },
  {
    position: 5,
    active: true,
    column: Actions(),
    id: "actions",
    title: "Actions"
  }
  // { position: 6, active: false, column: ColumnCreatedAt(), name: "CreatedAt" },
  // { position: 7, active: false, column: ColumnUpdatedAt(), name: "UpdatedAt" }
];

const sortColumns = columns => columns.sort((a, b) => a.position - b.position);

export default sortColumns(allColumns);
