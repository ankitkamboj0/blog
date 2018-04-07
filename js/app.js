let Home = {
    template: `
    <div>

    <h1 class="my-4">Blog Posts
    </h1>

    <!-- Blog Post -->
    <div class="post-container" v-for="post in posts">
    <div class="card mb-4">
        <img class="card-img-top" v-bind:src="post.imgSrc" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title"><router-link :to="/post/ + post.id">{{ post.title }}</router-link></h2>
            <p class="card-text">{{post.content}}</p>
        </div>
        <div class="card-footer text-muted">
             {{post.comments.length}} Comments
        </div>
    </div>
    </div>
</div>
    `,

    data() {
        return {
            posts: []
        }
    },

    mounted() {
        this.posts = posts;
    }
};

let PostData = {
    template: `
    <div>

    <h1 class="my-4">Detail Blog Post
    </h1>

    <!-- Blog Post -->
    <div class="post-container" >
    <div class="card mb-4">
        <img class="card-img-top" v-bind:src="postd.imgSrc" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title">{{ postd.title }}</h2>
            <p class="card-text">{{postd.content}}</p>
        </div>
        
        <div class="card-footer text-muted" v-for="comment in postd.comments.slice(0, counter)">
             {{comment}}
        </div>
        
        <button class="" v-if="postd.comments.length>3" v-on:click="counter +=3" v-show="counter<postd.comments.length" >Load Comments</button>
        <div class="card-footer text-center text-muted" v-show="postd.comments.length == Math.min(postd.comments.length,counter)">
            No more comments
        </div>
   </div>

    </div>
    </div>
</div>
    `,
    data() {
        return {
            counter: 3,
            postd: {}
        };
    },
    mounted() {
        console.log(this.$route.params.id);
        this.postd = this.findById(this.$route.params.id);
        console.log(this.postd);
    },
    methods: {
        findById(id) {
            for (let i = 0; i < posts.length; i++) {
                if (id == posts[i].id) return posts[i];
            }
            return console.log('not found');
        }
    }
};

// Form validation
Vue.component('signUpForm', {
    template: '#signUpForm',
    data() {
        return {
            username: '',
            email: '',
            msg: [],
            //  disableSubmitButton: true,
        }
    },
    watch: {
        email(value) {
            this.eventName();
            this.email = value;
            this.check_email(value);
            // this.disableSubmitButton = false;
        },
        username(value) {
            this.eventName();
            this.username = value;
            this.check_username(value);
        }

    },
    methods: {

        check_email(value) {
            if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(value)) {
                this.msg[name] = '';
                return true;
            } else {
                this.msg[name] = 'Keep Typing... We are waiting for correct Email';
                return false;
            }

        },

        check_username(user) {
            remainingChars = 6 - user.length;
            if (user.length < 6) {
                this.msg[name] = 'Name must contain 2 characters. ' + remainingChars + ' more to go...';
                return false;
            } else {
                this.msg[name] = '';

                return true;
            }
        },


        eventName() {
            name = event.target.name;

        },
        submit() {
            alert('Great you have completed this project, keep learning.')
        }
    }
});



new Vue({
    el: '#form',
    data: {
        componentName: 'signUpForm'
    }
})


let routes = [
    { path: '/', component: Home },
    { path: '/post/:id', component: PostData }
];

let router = new VueRouter({ routes });

let app = new Vue({ router }).$mount('#app');

// Load comment on click of button