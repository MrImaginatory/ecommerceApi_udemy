import productSchema from '../models/product.model.js';
import asyncWrapper from '../utils/asyncWrapper.utils.js';
import uploadToCloudinary from '../utils/cloudinary.utils.js';
import saveImageLocally  from '../utils/files.utils.js';

const createProduct = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    const { name, description, price, stock, category } = req.body;

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can create products' });
    }

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one product image is required' });
    }

    const imageUrls = [];

    try {
        for (const file of req.files) {
            const cloudinaryUrl = await uploadToCloudinary(file);
            imageUrls.push(cloudinaryUrl);
        }

        const product = new productSchema({
            name,
            description,
            price,
            stock,
            category,
            images: imageUrls
        });

        await product.save();

        return res.status(201).json({ message: "Product Created Successfully", product });

    } catch (err) {
        console.error('Cloudinary upload failed, saving locally:', err.message);
        const localImageUrls = req.files.map(file => saveImageLocally(file));
        const product = new productSchema({
            name,
            description,
            price,
            stock,
            category,
            images: localImageUrls
        });

        await product.save();

        return res.status(500).json({ message: "Failed to create product", error: err });
    }
});

const updateProduct = asyncWrapper(async (req, res) => {
    const productId = req.params.productId;
    const isAdmin = req.user.role === 'admin';
    const { name, description, price, stock, category } = req.body;

    const productExists = await productSchema.findById(productId);

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can create products' });
    }

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.files || req.files.length === 0) {
        const updatedProduct = await productSchema.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category
        }, { new: true });
        return res.status(201).json({ message: "Product Updated Successfully", updatedProduct });
    }

    if(!productExists) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const imageUrls = [];

    try {
        for (const file of req.files) {
            const cloudinaryUrl = await uploadToCloudinary(file);
            imageUrls.push(cloudinaryUrl);
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category,
            images: imageUrls
        }, { new: true });

        return res.status(201).json({ message: "Product Updated Successfully", updatedProduct });

    } catch (err) {
        console.error('Cloudinary upload failed, saving locally:', err.message);
        const localImageUrls = req.files.map(file => saveImageLocally(file));
        const updatedProductFailed = await productSchema.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category,
            images: localImageUrls
        }, { new: true });

        return res.status(500).json({ message: "Failed to create product", error: err ,updatedProductFailed});
    }

})

const deleteProduct = asyncWrapper(async (req, res) => {
    const productId = req.params.productId;
    const isAdmin = req.user.role === 'admin';
    const productExists = await productSchema.findById(productId);

    if (!isAdmin) {
        return res.status(403).json({ message: 'Only admin can create products' });
    }

    if (!productExists) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const productDelete = await productSchema.deleteOne({ _id: productId });
    return res.status(200).json({ message: "Product Deleted Successfully", product: productDelete });

})

const findProducts = asyncWrapper(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    
    const products = await productSchema.find().skip(skip).limit(limit);

    if(products.length === 0){
        return res.status(404).json({ message: 'No products found' });
    }
    return res.status(200).json({ message: 'Products found', 
                                totalProducts: products.length,
                                pageNo:page,
                                noOfData:limit,
                                totalPages: Math.ceil(products.length / limit),
                                products:products,
                            });
})

const findSingleProduct = asyncWrapper(async (req, res) => {
    const productId = req.params.productId;
    const product = await productSchema.findById(productId);
    if(!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product found', product });
})


export {createProduct, updateProduct, deleteProduct,findProducts, findSingleProduct};