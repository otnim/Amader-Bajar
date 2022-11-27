import React from 'react';
import Joi from 'joi';
import Form from '../common/form'
import { getCategories } from '../../services/categoryService';
import { getProduct, saveProduct } from '../../services/productService';


class ProductForm extends Form {
    state = {
        data: {
            name: "",
            categoryId: "",
            details: "",
            price: "",
            numberInStock: "",
            image: "",
            deleteImage: ""
        },
        categories: [],
        errors: {},
    };

    schema = Joi.object({
        _id: Joi.string(),
        name: Joi.string().min(3).max(50).required().label("Product Name"),
        categoryId: Joi.string().required().label("Category"),
        details: Joi.string().min(3).max(510).required().label("Product Details"),
        price: Joi.number()
            .required()
            .min(0)
            .max(50000)
            .label("Price"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(1000)
            .label("Number in Stock"),

        image: Joi.string(),
        deleteImage: Joi.string()

    });

    async componentDidMount() {
        const { data: loadedCategories } = await getCategories();
        this.setState({ categories: loadedCategories });
        // console.log(loadedCategories);
        this.populateProduct();
    }

    async populateProduct() {
        try {
            const productId = this.props.match.params.id;
            if (productId === "new") return; //it is ready to take new input

            const { data: product } = await getProduct(productId);
            // console.log(product);

            this.setState({ data: this.mapToViewModel(product) });
        }
        catch (ex) {
            if (ex.response || ex.response.status === 404)
                this.props.history.replace("/not-found");
            console.log(ex);
        }

    }

    //this method extract the minimum need data from backend for the product form in frontend
    //we need this method coz we need not the 50 properties of product from the database
    mapToViewModel(product) {
        return {
            _id: product._id,
            name: product.name,
            categoryId: product.category._id,
            details: product.details,
            price: product.price,
            numberInStock: product.numberInStock,
            image: product.image,
            deleteImage: product.deleteImage
        }

    }

    doSubmit = async () => {
        console.log(this.state.data);
        //save to db
        const res = await saveProduct(this.state.data);
        if (res.status === 200) {
            alert('Product Successfully added');
            this.props.history.push("/admin/product/manage");
        } else {
            alert('Problem in to save data in backend');
        }
        // console.log(res);

    }



    render() {
        return (
            <div>
                <h1>Product Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Product Name")}
                    {this.renderSelect("categoryId", "Category", this.state.categories)}
                    {this.renderInput("details", "Details about the Products")}
                    {this.renderImageInput("img")}
                    {this.renderInput("price", "Price Per Unit", "number")}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderButton("Save")}
                </form>

            </div>
        );
    }
}

export default ProductForm;