import React from "react";
import { WechatOutlined } from "@ant-design/icons";

import Icon from "./Icon";

const PromotionalHeader = () => {
  return (
    <div className="w-full bg-gray-400 py-3">
      <div className="container mx-auto flex flex-wrap justify-around items-center">
        <div className="flex items-center p-2">
          <Icon icon="wallet" className="mr-2 text-white text-2xl" />
          <div>
            <p className="font-bold text-white">Affordable Style</p>
            <p className="text-xs text-white">All Prices include VAT</p>
          </div>
        </div>

        <div className="flex items-center p-2">
          <Icon icon="truck" className="mr-2 text-white text-2xl" />

          <div>
            <p className="font-bold text-white">Fast Delivery</p>
            <p className="text-xs text-white">Available On All Orders!</p>
          </div>
        </div>

        <div className="flex items-center p-2">
          <WechatOutlined
            style={{ color: "white" }}
            className="mr-2 text-white text-2xl"
          />

          <div>
            <p className="font-bold text-white">Request Sample</p>
            <p className="text-xs text-white">Delivers Next Day</p>
          </div>
        </div>

        <div className="flex items-center p-2">
          <Icon icon="truck" className="mr-2 text-white text-2xl" />

          <div>
            <p className="font-bold text-white">Free Delivery</p>
            <p className="text-xs text-white">On all Order above £499</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalHeader;
