import { useStore } from '../context/StoreContext.jsx';
import { bestsellers } from '../data/products.js';
import SectionHeading from './ui/SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';

export default function Bestsellers() {
  const { goToShop } = useStore();
  return (
    <section id="bestsellers" aria-labelledby="bestsellers-title" className="scroll-mt-20 bg-ivory-100 py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="bestsellers-title"
          align="left"
          eyebrow="Most loved"
          title="Bestsellers"
          description="The fragrances and essentials our customers return for. Ratings and review counts shown are sample data for this demo."
          action={
            <Button variant="outline" onClick={() => goToShop({ category: 'all', query: '' })} className="self-start md:self-auto">
              View all products <Icon name="arrowRight" size={16} />
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
