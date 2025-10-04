"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Mail,
  User,
  Package,
  CreditCard,
  FileText,
  ExternalLink,
  MapPin,
} from "lucide-react";
import moment from "moment";
import { formattedPrice } from "@/utils/helper";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog = ({ order, isOpen, onClose }: Props) => {
  if (!order) return null;

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

  const InfoRow = ({ icon: Icon, label, value, className = "" }: any) => (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p
          className={`text-sm font-medium text-gray-900 break-words ${className}`}
        >
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                Order Details
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(order.status || "")}>
                  {order.status?.toUpperCase()}
                </Badge>
                <span className="text-sm text-gray-500">
                  #{order.orderNumber?.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="px-6 pb-6 space-y-6">
            {/* Customer Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Information
              </h3>
              <div className="space-y-1">
                <InfoRow icon={User} label="Name" value={order.customerName} />
                <InfoRow icon={Mail} label="Email" value={order.email} />
                <InfoRow
                  icon={Calendar}
                  label="Order Date"
                  value={moment(order.orderDate || order._createdAt).format(
                    "DD MMM YYYY, HH:mm"
                  )}
                />
              </div>
            </div>

            {/* Products Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products ({order.products?.length || 0})
              </h3>
              <div className="space-y-3">
                {order.products?.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {product.product?.images && (
                      <Image
                        src={urlFor(product.product.images[0]).url()}
                        alt={product.product?.name || "Product"}
                        width={500}
                        height={500}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 mb-1">
                        {product.product.name || "Unknown Product"}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Qty: {product.quantity}</span>
                        <span>•</span>
                        <span className="font-semibold text-gray-900">
                          {formattedPrice(
                            product.product?.price * (product.quantity || 1)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Information
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">
                    {formattedPrice(order.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Discount</span>
                  <span className="text-sm font-medium text-green-600">
                    -{formattedPrice(order.amountDiscount || 0)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formattedPrice(
                      (order.totalPrice || 0) - (order.amountDiscount || 0)
                    )}
                  </span>
                </div>
                <div className="pt-2 text-xs text-gray-500">
                  Currency: {order.currency?.toUpperCase() || "USD"}
                </div>
              </div>
            </div>

            {/* Invoice Info Card */}
            {order.invoice && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Invoice
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Invoice Number
                    </span>
                    <span className="text-sm font-mono font-medium">
                      {order.invoice.number}
                    </span>
                  </div>
                  {order.invoice.hosted_invoice_url && (
                    <a
                      href={order.invoice.hosted_invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Download Invoice
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Transaction IDs */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Transaction Details
              </h3>
              <div className="space-y-1.5 text-xs">
                {order.stripePaymentIntentId && (
                  <div>
                    <span className="text-gray-500">Payment ID: </span>
                    <span className="font-mono text-gray-700">
                      {order.stripePaymentIntentId}
                    </span>
                  </div>
                )}
                {order.stripeCheckOutSessionId && (
                  <div>
                    <span className="text-gray-500">Customer ID: </span>
                    <span className="font-mono text-gray-700">
                      {order.stripeCheckOutSessionId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
