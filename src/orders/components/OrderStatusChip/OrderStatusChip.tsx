import StatusChip from "@saleor/components/StatusChip";
import { transformOrderStatus } from "@saleor/misc";
import { OrderDetails_order } from "@saleor/orders/types/OrderDetails";
import React from "react";
import { useIntl } from "react-intl";

interface OrderStatusChipProps {
  order?: OrderDetails_order;
}

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ order }) => {
  const intl = useIntl();

  if (!order) {
    return null;
  }

  const { localized: message, status } = transformOrderStatus(
    order.status,
    intl
  );

  return (
    <StatusChip
      size="md"
      status={status}
      label={intl.formatMessage({
        defaultMessage: message,
        description: "status chip label"
      })}
    />
  );
};

export default OrderStatusChip;
