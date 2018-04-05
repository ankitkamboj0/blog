var app = new Vue({
    el: '#app',
   
    data: {
        message: 'JI Vue!',
        counter :3,
        posts:posts
    },
    methods: {
        count:function(){
            this.counter +=3; 
        }
    }
    
})
