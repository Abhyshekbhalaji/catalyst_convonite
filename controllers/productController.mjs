import Products from "../models/Products.mjs";
export const  addProduct= async function(req, res) {
    try {
        const { product_name, description, current_price, image_url } = req.body;
        const result = await Products.addProduct(product_name, description, current_price, image_url);
        res.status(201).json({ message: "Product added", productId: result.insertId });
    } catch (err) {
        res.status(500).json({ message:err.message, productId:null});
    }
}
export const  getProductById=async function(req, res) {
    try {
        const id =Number(req.params.id);
           if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID", product_details: null });
        }

        const product = await Products.getById(id);
        
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product not found" ,product_details:null});
        }
        res.status(200).json({message:"Fetched product successfully",product_details:product});
    } catch (err) {
        res.status(500).json({ message:  err.message,product_details:null });
    }
}