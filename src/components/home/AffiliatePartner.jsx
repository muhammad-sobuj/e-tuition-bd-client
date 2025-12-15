
import React from "react";
import partner from "../../assets/partner-.svg"

const AffiliatePartner = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            Affiliate <span className="text-cyan-500">Partner</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Tuition Terminal's Affiliate Program is a fantastic method for extra
            earnings. Everyone is eligible for this opportunity.
          </p>

          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-2xl transition">
            Join Now
          </button>
        </div>

        <img
          src={partner}
          alt="Affiliate Partner"
          className="max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default AffiliatePartner;
