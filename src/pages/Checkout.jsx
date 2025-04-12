import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkDiscount, getCartList, placeOrder } from "../apis/ApiCalls";

const Checkout = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const resp = await getCartList();
      const { data, status, success, message } = resp.data;
      if (success) {
        setCartItems(data.products);
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

  const handlePlaceOrder = async () => {
    // valadate everything before placing order
    // toast.success("Order placed successfully!");
    try {
      setLoading(true);
      const payload = {
        cartTotal: 22,
        buyQty: 1
      };
      const resp = await placeOrder(payload);
      const { data, status, success, message } = resp.data;
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
      const { data, status, success, message } = resp.data;
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

  return (
    <div className="bg-white sm:bg-gray-100 min-h-screen p-0 sm:p-4">
      <div className="mx-auto bg-white p-2 sm:p-6 rounded-lg shadow-lg">
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

        {/* Main Content: Address + Order Summary Side-by-Side on md+ */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left: Address Section */}
          <div className="flex-1 flex flex-col gap-6">
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
              {!checked && (
                <div>
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
              )}
            </div>

            {/* Order Note */}
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

          {/* Right: Order Summary + Button */}
          <div className="md:w-5/12 flex flex-col gap-4">
            <OrderSummaryCard />
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
            >
              PLACE ORDER
            </button>
          </div>
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
            <img src="assets/paypal.png" alt="PayPal" className="h-5" />
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" /> Pay By Debit/Credit Card
          </label>
        </div>
      </div>
    </div>
  );
};

const placeOrderBody = {
  orderDetails: {
    email: "customer@example.com",
    telephone: "9876543210",
    cart_total: 5000,
    discount: 200,
    tax: 100,
    charges: 50,
    grand_total: 4950,
    payment_mode: "Credit Card",
    items: [
      {
        product_id: "679873f5e137185de21aab2e",
        product_price: 2500,
        product_quantity: 2,
        total_amount: 5000
      }
    ]
  },
  billingAddress: {
    email: "customer@example.com",
    telephone: "9876543210",
    companyname: "XYZ Pvt Ltd",
    firstname: "John",
    lastname: "Doe",
    postalcode: "110001",
    streetaddress: "123 Street Name",
    towncity: "New Delhi",
    state: "Delhi",
    country: "India",
    ordernotes: "Please send the invoice"
  },
  deliveryAddress: {
    email: "customer@example.com",
    telephone: "9876543210",
    companyname: "",
    firstname: "John",
    lastname: "Doe",
    postalcode: "110001",
    streetaddress: "456 Another Street",
    towncity: "New Delhi",
    state: "Delhi",
    country: "India",
    ordernotes: "Leave package at the door"
  },
  orderNote: "A heavy goods vehicle will not fit"
};

const cartResponseSample = {
  _id: "67f16eb2881399d64d20fb5b",
  user: "67f169b9c0a274e739377b9d",
  products: [
    {
      product: {
        metaDescription: {
          metaTitle:
            "Foggy light grey polished 60X60 mm Premium Porcelain Wall & Floor Tile",
          metaKeywords: "",
          metaDescription:
            "<p>   </p><p> </p><p> </p><p>  </p><p> </p><p>  </p><p>    </p><p>                                                   </p><p> </p><p> </p><p><br></p><p><br></p><p>   </p><p>  </p><p>      </p><p>     </p><p>   </p><p>   </p><p>    </p><p>      </p><p>        </p><p>    </p><p>    </p><p>    </p><p>  </p><p>  </p><p>           </p><p>  </p><p>    </p><p><br></p>"
        },
        price: {
          price: 45.99,
          ourPrice: 23.99,
          ourCutPrice: 0,
          ourFullCutPrice: 4.99
        },
        tilesPerfection: {
          description: "Polished",
          appearance: "Polished",
          material: "Porcelain",
          glaze: "Glazed",
          rectified: "No",
          color: "Grey,Silver",
          thickness: "9",
          recommendedRoom: "Wall,Floor,Bathroom,Conservatory,Hall,Kitchen",
          quantityPerSquareMeter: "0",
          type: "Wall,Floor",
          print: "HD,Digital",
          usage: "Wall,Floor",
          sizeMM: "600x600mm",
          boxQuantity: "0",
          wastage: "10"
        },
        requiredproduct: [],
        relatedproduct: [],
        _id: "679873f5e137185de21aab86",
        id: 407,
        name: "Foggy light grey polished 60X60 mm Premium Porcelain Wall & Floor Tile",
        brand: "",
        sku: "CI-Foglightgrey60x60",
        urlKey:
          "foggy-light-grey-polished-60x60-mm-premium-porcelain-wall--floor-tile",
        size: "medium,large",
        group: "",
        productSerialNo: "0",
        unit: "",
        description:
          "<p>   </p><p> </p><p> </p><p>  </p><p> </p><p>  </p><p>    </p><p>                                                   </p><p> </p><p> </p><p><br></p><p><br></p><p>   </p><p>  </p><p>      </p><p>     </p><p>   </p><p>   </p><p>    </p><p>      </p><p>        </p><p>    </p><p>    </p><p>    </p><p>  </p><p>  </p><p>           </p><p>  </p><p>    </p><p><br></p>",
        productType: "0",
        productLabel: null,
        images: [
          "1733235617_CI-FOGLIGHTGREY60X60 _1.jpg",
          "1733235618_CI-FOGLIGHTGREY60X60 _2.jpg"
        ],
        categories: ["679778d12ccaff69b75184ed"],
        subCategories: ["67977c718efb1e856f48219b"],
        linkedProducts: [],
        stock: "800",
        status: false,
        serialno: 0,
        isVisible: false,
        __v: 0,
        createdAt: "2025-01-28T06:06:45.778Z",
        updatedAt: "2025-02-28T05:52:02.747Z",
        slug: "foggy-light-grey-polished-60x60-mm-premium-porcelain-wall-and-floor-tile",
        metaKeywords: ""
      },
      quantity: 3,
      price: 23.99,
      _id: "67fa58650dba535eeb1217b3"
    },
    {
      product: {
        metaDescription: {
          metaTitle:
            "Royal Elegance Nature 330 X 80mm Premium Porcelain Wall & Floor Tile",
          metaKeywords: "",
          metaDescription:
            "<p>   </p><p> </p><p> </p><p>  </p><p> </p><p>  </p><p>    </p><p>                                                   </p><p> </p><p> </p><p><br></p><p><br></p><p>   </p><p>  </p><p>      </p><p>     </p><p>   </p><p>   </p><p>    </p><p>      </p><p>        </p><p>    </p><p>    </p><p>    </p><p>  </p><p>  </p><p>           </p><p>  </p><p>    </p><p><br></p>"
        },
        price: {
          price: 59.99,
          ourPrice: 32.99,
          ourCutPrice: 0,
          ourFullCutPrice: 4.99
        },
        tilesPerfection: {
          description: "Matt",
          appearance: "Matt",
          material: "Porcelain",
          glaze: "Glazed",
          rectified: "No",
          color: "Beige,Cream,Sand",
          thickness: "9",
          recommendedRoom:
            "Wall,Floor,Bathroom,Conservatory,Hall,Kitchen,Lounge, Indoor Use",
          quantityPerSquareMeter: "37.87",
          type: "Wall,Floor",
          print: "HD,Digital",
          usage: "Wall,Floor",
          sizeMM: "80X330mm",
          boxQuantity: "0",
          wastage: "10"
        },
        requiredproduct: [],
        relatedproduct: [],
        _id: "679873f5e137185de21aab82",
        id: 403,
        name: "Royal Elegance Nature 330 X 80mm Premium Porcelain Wall & Floor Tile",
        brand: "",
        sku: "CI-Elegancenature330x80",
        urlKey:
          "royal-elegance-nature-330-x-80mm-premium-porcelain-wall--floor-tile",
        size: "small",
        group: "",
        productSerialNo: "0",
        unit: "",
        description:
          "<p>   </p><p> </p><p> </p><p>  </p><p> </p><p>  </p><p>    </p><p>                                                   </p><p> </p><p> </p><p><br></p><p><br></p><p>   </p><p>  </p><p>      </p><p>     </p><p>   </p><p>   </p><p>    </p><p>      </p><p>        </p><p>    </p><p>    </p><p>    </p><p>  </p><p>  </p><p>           </p><p>  </p><p>    </p><p><br></p>",
        productType: "0",
        productLabel: null,
        images: [
          "1732882746_CI-Elegancenature330x80_1.jpg",
          "1732882746_CI-Elegancenature330x80_2.jpg"
        ],
        categories: ["679778d12ccaff69b75184ed"],
        subCategories: ["67977c718efb1e856f48219b"],
        linkedProducts: [],
        stock: "120",
        status: true,
        serialno: 0,
        isVisible: false,
        __v: 0,
        createdAt: "2025-01-28T06:06:45.777Z",
        updatedAt: "2025-02-28T05:52:02.784Z",
        slug: "royal-elegance-nature-330-x-80mm-premium-porcelain-wall-and-floor-tile",
        metaKeywords: ""
      },
      quantity: 2,
      price: 32.99,
      _id: "67fa58760dba535eeb1217bd"
    }
  ],
  totalPrice: 137.95,
  status: "active",
  createdAt: "2025-04-05T17:56:02.438Z",
  updatedAt: "2025-04-12T13:03:42.920Z",
  __v: 15
};
