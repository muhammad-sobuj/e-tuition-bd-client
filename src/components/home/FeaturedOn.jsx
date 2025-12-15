const logos = [
  "/daily-star.svg",
  "/champs21.svg",
  "/ittefak.svg",
  "/dell-2.svg",
  "/samakal.svg",
  "/samsung-7.svg",
  "/sony-2.svg",
  "/ptt-public.svg",
  "/philips.svg",
  "/camps-24.svg",
  "/apple-11.svg",
];

const FeaturedOn = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-bold mb-10">
        We were <span className="text-green-500">Featured</span> on
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            className="h-10 grayscale hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedOn;
