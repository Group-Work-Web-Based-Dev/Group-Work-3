'use strict';

export default Vue.component('lessons', {
    template: `
            <div class="card-container">
                <div v-for="lesson in lessons" v-bind:key="lesson.id" class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img alt="Placeholder image" v-bind:src="(lesson.image)">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <figure class="image is-48x48">
                                    <i class="fas fa-2x fa-quidditch"></i>
                                </figure>
                                <p class="title is-4">Subject: {{ lesson.title }}</p>
                                <p class="subtitle pt-5">Location: {{ lesson.location }}</p>
                                <p class="subtitle pt-5">Price: {{ lesson.price }}</p>
                                <p class="subtitle pt-5">Space: {{lesson.spaces}}</p>
                            </div>
                        </div>
                        <div class="content">
                            <button :disabled="lesson.isSoldOut" v-on:click="addToCart(lesson.id)" class="button is-info">Add to
                                cart
                            </button>
                        </div>
                    </div>
                </div>
             </div>
    `,
    props: {
        lessons: [],
        cart: []
    },
    methods: {
        addToCart(id) {
            const {lessons, cart} = this;

            const lesson = lessons.find((lesson) => lesson.id === id);

            if (lesson.spaces > 0)
                lesson.spaces--;
            if (lesson.spaces === 0)
                lesson.isSoldOut = true

            for (let i = 0; i < cart?.length; i++) {
                if (cart[i].id === lesson.id) {
                    return
                }
            }

            return cart.push(lesson)
        },
    }
});
