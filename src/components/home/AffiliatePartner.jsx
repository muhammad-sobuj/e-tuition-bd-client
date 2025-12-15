import { Button } from "@/components/ui/button";

const AffiliatePartner = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">
          Affiliate <span className="text-green-500">Partner</span>
        </h2>

        <p className="text-muted-foreground">
          Tuition Terminal's Affiliate Program is a fantastic method for extra
          earnings. Everyone is eligible for this opportunity.
        </p>

        <Button className="rounded-2xl px-8">Join Now</Button>
      </div>

      <img src="/affiliate.png" className="max-w-md mx-auto" />
    </section>
  );
};

export default AffiliatePartner;
