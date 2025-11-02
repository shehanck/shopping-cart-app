import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserOrdersQuery } from '../../services/apiSlice';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';

const OrderHistory = () => {
  const token = useSelector((state) => state.auth.token);

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetUserOrdersQuery(undefined, { skip: !token });

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Order History
        </Typography>

         {!token && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Please login to view your orders.
          </Alert>
        )}

        {token && isLoading && (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {token && isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.data?.message || 'Failed to load orders'}
          </Alert>
        )}

        {token && !isLoading && !isError && (orders.length === 0 ? (
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
        ))}
      </Container>
    </>
  );
};

export default OrderHistory;
