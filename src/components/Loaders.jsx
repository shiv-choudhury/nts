import React from "react";

export const Skeleton = ({
  height = "h-4",
  width = "w-full",
  pulse = false,
  circular
}) => {
  return (
    <div
      className={`${height} ${width} mt-2 bg-gray-200 ${
        circular ? "rounded-full" : "rounded-md"
      } ${pulse ? "animate-pulse" : ""}`}
    />
  );
};

export default function ProductLoader() {
  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
        <Skeleton height="h-[270px]" pulse />
      </div>
    </>
  );
}

export function HomePageLoader() {
  return (
    <>
      <div className="">
        <Skeleton height="h-[300px]" pulse />
        <Skeleton height="h-[100px]" pulse />
        <Skeleton height="h-[200px]" pulse />
        <Skeleton height="h-[200px]" pulse />
      </div>
    </>
  );
}

export function OrderLoader() {
  return (
    <div>
      <div className="flex gap-2">
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
      </div>
      <div className="flex gap-2">
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
        <Skeleton height="h-[200px]" width="w-1/3" pulse />
      </div>
    </div>
  );
}

export function OrderLoader2() {
  return (
    <div className="mx-2 mb-2">
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
    </div>
  );
}

export function OrderDetailLoader() {
  return (
    <div className="">
      <Skeleton height="h-[25px]" width="w-1/3" pulse />
      <Skeleton height="h-[20px]" width="w-1/3" pulse />
      <Skeleton height="h-[30px]" width="w-2/3" pulse />
      <Skeleton height="h-[30px]" width="w-full" pulse />
      <Skeleton height="h-[100px]" width="w-full" pulse />
      <Skeleton height="h-[100px]" width="w-full" pulse />
    </div>
  );
}

export function UserListLoader() {
  return (
    <div className="mx-2 mb-2">
      <Skeleton height="h-[30px]" pulse />
      <Skeleton height="h-[30px]" pulse />
      <Skeleton height="h-[30px]" pulse />
    </div>
  );
}

export function HomeLoader() {
  return (
    <div className="mx-2 mb-2">
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
      <Skeleton height="h-[150px]" pulse />
    </div>
  );
}

export function NotificationLoader() {
  return (
    <div className="mx-2 mb-1">
      <Skeleton height="h-[50px]" pulse />
      <Skeleton height="h-[50px]" pulse />
      <Skeleton height="h-[50px]" pulse />
      <Skeleton height="h-[50px]" pulse />
      <Skeleton height="h-[50px]" pulse />
    </div>
  );
}

export function TableLoader() {
  return (
    <div className="mx-2 mb-2">
      <Skeleton height="h-6" pulse />
      <Skeleton height="h-6" pulse />
      <Skeleton height="h-6" pulse />
      <Skeleton height="h-6" pulse />
    </div>
  );
}
