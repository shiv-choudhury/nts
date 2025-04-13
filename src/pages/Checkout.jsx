import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkDiscount, getCartList, placeOrder } from "../apis/ApiCalls";

const DELIVERY_CHARGES = 40;
const Checkout = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderNote, setOrderNote] = useState("");
  const [billing, setBilling] = useState({
    email: "",
    companyname: "",
    firstname: "",
    lastname: "",
    postalcode: "",
    streetaddress: "",
    towncity: "",
    country: "India",
    state: "",
    telephone: "",
    ordernotes: ""
  });
  const [shipping, setShipping] = useState({ ...billing });
  const [paymentMode, setPaymentMode] = useState("");

  useEffect(() => {
    fetchUserCart();
  }, []);

  useEffect(() => {
    if (checked) {
      setShipping({ ...billing });
    }
  }, [checked, billing]);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const resp = await getCartList();
      const { data, success, message } = resp.data;
      if (success) {
        setCartItems(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "billing") setBilling({ ...billing, [name]: value });
    else setShipping({ ...shipping, [name]: value });
  };

  const validateAddress = (addr) => {
    const required = [
      "email",
      "firstname",
      "lastname",
      "postalcode",
      "streetaddress",
      "towncity",
      "state",
      "telephone"
    ];
    for (let field of required) {
      if (!addr[field]?.trim()) {
        toast.error(<div className="capitalize">{`${field} is required`}</div>);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress(billing)) return;
    if (!checked && !validateAddress(shipping)) return;
    if (!paymentMode) return toast.error("Please select a payment method");

    const items = cartItems?.products.map((item) => ({
      product_id: item.product._id,
      product_price: item.price,
      product_quantity: item.quantity,
      total_amount: item.price * item.quantity
    }));

    const cart_total = items.reduce((acc, cur) => acc + cur.total_amount, 0);
    const discount = 0;
    const tax = 0;
    const charges = DELIVERY_CHARGES;
    const grand_total = cart_total - discount + tax + charges;

    const payload = {
      orderDetails: {
        email: billing.email,
        telephone: billing.telephone,
        cart_total,
        discount,
        tax,
        charges,
        grand_total,
        payment_mode: paymentMode,
        items
      },
      billingAddress: { ...billing },
      deliveryAddress: checked ? { ...billing } : { ...shipping },
      orderNote
    };

    try {
      setLoading(true);
      const resp = await placeOrder(payload);
      const { success, message } = resp.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const payload = {
        code: couponCode,
        cartTotal: 22,
        buyQty: 1
      };
      const resp = await checkDiscount(payload);
      const { success, message } = resp.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAddressForm = (type, stateObj) => (
    <form className="flex flex-col gap-3">
      <input
        type="email"
        name="email"
        value={stateObj.email}
        onChange={(e) => handleInputChange(e, type)}
        placeholder="Email Address *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="companyname"
        value={stateObj.companyname}
        onChange={(e) => handleInputChange(e, type)}
        placeholder="Company Name"
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <input
          type="text"
          name="firstname"
          value={stateObj.firstname}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="First Name *"
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          name="lastname"
          value={stateObj.lastname}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="Last Name *"
          className="border p-2 rounded w-1/2"
        />
      </div>
      <input
        type="text"
        name="postalcode"
        value={stateObj.postalcode}
        onChange={(e) => handleInputChange(e, type)}
        placeholder="Postal Code *"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="streetaddress"
        value={stateObj.streetaddress}
        onChange={(e) => handleInputChange(e, type)}
        placeholder="Street Address *"
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <input
          type="text"
          name="towncity"
          value={stateObj.towncity}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="Town / City *"
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          value="India"
          readOnly
          className="border p-2 rounded bg-gray-100 w-1/2"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          name="state"
          value={stateObj.state}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="State *"
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          name="telephone"
          value={stateObj.telephone}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="Telephone *"
          className="border p-2 rounded w-1/2"
        />
      </div>
    </form>
  );

  return (
    <div className="bg-white sm:bg-gray-100 min-h-screen p-0 sm:p-4">
      <div className="mx-auto bg-white p-2 sm:p-6 rounded-lg shadow-lg">
        <div className="mb-2 text-2xl font-semibold">Checkout</div>
        <div className="bg-red-500 text-white text-sm p-3 text-center rounded">
          DELIVERY MAY TAKE FROM NEXT DAY TO 4 WORKING DAYS. PLEASE CONTACT US
          FOR THE EXACT DAY OF DELIVERY.
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row gap-2 items-center">
          <p className="text-sm font-semibold">
            Have a coupon? <span className="font-bold">ENTER YOUR CODE</span>
          </p>
          <div className="flex flex-col md:flex-row mt-2 gap-2 w-full">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border p-2 flex-1 rounded w-full"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              APPLY COUPON
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">DELIVERY ADDRESS</h2>
              {renderAddressForm("billing", billing)}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">SHIPPING ADDRESS</h2>
              <div className="mb-4 flex items-center gap-2">
                <input
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  type="checkbox"
                  id="sameAsDelivery"
                  className="h-4 w-4"
                />
                <label
                  htmlFor="sameAsDelivery"
                  className="text-sm font-semibold"
                >
                  Same as delivery address
                </label>
              </div>
              {!checked && renderAddressForm("shipping", shipping)}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Order Note</h2>
              <p className="text-sm text-gray-600 mb-2">
                Any other information which may help us with your delivery?
              </p>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="border p-2 rounded w-full h-24"
                placeholder="A heavy goods vehicle will not fit"
              ></textarea>
            </div>
          </div>
          <div className="md:w-5/12 flex flex-col gap-4">
            <OrderSummaryCard
              cartItems={cartItems}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
            />
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
            >
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

const OrderSummaryCard = ({ paymentMode, setPaymentMode, cartItems }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
      <div className="text-sm space-y-2">
        {cartItems?.products?.map((item) => (
          <div className="flex justify-between">
            <p className="mr-4 font-semibold truncate text-gray-600">
              {item?.product?.name}
              <span className="font-bold text-red-500"> x {item.quantity}</span>
            </p>
            <p className="font-semibold">{item.price * item.quantity}</p>
          </div>
        ))}
        <hr className="text-gray-400" />
        <div className="flex justify-between text-red-500">
          <p className="font-semibold">Subtotal:</p>
          <p className="font-semibold"> £{cartItems?.totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Delivery Charges:</p>
          <p className="font-semibold"> £{DELIVERY_CHARGES}</p>
        </div>
        <hr className="text-gray-400" />

        <div className="flex justify-between text-red-500">
          <p className="font-semibold">Grand Total:</p>
          <p className="font-semibold">
            £{cartItems?.totalPrice + DELIVERY_CHARGES}
          </p>
        </div>
        <hr className="text-gray-400" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Payment Methods</h3>
        <div className="space-y-2 text-sm">
          {[
            "Cash On Collection",
            "Bank / Money Transfer",
            "Paypal Standard",
            "Credit Card"
          ].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-2 ${
                method === "Paypal Standard"
                  ? "bg-yellow-300 p-2 rounded"
                  : "px-2"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMode === method}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              {method}
              {method === "Paypal Standard" && (
                <img src="assets/paypal.png" alt="PayPal" className="h-5" />
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
