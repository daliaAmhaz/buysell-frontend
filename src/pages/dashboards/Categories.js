import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { createCategory, deleteCategory, getCategories, updateCategory } from "../../actions/categoriesAction";
import {tableIcons} from "../../utils/tableIcons"
import Page from "../../components/Page";

const Categories = () => {

  const {isLoading} = useSelector((state) => state.auth);
  const [categoryRows, setCategoryRows] = useState([]);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  async function initCategories() {
    getCategories()
      .then((categories) => {
          console.log("categories", categories);
            const rows = categories
              ? categories.map((category) => {
                  return {
                      id: category.id,
                      name: category.name,
                  };
                  })
              : [];
            setCategoryRows(rows);
      });
  }
  useEffect(() => {
    initCategories();
  }, [isLoading]);

  const handleCreateCategory = async (newData) => {
    const payload = {
        name: newData.name,
    };
    try {
      const status = await createCategory(payload);
      if (status === 201) {
        alert("Category successfully created")
        initCategories();
      }
    } catch (error) {
      alert("Failed to create category")
    }
  };

  const handleUpdateCategory = async (newData) => {
    console.log("newData", newData);
    const updateCategoryPayload = {
      id: newData.id,
      name: newData.name,
    };

    await updateCategory(updateCategoryPayload);
    initCategories();
  };

  const handleDeletecategory = async (oldData) => {
    await deleteCategory(oldData.id);
    initCategories();
  };

  return (
    <Page>
      <MaterialTable
        style={{overflowX: "auto", width: "96.5vw"}}
        icons={tableIcons}
        title="Manage categories"
        columns={columns}
        data={categoryRows}
        editable={{
          onRowAdd: (newData) => handleCreateCategory(newData),
          onRowUpdate: (newData) => handleUpdateCategory(newData),
          onRowDelete: (oldData) => handleDeletecategory(oldData),
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
    </Page>
  );
};

export default Categories;