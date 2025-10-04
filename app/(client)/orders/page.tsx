import dynamic from "next/dynamic";
import Loading from "@/components/custom/Loading";

const OrderPage = dynamic(() => import("./_components/OrderPage"), {
  loading: () => <Loading fullScreen size={40} />,
  ssr: false,
});

const Order = () => {
  return (
    <>
      <OrderPage />
    </>
  );
};

export default Order;
