import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { getClients} from "../../actions/clientsAction";
import {tableIcons} from "../../utils/tableIcons"
import Page from "../../components/Page";

const Clients = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [clientRows, setClientRows] = useState([]);


  const columns = [
    {
      title: "FirstName",
      field: "firstName",
      editable: "never",
    },
    {
      title: "LastName",
      field: "lastName",
      editable: "never",
    },
    {
      title: "Email",
      field: "email",
      editable: "never",
    },
    {
      title: "Phone number",
      field: "phoneNumber",
      editable: "never",
    },
  ];

  async function initClients() {
    getClients()
      .then((clients) => {
        console.log("clients", clients);
          const rows = clients
            ? clients.map((client) => {
                return {
                  id: client.id,
                  firstName: client.firstName,
                  lastName: client.lastName,
                  email: client.email,
                  phoneNumber: client.phoneNumber,
                };
                })
            : [];
          setClientRows(rows);
      });
  }
  useEffect(() => {
    initClients();
  }, [isLoading]);


  return (
    <Page>
      <MaterialTable
        style={{overflowX: "auto", width: "96.5vw"}}
        icons={tableIcons}
        title="clients"
        columns={columns}
        data={clientRows}
        options={{
          actionsColumnIndex: -1,
          pageSize: 20,
          paging: false,
          search: false,
          pageSizeOptions: [20, 50],
          maxBodyHeight: "70vh",
          minBodyHeight: "70vh",
          headerStyle:{backgroundColor: "#5a5454"},
          rowStyle:(rowData, index) => {
            if (index % 2 === 0)
              return {backgroundColor: "#959393"}
            else 
              return {backgroundColor: "#e6dfdf"}
          }
        }}
      />
    </Page>
  );
};

export default Clients;