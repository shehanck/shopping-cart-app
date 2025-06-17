import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';

const OrderHistory = () => {
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.get('/orders/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, [token]);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Order History
        </Typography>

        {orders.length === 0 ? (
          <Typography>No orders yet.</Typography>
        ) : (
          orders.map((order, index) => (
            <Card key={order._id} variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  Order #{orders.length - index}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Total: ${order.total.toFixed(2)}
                </Typography>

                <List dense>
                  {order.items.map((item) => (
                    <React.Fragment key={item.productId}>
                      <ListItem disableGutters>
                        <ListItemText
                          primary={`${item.title} - $${item.price} × ${item.quantity}`}
                          secondary={item.discount ? `Discount: ${item.discount}%` : null}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default OrderHistory;
