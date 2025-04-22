import './card.css';

const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, images, price } = product;

  return (
    <div key={id} className="product-card">
      <h4>
        {id}. {title}
      </h4>
      <div className="content">
        <img src={images[0]} />
        <div className="details">
          <p>${price}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
