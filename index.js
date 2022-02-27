import LessonsComponent from './components/lessons/index.js'
import CartComponent from './components/cart/index.js'
import CheckoutComponent from './components/checkout';

const vueState = {
    el: "#app",
    components: {
        'lessons-component': LessonsComponent,
        'cart-component': CartComponent,
        'checkout-component': CheckoutComponent,
    }
}

export default vueState;