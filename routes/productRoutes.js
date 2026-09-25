const express = require ("express");
const Product = require('../models/Product');
const router = express.Router();

// Router for POST or Create a product
router.post('/', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product});
    } catch (error){
        res.status(400).json({success:false, message: error.message});   
    }
});

//Router for GET all products
router.get('/',async(req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success: true, 
            count: products.length,
            data: products
        });
    } catch (error){
        res.status(500).json({ success: false, message: error.message});
    }
});

//Router for GET a specific product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
         return res.status(404).json({
             success: false,
            message: "Product not found"
        });
    }
    res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//Router for PATCH or update with a specific product
router.patch("/:id", async (req, res) =>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true, runValidators: true}
        );
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.json({success: true, data: product});
    } catch(error){
        res.status(400).json({success: false, message: error.message});
    }
});

//Router for DELETE a specific product
router.delete("/:id", async (req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false, 
                message: "Product not found"
            });
        }
        res.json({
            success: true, 
            message: "Product deleted successfully"
        });
    } catch(error){
        res.status(500).json({success: false, message: error.message})
    }
});

//Router for Filtering, Searching and sorting
router.get("/", async(req,res)=>{
    
    const filter={};
    if (req.query.category){
        filter.category = req.query.category;
    }

    const products = await Product
    .find(filter)
    .sort(req.quert.sort || 'name');

    res.json({success: true, count: products.length, data:products});
});

module.exports = router;
