import { DotPulse } from "@uiball/loaders";

export const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <DotPulse size={60} speed={1.3} color="black" />
    </div>
  );
};
