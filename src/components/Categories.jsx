import { useStore } from '../context/StoreContext.jsx';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import SectionHeading from './ui/SectionHeading.jsx';
import CategoryCard from './CategoryCard.jsx';

const counts = products.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});

export default function Categories() {
  const { goToShop } = useStore();
  return (
    <section id="categories" aria-labelledby="categories-title" className="scroll-mt-20 bg-ivory-50 py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="categories-title"
          eyebrow="Pooja Samagri"
          title="Shop by Category"
          description="From the first agarbathi of the morning to the last diya of the evening — everything for your pooja room, thoughtfully arranged."
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-10">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} count={counts[c.id] || 0} onSelect={(id) => goToShop({ category: id, query: '' })} />
          ))}
        </div>
      </div>
    </section>
  );
}
