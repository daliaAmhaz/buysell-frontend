import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";

import CreateadminModal from "../../components/modals/CreateAdminModal";
import { getAdmins, updateAdmin } from "../../actions/adminsAction";
import { AddBox } from "@material-ui/icons";
import {tableIcons} from "../../utils/tableIcons"
import Page from "../../components/Page";

const Admins = () => {
  const dispatch = useDispatch();

  const {isLoading} = useSelector((state) => state.auth);
  const [adminRows, setAdminRows] = useState([]);
  const [createAdminOpen, setCreateAdminOpen] = useState(false);

  const columns = [
    {
      title: "FirstName",
      field: "firstName",
      editable: "onUpdate",
    },
    {
      title: "LastName",
      field: "lastName",
      editable: "onUpdate",
        
    },
    {
      title: "Email",
      field: "email",
      editable: "never",
    },
  ];

  async function initAdmins() {
    getAdmins()
      .then((admins) => {
        console.log("admins", admins);
          const rows = admins
            ? admins.map((admin) => {
                return {
                  id: admin.id,
                  firstName: admin.firstName,
                  lastName: admin.lastName,
                  email: admin.email,
                };
                })
            : [];
          setAdminRows(rows);
      });
  }
  useEffect(() => {
    initAdmins();
  }, [isLoading]);

  const handleCreateAdminOpen = () => {
    setCreateAdminOpen(true);
  };

  const handleCreateAdminClose = () => {
    setCreateAdminOpen(false);
  };

  const handleUpdateAdmin = async (newData) => {
    if(!newData.firstName) {alert("firstName mandetory")}
    else {
      if(!newData.lastName) {alert("last name mandetory")}
      else {
        console.log("newData", newData);
        const updateAdminPayload = {
            id: newData.id,
            firstName: newData.firstName,
            lastName: newData.lastName,
        };

        await updateAdmin(updateAdminPayload);
        initAdmins();
      }
      
    }
    
  };

  return (
    <Page>
      <MaterialTable
        style={{overflowX: "auto", width: "96.5vw"}}
        icons={tableIcons}
        title="Manage admins"
        columns={columns}
        data={adminRows}
        actions={
          [
            {
              icon: () => <AddBox />,
              tooltip: "create new admin",
              position: "toolbar",
              onClick: () => {
                handleCreateAdminOpen();
              },
            },
          ]
        }
        editable={{
          onRowUpdate: (newData) => handleUpdateAdmin(newData),
        }}
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
      <CreateadminModal
        initAdmins={initAdmins}
        open={createAdminOpen}
        onClose={handleCreateAdminClose}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-modal"
      />
    </Page>
  );
};

export default Admins;