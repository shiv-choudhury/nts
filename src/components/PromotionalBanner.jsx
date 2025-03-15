import React from "react";
import { WechatOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Icon from "./Icon";

const PromotionalBanner = ({ data = [] }) => {
  const icon = {
    0: <Icon icon="wallet" className="mr-2 text-white text-2xl" />,
    1: <Icon icon="wallet" className="mr-2 text-white text-2xl" />,
    2: <Icon icon="truck" className="mr-2 text-white text-2xl" />,
    3: (
      <WechatOutlined
        style={{ color: "white" }}
        className="mr-2 text-white text-2xl"
      />
    ),
    4: <Icon icon="truck" className="mr-2 text-white text-2xl" />
  };

  return (
    <div className="w-full bg-gray-400 py-3">
      <div className="container mx-auto flex flex-wrap justify-around items-center">
        {data.map((item, index) => (
          <Link
            to={`pages/${item?.page_id?.pg_url_key || ""}`}
            key={index}
            className="flex items-center p-2 hover:bg-gray-500 hover:shadow-2xl hover:cursor-pointer rounded-xl"
          >
            {icon[item?.position || 0]}
            <div>
              <p className="font-bold text-white">{item?.title || ""}</p>
              <p className="text-xs text-white">{item?.description || ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanner;
