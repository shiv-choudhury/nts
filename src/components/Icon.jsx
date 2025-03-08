import React from "react";

export default function Icon(props) {
  const { icon, className = "text-xl" } = props;
  return <i className={`pi pi-${icon} ${icon} ${className}`}></i>;
}
