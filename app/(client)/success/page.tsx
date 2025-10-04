import { Suspense } from "react";
import SuccessContent from "./_components/SuccessContent";

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;
