'use strict';

export default Vue.component('lessons', {
    template: `
            <div class="card-container">
                <div v-if="lessons.error !== null">
                    <h4>{{ lessons.error }}</h4>
                </div>

                <div v-if="lessons.loading">
                    <h4>Loading...</h4>
                </div>

                <div v-if="lessons.data.length > 0" v-for="lesson in lessons.data" v-bind:key="lesson._id" class="card">
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
                            <button class="button is-info">Add to
                                cart
                            </button>
                        </div>
                    </div>
                </div>
             </div>
    `,
    data() {
        return {
            lessons: {
                data: [],
                error: null,
                loading: false
            }
        }
    },
    methods: {
        async getLessons() {
            // loading state
            this.lessons = {
                data: [],
                error: null,
                loading: true
            }

            // get data
            try {
                const lessonsData = await fetch(`https://mdx3145.herokuapp.com/collection/lessons`, {method: 'get'});
                if (lessonsData.status === 200) {
                    const data = await lessonsData.json();
                    this.lessons = {
                        data,
                        error: null,
                        loading: false
                    }
                } else if (lessonsData.status !== 200) {
                    this.lessons = {
                        data: [],
                        error: 'Error loading data',
                        loading: false
                    }
                }
            } catch (err) {
                this.lessons = {
                    data: [],
                    error: 'Error loading data...',
                    loading: false
                }
            }
        }
    },

    async mounted() {
        this.getLessons();
    }
});
