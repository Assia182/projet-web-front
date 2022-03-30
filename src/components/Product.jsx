import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from '@mui/material';
import './Product.css'
import { styled } from '@mui/material/styles';

let Logo = require("../assets/khol.jpg")


export default function Product(props) {
  const { product, onAdd } = props;
  const classes = useStyles();

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  
  return (
    <div>
      <Card className={classes.root}>
      <CardContent>
        <div className={classes.cardContent}>
        <Img className="photo" alt="complex" src={"images/" + product.imageProduct} />
          <Typography gutterBottom variant="h5" component="h2">
            {product.nameProduct}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.priceProduct} €
          </Typography>
          <IconButton style={{
                  backgroundColor: "#D6C29A"
              }} component="span" onClick={() => onAdd(product)}>
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
