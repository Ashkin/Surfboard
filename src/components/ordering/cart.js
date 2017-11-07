import React, { Component } from "react"
import { connect }          from "react-redux"

// Mui
import Paper         from "material-ui/Paper"
import RaisedButton  from "material-ui/RaisedButton";
import IconPlus      from "material-ui/svg-icons/content/add";
import IconMinus     from "material-ui/svg-icons/content/remove";
import IconX         from "material-ui/svg-icons/content/clear";
import ActionAndroid from "material-ui/svg-icons/action/android";
import { fullWhite, fullBlack } from "material-ui/styles/colors";


// Helpers
// import { renderTextField }  from "../../helpers/material-ui-redux-form"

// Actions
import { order } from "../../actions"
const  { removeProduct, setProductQuantity } = order


class Cart extends Component {
    render() {

        if (this.props.hideIfEmpty) {
            if (this.props.cart == null)  return null
            if (this.props.cart.products == null) return null
            if (Object.keys(this.props.cart.products).length == 0)  return null
        }


        if (this.props.footer) {
            return this.renderFooter.bind(this)()
        } else {
            return this.renderInline.bind(this)()
        }
    }


    renderInline() {
        return (
            <div className="cart">
                <div className="products">
                    {this.renderProducts.bind(this)()}
                </div>
                <div className="total">
                    {this.renderTotal.bind(this)()}
                </div>
            </div>
        )
    }

    renderFooter() {
        return (
            <Paper zDepth={4} rounded={false} className="cart footer paper">
                <h1>Your Cart</h1>
                <div className="products">
                    {this.renderProducts.bind(this)()}
                </div>
                <div className="total">
                    {this.renderTotal.bind(this)()}
                </div>
            </Paper>
        )
    }


    renderProducts() {
        if (this.props.cart.products === undefined)
            return <span className="empty-cart">Your cart is empty.</span>

        return Object.keys(this.props.cart.products).map((id) => {
            return this.renderProduct.bind(this, id)()
        })
    }


    renderProduct(id) {
        const product  = this.props.products[id]
        let   {quantity, price} = this.props.cart.products[id]
        // `let` to allow changing quantity here.
        // Why? `quantity+1` treats `quantity` as a string.  "5"+1 => "51"
        //      `++quantity` casts it to an integer first.   ++"5" => 6
        //       this also looks cleaner than: `quantity: Number(quantity)+1`


        return (
            <div className="product" key={id}>
                <RaisedButton
                    className="decrement"
                    onClick={ () => {this.props.setProductQuantity({id, quantity: --quantity})} }
                    label=""
                    disabled={quantity == 1}
                    style={{width: "auto", height: "auto", minWidth: "auto"}}
                    icon={<IconMinus color={fullBlack} />}
                />
                <input
                    className="quantity"
                    type="text"
                    name={`item-${id}-quantity`}
                    value={quantity}
                    onChange={ (event) => {this.handleProductChange(id, event.target.value)} }
                />
                <RaisedButton
                    className="increment"
                    onClick={ () => {this.props.setProductQuantity({id, quantity: ++quantity})} }
                    label=""
                    style={{width: "auto", height: "auto", minWidth: "auto"}}
                    icon={<IconPlus color={fullBlack} />}
                />
                <span className="name">{product.name}</span>
                <span className="price">
                    <span className="-quantity">{quantity}x </span>
                    <span className="-price">${price/100.0}</span>
                </span>
                <RaisedButton
                    className="remove"
                    onClick={ () => {this.props.removeProduct({id})} }
                    label=""
                    secondary={true}
                    style={{width: "auto", height: "auto", minWidth: "auto"}}
                    icon={<IconX color={fullWhite} />}
                />
            </div>
        )
    }


    handleProductChange(id, quantity) {
        const str = String(quantity)
        // Only allow numbers
        //TODO: apply error
        if (str.match(/[^0-9]/) !== null) {
            return
        }

        this.props.setProductQuantity({id, quantity})
    }


    renderTotal() {
        // Sum cart
        let total = 0;
        Object.keys(this.props.cart.products || {}).forEach( (id) => {
            const {quantity, price} = this.props.cart.products[id]

            total += price * quantity
        })
        // Convert from cents -> dollar
        total = (total/100.0)

        return (
            <span>Total: ${total}</span>
        )
    }

}



function mapStateToProps(state) {
    const cart_products = state.order_cart.products || {}
    const initialValues = {}

    Object.keys(cart_products).forEach((id) => {
        name = `item-${id}-quantity`
        initialValues[name] = String(cart_products[id].quantity)
    })

    return {
        initialValues,
        products:  state.order_fetch_products.data,
        cart:      state.order_cart
    }
}

const formOptions = {form: "order-cart"}


export default connect(mapStateToProps, {removeProduct, setProductQuantity})(Cart)
