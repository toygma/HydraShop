import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Loading from "@/components/custom/Loading";
import { getMyOrders } from "@/sanity/helper";
import { Order } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OrderPage = dynamic(() => import("./_components/OrderPage"), {
  loading: () => <Loading fullScreen size={40} />,
});

const Orders = async () => {
  const { userId } = await auth();
  const order = await getMyOrders(userId);

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen container mx-auto flex items-center justify-center mt-32">
      {order?.length > 0 ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Invoice Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order?.map((item: Order) => (
                    <OrderPage key={item._id} order={item} />
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default Orders;
