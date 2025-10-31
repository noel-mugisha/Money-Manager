import { assets } from '../assets/assets';

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <img
            src={assets.dashboard_preview}
            alt="Money Manager Dashboard Preview"
            className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>
    </section>
  );
};
export default Features;