import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 p-4 rounded-2xl bg-gray-200 mb-7 md:w-2/4 lg:w-1/4">
      <h3 className="text-3xl font-bold text-purple-900">Premium</h3>
      <strong className="text-5xl font-bold text-blue-500 my-5 ">
        $4.99/mo
      </strong>
      <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold">
        10% OFF
      </span>
      <div className="mt-4">
        <h5 className="text-3xl mb-3 font-semibold text-purple-700">
          Top Features
        </h5>
        <div className="mb-4">
          <div className="flex items-center text-green-700 mb-1 ps-3 ">
            <span style={{ color: "red", fontSize: "30px" }}>
              <TiTick />
            </span>{" "}
            Unlimited Bandwidth
          </div>
          <div className="flex items-center text-green-700 mb-1 ps-3 ">
            <span style={{ color: "red", fontSize: "30px" }}>
              <TiTick />
            </span>
            SSL/TLS Certificates
          </div>
          <div className="flex items-center text-green-700 mb-1 ps-3 ">
            <span style={{ color: "red", fontSize: "30px" }}>
              <TiTick />
            </span>{" "}
            24/7 Support
          </div>
          <div className="flex items-center text-green-700 mb-1 ps-3 ">
            <span style={{ color: "red", fontSize: "30px" }}>
              <TiTick />
            </span>{" "}
            Unlimited Disk Space
          </div>
          <div className="flex items-center text-green-700 mb-1 ps-3 ">
            <span style={{ color: "red", fontSize: "30px" }}>
              <TiTick />
            </span>{" "}
            Free Domain Registration
          </div>
        </div>
        <button className="w-full mt-4 border-2 border-gray-900 text-gray-900 font-bold text-2xl p-1 rounded-full hover:text-white hover:bg-gray-900 transition-all ease-in-out duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default WebHostingPlan;
