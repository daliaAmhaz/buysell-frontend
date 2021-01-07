import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useSelector } from 'react-redux';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Rating from '@material-ui/lab/Rating';
import { ProductDetailsDialog } from './modals/ProductDetailsDialog';
import Comments from './Comments';
import { createRating, getProductRatings } from '../actions/ratingsAction';

const ProductItem = ({product, initProducts, parentWidth, parentHeight, factor, classes}) => {
    const {user} = useSelector((state) => state.auth);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [rateAvg, setRateAvg] = React.useState(0);
    const [userRate, setUserRate] = React.useState(0);

    const handleDetailsModalOpen = () => {
        setIsDetailsDialogOpen(true);
    };

    async function updateProductRatings() {
        const ratings = await getProductRatings(product.id);
        const rateCount = ratings.length;
        let rateSum = 0;
        ratings.map((rating) => {
            rateSum = rateSum +rating.rate;
        })
        setRateAvg(rateSum !== 0 ? rateSum / rateCount : 0);
        
    }

    const handleUserRate = async (value) => {
        if(value) {
            const payload = {  
                rate: value,
                client_id: user.id,
                product_id: product.id
            }
            createRating({rating: payload, updateProductRatings});
            setUserRate(value);
        }else console.log("value", value);
    };

    useEffect(() => {
        const userRating= product.ratings.find((rating) => {
            return rating.client.id === user.id
        })
        setUserRate(userRating ? userRating.rate : 0);
    },[])

    useEffect(() => {
        const rateCount = product.ratings.length;
        let rateSum = 0;
        product.ratings.map((rating) => {
            rateSum = rateSum +rating.rate;
        })
        setRateAvg(rateSum !== 0 ? rateSum / rateCount : 0);
    },[])

    return (
        <>
            <GridListTile key={product.id} cols={1} style={{height:`${(parentHeight)}vh`, padding:"2px"}}>
                <img style={{width:`${(parentWidth / 3) - 2}vw`, height:`${(parentHeight / factor)}vh`}} src={`${process.env.REACT_APP_BACKEND_BASEURL}images/${product.imageName}`} alt={product.name} />
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>{`created at: ${moment(new Date(product.createdAt)).format('YYYY/MM/DD')}`}</span>}
                    titlePosition="top"
                    actionIcon={
                        <IconButton
                            className={classes.expand}
                            onClick={handleDetailsModalOpen}
                            aria-label="show more"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    actionPosition="right"
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                />
                <GridListTileBar
                    className={classes.gridListTileBar}
                    subtitle={<span>{`Price: ${product.price}$`}</span>}
                    titlePosition="bottom"
                    actionIcon={
                        <>
                            <div><Rating name={`uncontrolledRating${product.id}`} value={rateAvg} readOnly/></div>
                            {
                                user.id !== product.client.id && user.userType.localeCompare("ADMIN") !== 0 &&(
                                <Rating
                                    name={`controlledRating${product.id}`}
                                    value={userRate}
                                    onChange={(event, newValue) => {
                                        handleUserRate(newValue);
                                    }}
                                />
                            )}
                        </>
                    }
                    actionPosition="right"
                    classes={{
                        root: classes.titleBarTransparent,
                    }}
                />
                <Comments product={product} parentHeight={parentHeight} factor={factor}/>
            </GridListTile>
            <ProductDetailsDialog
                product={product}
                open={isDetailsDialogOpen}
                handleClose={() => {
                    setIsDetailsDialogOpen(false);
                }}
            />
        </>
  );
}

export default ProductItem;