import LessonsComponent from './components/lessons.js'
import CartComponent from './components/cart.js'
import CheckoutComponent from './components/checkout.js';
import lessons from './data.js';

const vueState = {
    el: "#app",
    data() {
        return {
            lessons: [],
            cart: [],
            isCartOpen: false,
            isSuccessOrder: false,
            search: '',
            selected: '',
            order: 'Ascending',
            values: ['all', 'subject', 'location', 'price', 'availibility'],
            phoneItem: "",
            nameItem: "",
            valid: true,
        }
    },
    methods: {},
    updated() {

        const isTextValue = /^[a-zA-Z]+$/.test(this.nameItem);
        const isNumberValue = /^[1-9]+$/.test(this.phoneItem);

        if (isTextValue && isNumberValue) this.valid = false
        else
            this.valid = true
    },
    mounted() {
        this.lessons = lessons
    },
    components: {
        'lessons-component': LessonsComponent,
        'cart-component': CartComponent,
        'checkout-component': CheckoutComponent,
    }
}

export default vueState;