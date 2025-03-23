import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-6">CONTACT US</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Google Map */}
        <div className="w-full h-64 md:h-full border rounded-lg">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.529542801228!2d-1.464365723497359!3d52.51921197981265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48775b83bfafffff%3A0x6df3c3b6cfe764a6!2s19%20Slingsby%20Cl%2C%20Nuneaton%20CV11%206RP%2C%20UK!5e0!3m2!1sen!2sus!4v1617961373825!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Details & Form */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Address</h3>
            <p>
              Unit 19, Slingsby Close, Attleborough Industrial Estate Nuneaton,
              CV11 6RP
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Contact</h3>
            <p>📞 024 7637 5531</p>
            <p>✉️ info@naturallimestone.co.uk</p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email ID"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-2 " />
              <label className="text-sm" htmlFor="terms">
                Allow the Natural Stone and Tiles Co to store your contact
                information to use for future communication regards to their
                offers, promotions or benefits.The Natural Stone and Tiles Co
                vows to keep your information confidential and will not share
                with any third party, without your consent. You can anytime
                reach out to The Natural Stone and Tiles Co to opt out of your
                subscription and not contacted by them anymore.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
