// React + Redux
import React, { Component } from "react"
import { connect } from "react-redux"

// Mui
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// Components
import Cart from "./cart"

// Helpers
import classBuilder from "../../helpers/class-builder"

// Actions
import { order } from "../../actions"
const  { fetchProducts, addProduct, removeProduct, setProductQuantity } = order


class Products extends Component {

    componentWillMount() {
        // Fetch products from the server
        if (this.props.status != "success")
            this.props.fetchProducts()
    }

    render() {
        const cartIsEmpty = (Object.keys(this.props.cart_items).length == 0)
        const nextClassName = (cartIsEmpty ? "button-disabled" : "")

        return (
            <section className={classBuilder("products", this.props.className)}>
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        Products & Services
                    </header>
                    <summary>
                    </summary>
                    <div className="products-list">
                        { this.renderProducts() }
                    </div>
                    <Cart footer={true} hideIfEmpty={true} />
                    <div className="center">
                        <button
                            onClick={this.props.nextStep}
                            className={nextClassName}
                            disabled={cartIsEmpty}
                        >Next</button>
                    </div>
                </Paper>
                <Paper className="paper help-text">
                    Need help? Text 310.235.3835 for immediate assistance, or email <a href="mailto:sales@itson.me" target="_blank">sales@itson.me</a>
                </Paper>
            </section>
        )
    }


    addProduct(id) {
        const {hex_id, price} = this.props.products[id]
        this.props.addProduct({id, hex_id, price})
    }


    renderProducts() {
        const { status, products } = this.props

        if (status == null || status == "pending") {
            return (
                <span>Loading...</span>
            )
        }

        if (status == "error"  ||  products.length == 0) {
            return (
                <div>
                    <h1 className="error">Oh no!</h1>
                    <span>Something went wrong on our end.  Please refresh the page, or try again later.</span>
                </div>
            )
        }

        return products.map((product, id) => {

            let imageClassName = ["product-image"]
            if (!!products.photo_url)
                imageClassName.push("hidden")
            imageClassName = imageClassName.join(" ")

            return (
                <Card
                    key={id}
                    className="product"
                    style={{textAlign: "left"}}
                >
                    <CardHeader
                        title={product.name}
                        subtitle={"$" + (product.price/100.0).toFixed(2)}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardActions>
                        <RaisedButton
                            primary={true}
                            label="Add to cart"
                            onClick={this.addProduct.bind(this, id)}
                        />
                    </CardActions>
                    <CardText expandable={true} className="product-content">
                        <p className="product-description">{product.detail || "No description yet!"}</p>
                        <div className="product-image-wrapper">
                            <img src={product.photo_url} className={imageClassName} />
                        </div>
                    </CardText>
                </Card>
            )
        })
    }
}


function mapStateToProps(state) {
    return {
        status:     state.order_fetch_products.status,
        products:   state.order_fetch_products.data,
        cart_items: state.order_cart.products || {}
    }
}

export default connect(mapStateToProps, { fetchProducts, addProduct, removeProduct, setProductQuantity })(Products)
