import { Loader } from "lucide-react";

const AdminLoader = () => {
  return (
    <div className="w-full h-full p-5 flex flex-col items-center justify-center">
      <Loader size={`2em`} className="animate-spin" />
      <h2 className="font-bold text-xl">Fetching Data...</h2>
    </div>
  );
};

export default AdminLoader;
