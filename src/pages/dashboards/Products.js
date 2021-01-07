import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";

import { createProduct, deleteProduct, getClientProducts, getProducts, updateProduct} from "../../actions/productsAction";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {tableIcons} from "../../utils/tableIcons"
import { CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import Comments from "../../components/Comments";
import { MyMapComponent } from "../../components/Map";
import { Autocomplete, Rating } from "@material-ui/lab";
import { getClients } from "../../actions/clientsAction";
import { getCategories } from "../../actions/categoriesAction";


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});


const ItemsList = ({ items }) => {
    return (
      <List dense>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    );
  };

const Products = ({client_id}) => {
  const classes = useStyles();

  const {isLoading, user} = useSelector((state) => state.auth);
  const [productRows, setProductRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadedImageError, setUploadedImageError] = useState("");

  let isSoldToUpdate = null;
  let isNegotiableToUpdate = null;
  let categoriesToUpdate = [];
  let imageToUpdate = null;

  function setIsSoldToUpdate(v) {
    isSoldToUpdate = v;
  }
  function setIsNegotiableToUpdate(v) {
    isNegotiableToUpdate = v;
  }
  function setCategoriesToUpdate(v) {
    categoriesToUpdate = v;
  }
  function setImageToUpdate(v) {
    imageToUpdate = v;
  }

  async function initCategories() {
    getCategories()
      .then((categoriesRes) => {
        setCategories(categoriesRes);
      });
  }
  useEffect(() => {
    initCategories();
  }, [isLoading]);

  function handleUploadFile(e) {
    const uploadedFile = e.target.files[0];

    const { type, size } = uploadedFile;
    const fileExtension = type.split("/").pop();
    let flag = true;
    switch (fileExtension) {
        case "png":
        case "jpeg":
        case "jpg":
        if (size > 20 * 1000 * 1000) {
            setUploadedImageError(
            "the file size of type image should be maximum of 20MB"
            );
            flag = false;
            e.target.value = null;
        }
        break;
        default:
            setUploadedImageError(
                "file type should be image(png/jpg/jpeg)"
            );
            flag = false;
            e.target.value = null;
    }
    if (uploadedFile && flag) {
        setUploadedImageError("");
        setImageToUpdate(uploadedFile);
    }
  }

  const columns = [
    {
      title: "name",
      field: "name",
    },
    {
      title: "description",
      field: "description",
    },
    {
      title: "imageName",
      field: "imageName",
      render: (rowData) => (
        <CardMedia
          className={classes.media}
          image={`${process.env.REACT_APP_BACKEND_BASEURL}images/${rowData.imageName}`}
          title={rowData.name}
        />
      ),
      editComponent: ({value}) => {
        return (
          <>
            <input
              id="upload-image-file"
              name="upload-image-file"
              type="file"
              onChange={(e) => handleUploadFile(e)}
            />
            <Typography color="error">{uploadedImageError}</Typography>
          </>
        );
      }
    },    
    {
      title: "price",
      field: "price",
      type: 'numeric',
    },
    {
      title: "latitude",
      field: "latitude",
      // editComponent: ({value}) => {
      //   return (
      //     <div style={{width:"10vw"}}>
      //        <MyMapComponent
      //         product={value}
      //         isMarkerShown
      //         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN5OsEo4X3nhZRqULlCjBJY2wYocAzrFI&v=3.exp&libraries=geometry,drawing,places"
      //         loadingElement={<div style={{ height: `100%` }} />}
      //         containerElement={<div style={{ height: `400px` }} />}
      //         mapElement={<div style={{ height: `100%` }} />}
      //       />
      //     </div>
      //   );
      // }
    },
    {
      title: "longitude",
      field: "longitude",//
    },  
    {
      title: "remaining",
      field: "remaining",
      type: 'numeric',
    },
    {
      title: "isSold",
      field: "isSold",
      editable: "onUpdate",
      render: (rowData) => (
        rowData.isSold ? "True" : "False"
      ),
      editComponent: ({value}) => {
        return (
          <Autocomplete
            id="checkboxes-isSold"
            options={[{id:1, name: "True", value: true},{id: 0, name: "False", value: false}]}
            defaultValue={value ? {id:1, name: "True", value: true} : {id: 0, name: "False", value: false}}
            onChange={(e, v) => {
              setIsSoldToUpdate(v?.value)
            }}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="isSold" />
            )}
          />
        )
      }
    },
    {
      title: "isNegotiable",
      field: "isNegotiable",
      render: (rowData) => (
        rowData.isNegotiable ? "True" : "False"
      ),
      editComponent: ({value}) => {
        return (
          <Autocomplete
            id="checkboxes-isNegotiable"
            options={[{id:1, name: "True", value: true},{id: 0, name: "False", value: false}]}
            defaultValue={value ? {id:1, name: "True", value: true} : {id: 0, name: "False", value: false}}
            onChange={(e, v) => {
              setIsNegotiableToUpdate(v?.value)
            }}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="isNegotiable" />
            )}
          />
        )
      }
    },
    {
      title: "createdAt",
      field: "createdAt",
      editable: "never",
    },
    {
      title: "client",
      field: "client",
      editable: "never",
      render: (rowData) => (
        <List dense>
            <ListItem>
            <ListItemIcon>
                <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={rowData.client.firstName} />
            </ListItem>
            <ListItem>
            <ListItemIcon>
                <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={rowData.client.email} />
            </ListItem>
        </List>
      ),
    },
    {
      title: "ratings",
      field: "ratings",
      editable: "never",
      render: (rowData) => {
        const rateCount = rowData.ratings.length;
        let rateSum = 0;
        rowData.ratings.map((rating) => {
            rateSum = rateSum +rating.rate;
        })
        return (
          <Rating name={`uncontrolledRating${rowData.id}`} value={rateSum !== 0 ? rateSum / rateCount : 0} readOnly/>
      )},
    },
    {
      title: "categories",
      field: "categories",
      render: (rowData) => (
        <ItemsList items={rowData.categories} />
      ),
      editComponent: ({value}) => {
        return (
        <Autocomplete
          multiple
          id="checkboxes-categories"
          options={categories}
          disableCloseOnSelect
          defaultValue={value}
          onChange={(e, v) => {
            setCategoriesToUpdate(v)
          }}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="categories" />
          )}
        />
      )},
    },
  ];

  async function initProducts() {
    let products;
    if(client_id) {
      products = await getClientProducts(client_id);
    } else {
      products = await getProducts();
    }    
      console.log("products", products);
      const rows = products
        ? products.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              imageName: product.imageName,
              remaining: product.remaining,
              price: product.price,
              latitude: product.latitude,
              longitude: product.longitude,
              isSold: product.isSold,
              isNegotiable: product.isNegotiable,
              createdAt: product.createdAt,
              client: product.client,
              comments: product.comments,
              ratings: product.ratings,
              categories: product.categories,
            };
            })
        : [];
      setProductRows(rows);
  }
  useEffect(() => {
    initProducts();
  }, [isLoading]);

  const handleCreateProduct = async (newData) => {
    if(!newData.name || !newData.description) {alert("name and description mandetory")}
    else {
      if(newData.price > 10000000 || newData.price < 0) {alert("Price should be positive & less than or equal to 10,000,000")}
      else {
        if(newData.remaining < 0) {alert("remaining should be positive")}
        else {
          const payload = {
            name: newData.name,
            description: newData.description,
            image: imageToUpdate,
            remaining: newData.remaining,
            price: newData.price,
            latitude: newData.latitude,
            longitude: newData.longitude,
            isSold: false,
            isNegotiable: isNegotiableToUpdate !== null ? isNegotiableToUpdate : newData.isNegotiable,
            categories: categoriesToUpdate.length > 0 ? categoriesToUpdate : newData.categories,
          };
          try {
            const status = await createProduct(payload);
            if (status === 201) {
              console.log("Product successfully created")
              initCategories();
            }
          } catch (error) {
            console.log("Failed to create product")
          }
        }
      }      
    }    
  };
  const handleUpdateProduct = async (newData)=> {
    if(!newData.name || !newData.description) {alert("name and description mandetory")}
    else {
      if(newData.price > 10000000 || newData.price < 0) {alert("Price should be positive & less than or equal to 10,000,000")}
      else {
        if(newData.remaining < 0) {alert("remaining should be positive")}
        else {
          console.log("newData", newData);
          console.log("isSoldToUpdate", isSoldToUpdate);
          const updateProductPayload = {
              id: newData.id,
              name: newData.name,
              description: newData.description,
              image: imageToUpdate,
              remaining: newData.remaining,
              price: newData.price,
              latitude: newData.latitude,
              longitude: newData.longitude,
              isSold: isSoldToUpdate !== null ? isSoldToUpdate : newData.isSold,
              isNegotiable: isNegotiableToUpdate !== null ? isNegotiableToUpdate : newData.isNegotiable,
              categories: categoriesToUpdate.length > 0 ? categoriesToUpdate : newData.categories,
          };

          await updateProduct(updateProductPayload);
          initProducts();
        }
      }
    }    
  };

  
  const handleDeleteProduct = async (oldData) => {
    await deleteProduct(oldData.id);
    initProducts();
  };
  return (
    <Page>
      <MaterialTable
        style={{overflowX: "auto", width: "96.5vw"}}
        icons={tableIcons}
        title="products"
        columns={columns}
        data={productRows}
        editable={{
          isEditable: rowData => rowData.client.id === user.id,
          isDeletable: rowData => rowData.client.id === user.id, 
          ...user.userType.localeCompare("CLIENT") === 0 && {onRowAdd: (newData) => handleCreateProduct(newData)},
          onRowUpdate: (newData) => handleUpdateProduct(newData),
          onRowDelete: (oldData) => handleDeleteProduct(oldData),
        }}
        detailPanel={(rowData) => {
          return (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid xs={6}>
                <MyMapComponent
                  product={rowData}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN5OsEo4X3nhZRqULlCjBJY2wYocAzrFI&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Grid>
              <Grid xs={6}>
                <Comments product={rowData} />
              </Grid>
            </Grid>
          );
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

export default Products;