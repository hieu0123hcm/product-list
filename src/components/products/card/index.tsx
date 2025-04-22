const ProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, images, price } = product;

  return (
    <div key={id} className="product">
      <p></p>
      <h4>
        {id}. {title}
      </h4>
      <img src={images[0]} />
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
