export default Vue.component('cart-component', {
    template: `
                    <div class="cart">
                    <!-- Start - Cart Button -->
                    <div v-on:click="navigateToCart()" v-if="cart.length !== 0" class="cart-count">
                        <div>
                            <i class="fas fa-2x fa-shopping-cart"></i>
                        </div>
                        <div style="padding-left: 10px;">
                            <p>{{cart.length}}</p>
                        </div>
                    </div>
                    </div>
          
     <div class="modal" v-bind:class="this.isCartOpen ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Shopping Cart</p>
          <button v-on:click="navigateToCart()" class="delete" aria-label="close"></button>
        </header>

        <section class="modal-card-body">

          <!-- Start - Checkout Items -->
          <div class="container">
            <form @submit="submitForm">

              <!-- Start - Notifications -->
              <div v-bind:class="isSuccessOrder ? '' : 'is-show'" class="notification is-primary">
                <button v-on:click="reload()" class="delete"></button>
                <h1 class="title">
                  Success!
                </h1>
                <p>Your order has been placed</p>
              </div>
              <!-- End - Notifications -->

              <div class="field-header">
                <h5 class="title is-5 py-4">Your info</h5>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="nameItem" class="input" type="text" placeholder="Name">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>

              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input v-model="phoneItem" class="input" type="number" placeholder="Phone">
                  <span class="icon is-small is-left">
                    <i class="fas fa-phone"></i>
                  </span>
                </p>
              </div>
              <button :disabled="this.valid" class="button py-4 is-info">
                Checkout
              </button>
            </form>
          </div>
          <!-- End - Checkout Items -->

          <!-- Start - Cart items -->
          <div class="container my-5">
            <div v-for="cartItems in cart" v-bind:key="cartItems.id" class="main-cart-container">
              <div class="box-left">
                <div class="main-cart-container_image">
                  <figure class="image is-128x128">
                    <img v-bind:src="cartItems.url">
                  </figure>
                </div>
                <div class="main-cart-container_item">
                  <h5 class="title is-5">Subject: {{cartItems.subject}}</h5>
                  <h6 class="">Price: {{cartItems.price}}</h6>
                  <h6 class="has-text-weight-bold">Quantity: {{Math.abs((cartItems.availibility) - 5)}} classes</h6>
                  <h6 class="">Location: {{cartItems.location}}</h6>
                </div>
              </div>

              <div v-on:click="removeFromCart(cartItems.id)" class="box-right">
                <i style="cursor: pointer;" class="fas fa-2x fa-trash"></i>
              </div>
            </div>
          </div>
          <!-- End - Cart items -->


        </section>
        <footer class="modal-card-foot">
          <button v-on:click="navigateToCart()" class="button is-dark">Close</button>
        </footer>
      </div>
    </div>

    `,

    props: {
        cart: [],
        isCartOpen: false,
        isSuccessOrder: false,
        phoneItem: "",
        nameItem: "",
        valid: true,
    },
    methods: {
        removeFromCart(lessonIdx) {
            const {cart} = this;
            if (lessonIdx != null && cart.length > 0) {
                return cart.find((cartItem, i) => {
                    if (cartItem?.id === lessonIdx) {
                        cartItem.availibility = 5
                        cartItem.isSoldOut = false
                        cart.splice(i, 1)
                    }
                })
            }
        },
        navigateToCart() {
            if (!this.isCartOpen)
                this.isCartOpen = true
            else
                this.isCartOpen = false
        },
        submitForm(e) {
            e.preventDefault()
            let result = null
            const name = this.nameItem;
            const phone = Number(this.phoneItem);

            const isTextValue = /^[a-zA-Z]+$/.test(name);
            const isNumberValue = /^[1-9]+$/.test(phone);

            if (!isNumberValue || !isTextValue) {
                this.valid = true
                result = null;
            } else
                result = {name, phone}

            if (result != null) {
                // simulate the notification and return to the original state
                setTimeout(() => {
                    this.isSuccessOrder = false
                    window.location.reload()
                }, 3000)

                this.isSuccessOrder = true

                return result;
            }
        }
    }
})