import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const currency = (n) => `$${Number(n || 0).toFixed(2)}`;
const shortDateTime = (d) => (d ? new Date(d).toLocaleString() : '');

const OrderRow = ({ order, index = 0, totalCount = 0 }) => {
  const created = shortDateTime(order.createdAt);
  const items = order.items || order.cartItems || [];
  const total = order.total ?? order.amount ?? 0;
  const displayNumber = totalCount ? totalCount - index : undefined;

  return (
    <Card variant="outlined" sx={{ mb: 2, px: 1, py: 0.5 }}>
      <CardHeader
        sx={{
          pb: 0.5,
          '& .MuiCardHeader-content': { minWidth: 0 },
          '& .MuiCardHeader-action': { alignSelf: 'center', mt: 0 },
        }}
        title={
          <Typography variant="subtitle1" noWrap>
            {displayNumber ? `Order #${displayNumber}` : `Order ${order._id?.slice(-6) || ''}`}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary" noWrap>
            Placed on: {created}
          </Typography>
        }
      />

      <CardContent sx={{ pt: 0.5, pb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Total: {currency(total)}
        </Typography>

        <List dense disablePadding>
          {items.map((item, i) => (
            <React.Fragment key={item.productId || item._id || i}>
              <ListItem disableGutters sx={{ py: 0.25 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                  primary={`${item.title} - ${currency(item.price)} × ${item.quantity}`}
                  secondary={item.discount ? `Discount: ${item.discount}%` : null}
                />
              </ListItem>
              {i < items.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OrderRow;