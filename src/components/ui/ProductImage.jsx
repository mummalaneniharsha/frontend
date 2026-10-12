import { useState } from 'react';
import Art from '../../art/Art.jsx';

/**
 * Shows `image` when provided (and it loads); otherwise the illustrated
 * placeholder. Lets real photography be dropped in one product at a time.
 */
export default function ProductImage({ image, art, variant, tone, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return <Art kind={art} variant={variant} tone={tone} title={alt} className={className} />;
}
