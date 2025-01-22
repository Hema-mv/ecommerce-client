import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchProductById,
  createNewProduct,
  updateExistingProduct,
  fetchAllProducts,
  deleteProductById,
} from "../Utilities/product-Service";
import "../Styles/productlist.css";

const ProductDetailsPage = () => {
  //const { id } = useParams();
  const navigate = useNavigate();
  //const isEditMode = Boolean(id);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
 
     
    if (isEditMode) {
      fetchProduct();
    }
    fetchProducts();
    const rootElement = document.getElementById('root'); if (rootElement) 
    { rootElement.style.height = '100%'; 
      rootElement.style.margin = '0'; 
      rootElement.style.display = 'block'; 
      rootElement.style.flexDirection = 'column'; 
      rootElement.style.backgroundColor = '#f4f4f4'; 
  
   } 
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log(id);
      const productData = await fetchProductById(id);
      setFormData(productData);
    } catch (error) {
      console.error("Error fetching product1:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateExistingProduct(id, formData);
        alert("Product updated successfully");
      } else {
        await createNewProduct(formData);
        alert("Product created successfully");
      }
      navigate("/productlist");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };
  const handleEdit = async (productId) => {
    try {
      alert(productId);
      const productData = await fetchProductById(productId);
      setFormData(productData);
      setIsEditMode(true);
      setId(productId);
      navigate('/product'); // Navigate to the product form for editing
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details');
    }
  };
  const handleDelete = async (productId) => {
    try {
      await deleteProductById(productId);
      alert("Product deleted successfully");
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
    navigate("/productlist");
  };

  return (
    <div className="productlistpage">
      <h1>{isEditMode ? "Edit Product" : "Create New Product"}</h1>
      <form >
        
        {isEditMode && (
          <button type="button" onClick={() => handleDelete(id)}>
            Delete Product
          </button>
        )}
          <h2>Product List</h2>
      <Link to="/product">Add New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
               <img src={product.image} alt={product.name} width="100" height="100" />
            {product.name} - {product.price}
            <Link to={`/product/${product._id}`}>Edit</Link>
            <Link to={`/product/${product._id}`}>Delete</Link>
            {/* <div className="btn-container">
              <button className="btn" onClick={() => navigate(`/product/${product._id}`)}>
                Edit
              </button>
              <button className="btn-danger" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div> */}
          </li>
        ))}
      </ul>
      </form>

    
    </div>
  );
};

export default ProductDetailsPage;
