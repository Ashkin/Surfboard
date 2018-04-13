// React + Redux
import React, { Component } from "react"
import { connect } from "react-redux"

// Mui
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Snackbar from "material-ui/Snackbar"

// Components
import { CloudinaryContext, Transformation, Image } from "cloudinary-react"
import Cart from "./cart"

// Helpers
import classBuilder from "../../helpers/class-builder"

// Actions
import { order, snackbar } from "../../actions"
const  { fetchProducts, addProduct, removeProduct, setProductQuantity } = order
const  { show: showSnackbar, hide: hideSnackbar } = snackbar


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
                {this.renderCart.bind(this, cartIsEmpty)()}
                <Paper className="paper primary" zDepth={2}>
                    <header>
                        Products & Services
                    </header>
                    <summary>
                    </summary>
                    <div className="products-list">
                        { this.renderProducts() }
                    </div>
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
                <Snackbar
                    open={this.props.snackbar.open}
                    message={this.props.snackbar.message}
                    autoHideDuration={this.props.snackbar.duration}
                    onRequestClose={this.props.hideSnackbar}
                />
            </section>
        )
    }


    addProduct(id) {
        const {hex_id, name, price} = this.props.products[id]
        this.props.showSnackbar(`Added: ${name}`)
        this.props.addProduct({id, hex_id, price})
    }


    renderProducts() {
        const { status, products } = this.props

        if (status == null || status == "pending") {
            return (
                <span>Loading...</span>
            )
        }

        if (status == "failure"  ||  products.length == 0) {
            return (
                <div>
                    <h1 className="error">Oh no!</h1>
                    <span>Something went wrong on our end.  Please refresh the page, or try again later.</span>
                </div>
            )
        }

        return products.map((product, id) => {

            // Determine image class and public_id
            let imageClassName = ["product-image"]
            let imagePublicId  = null

            // If the image has a photo
            if (product.photo_url) {
                // and it's within /ordering folder
                if (product.photo_url.includes("/ordering/")) {
                    // Extract "/ordering/image_name.png"
                    // from e.g. "http://res.cloudinary.com/drinkboard/image/upload/v1510616048/ordering/Promo_gift_campaign_pxljwl.png"
                    imagePublicId = product.photo_url.match(/v[0-9]+(\/.+)/)[1]
                } else {
                    // Otherwise, the public image ID is simply the very last token.
                    // e.g. in "http://res.cloudinary.com/drinkboard/image/upload/v1510424904/ae7tchc4gv5lpaqje6gy.jpg"
                    const _tokens = product.photo_url.split("/")
                    imagePublicId = _tokens[_tokens.length - 1]
                }
            } else {
                // No image!
                imageClassName.push("hidden")
            }
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
                            <CloudinaryContext cloudName="drinkboard" className={imageClassName}>
                                <Image publicId={imagePublicId}>
                                    <Transformation width="750" crop="limit" />
                                </Image>
                            </CloudinaryContext>
                        </div>
                    </CardText>
                </Card>
            )
        })
    }


    renderCart(cartIsEmpty) {
        if (cartIsEmpty)  return null
        return (
            <Paper className="paper primary" zDepth={2}>
                <Cart hideIfEmpty={true} showHeader={true} />
            </Paper>
        )
    }
}


function mapStateToProps(state) {
    return {
        snackbar:   state.snackbar || {open: false, message: ""},
        status:     state.order_fetch_products.status,
        products:   state.order_fetch_products.data,
        cart_items: state.order_cart.products || {},
    }
}

export default connect(mapStateToProps, {
    fetchProducts, addProduct, removeProduct, setProductQuantity,
    showSnackbar, hideSnackbar
})(Products)
