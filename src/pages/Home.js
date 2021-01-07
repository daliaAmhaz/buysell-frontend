import React, { useEffect, useState } from 'react';
import { getProducts } from '../actions/productsAction';
import ProductItem from '../components/ProductItem';
import Page from '../components/Page';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const parentWidth = 90;
const parentHeight = 78;
const factor = 2;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: `${parentWidth}vw`,
      height: "78vh",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleBarTransparent: {
      backgroundColor: 'transparent'
    },
    icon: {
      color: 'white',
    },
    title: {
        color: theme.palette.primary.light,
    },      
    expand: {
      color: 'white',
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    gridListTileBar: {
      marginBottom: `${parentHeight / factor}vh`
    }
  }),
);

const Home = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  async function initProducts() {
    getProducts()
      .then((products) => setProducts(products));
  }

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <Page>
      <div className={classes.root}>
        <GridList cols={3} className={classes.gridList}>
          { products && products.length !== 0 &&
              products.map(product => (
                <ProductItem
                  product={product}
                  key={product.id}
                  initProducts={initProducts}
                  parentWidth={parentWidth}
                  parentHeight={parentHeight}
                  factor={factor}
                  classes={classes}
                />
              
          ))}
        </GridList>
      </div>
    </Page>
  );
}

export default Home;