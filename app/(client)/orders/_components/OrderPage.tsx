"use client";

import { Order } from "@/sanity.types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { formattedPrice } from "@/utils/helper";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";

const OrderPage = ({ order }: { order: Order }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const formatDate = (date: string) => {
    try {
      return moment(date).format("DD MMM YYYY");
    } catch {
      return "N/A";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-500 hover:bg-green-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "cancelled":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <>
      <TableRow
        className="hover:bg-slate-50"
        onClick={() => setSelectedOrder(order)}
      >
        {/* Order Number */}
        <TableCell className="font-medium">
          {order.orderNumber?.slice(0, 8)}...
        </TableCell>

        {/* Date - Hidden on mobile */}
        <TableCell className="hidden md:table-cell">
          {formatDate(order.orderDate || order._createdAt)}
        </TableCell>

        {/* Customer Name */}
        <TableCell>{order.customerName || "N/A"}</TableCell>

        {/* Email - Hidden on small screens */}
        <TableCell className="hidden sm:table-cell">
          {order.email || "N/A"}
        </TableCell>

        {/* Total Price */}
        <TableCell className="font-semibold">
          {formattedPrice(order.totalPrice) || "0.00"}
        </TableCell>

        {/* Status */}
        <TableCell>
          <Badge className={getStatusColor(order.status || "")}>
            {order.status?.toUpperCase() || "UNKNOWN"}
          </Badge>
        </TableCell>

        {/* Invoice Number - Hidden on small screens */}
        <TableCell className="hidden sm:table-cell">
          {order.invoice?.number || "N/A"}
        </TableCell>
      </TableRow>
      {selectedOrder && (
        <OrderDetailDialog
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default OrderPage;
