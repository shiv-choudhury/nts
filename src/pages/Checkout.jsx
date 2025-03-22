const Checkout = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Delivery Notice */}
        <div className="bg-red-500 text-white text-sm p-3 text-center rounded">
          DELIVERY MAY TAKE FROM NEXT DAY TO 4 WORKING DAYS. PLEASE CONTACT US
          FOR THE EXACT DAY OF DELIVERY.
        </div>

        {/* Coupon Section */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row gap-2 items-center">
          <p className="text-sm font-semibold">
            Have a coupon? <span className="font-bold">ENTER YOUR CODE</span>
          </p>
          <div className="flex flex-col md:flex-row mt-2 gap-2 w-full">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="border p-2 flex-1 rounded w-full"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto">
              APPLY COUPON
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto">
              REMOVE COUPON
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          {/* Delivery Address */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">DELIVERY ADDRESS</h2>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address *"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className="border p-2 rounded w-1/2"
                />
              </div>
              <input
                type="text"
                placeholder="Postal Code *"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Street Address *"
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Town / City *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Country *"
                  value="India"
                  readOnly
                  className="border p-2 rounded bg-gray-100 w-1/2"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="State *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Telephone *"
                  className="border p-2 rounded w-1/2"
                />
              </div>
            </form>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sameAsDelivery" className="h-4 w-4" />
              <label htmlFor="sameAsDelivery" className="text-sm font-semibold">
                Same as delivery address
              </label>
            </div>
            <h2 className="text-lg font-semibold mt-4 mb-4">
              SHIPPING ADDRESS
            </h2>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address *"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className="border p-2 rounded w-1/2"
                />
              </div>
              <input
                type="text"
                placeholder="Postal Code *"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Street Address *"
                className="border p-2 rounded"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Town / City *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Country *"
                  value="India"
                  readOnly
                  className="border p-2 rounded bg-gray-100 w-1/2"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="State *"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Telephone *"
                  className="border p-2 rounded w-1/2"
                />
              </div>
            </form>
          </div>

          {/* Order Note */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Order Note</h2>
            <p className="text-sm text-gray-600 mb-2">
              Any other information which may help us with your delivery?
            </p>
            <textarea
              className="border p-2 rounded w-full h-24"
              placeholder="A heavy goods vehicle will not fit"
            ></textarea>
          </div>

          {/* Order Summary */}
          <OrderSummaryCard />
        </div>

        {/* Place Order Button */}
        <div className="mt-6 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full md:w-auto">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

const OrderSummaryCard = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
      <div className="text-sm space-y-2">
        <p>Oyster Beige Split Face Slate 100x360mm - £59.99</p>
        <p>Rustic Mix Split Face Slate 100x360mm - £179.97</p>
        <hr />
        <p className="font-semibold">Subtotal: £239.96</p>
        <p className="font-semibold">Delivery Charges: £40.00</p>
        <p className="text-lg font-bold">Grand Total: £279.96</p>
      </div>

      {/* Payment Methods */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Payment Methods</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" /> Cash On Collection
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" /> Bank / Money Transfer
          </label>
          <label className="flex items-center gap-2 bg-yellow-300 p-2 rounded">
            <input type="radio" name="payment" /> Paypal Standard{" "}
            <img src="/paypal.png" alt="PayPal" className="h-4" />
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" /> Pay By Debit/Credit Card
          </label>
        </div>
      </div>
    </div>
  );
};
