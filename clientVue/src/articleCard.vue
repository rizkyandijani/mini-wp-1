<template>
    <div class="card col-3 m-2 shadow" style="padding:0; border: none">
        <img class="card-img-top" v-bind:src="article.image" alt="article.title" width="100%" height="300px">
        <div class="card-body">
            <h5 class="card-title">{{article.title}}</h5>
            <p class="card-text">{{article.description}}</p>
            <p style="color: black">Tag : </p><button @click="emitCard('tagSearch',tag)" type="button" class="btn btn-dark mr-1 ml-1 mb-1" v-for="(tag,index) in tags" :key="index" style="padding: 0 3px;font-size: 14px;">{{tag}}</button>
        </div>
        <div class="row justify-content-center mb-2">
            <button @click="emitCard('delete',article._id)" type="button" class="btn btn-outline-dark mr-2" style="padding: 5 5px;">delete</button>
            <button @click="emitCard('detail',article._id)" type="button" class="btn btn-outline-dark" style="padding: 5 5px;">detail</button>
            <button @click="emitCard('edit',article._id)" type="button" class="btn btn-outline-dark ml-2" style="padding: 5 5px;">edit</button>
            {{idUser}}
        </div>
    </div>  
</template>


<script>
export default {
    data(){
        return {
            tags : this.article.tags.split(',')
        }
    },
    props : ['article','idUser'],
    methods : {
        emitCard(type,data){
            if(type === 'delete' && this.article.author === localStorage.userId){
                this.$emit('cardToParent',{type : 'delete', id : data})
            }else if(type === 'detail'){
                this.$emit('cardToParent', {type : 'detail', id : data})
            }else if(type === 'edit' && this.article.author === localStorage.userId){
                this.$emit('cardToParent', {type : 'edit', id : data})
            }else if(type === 'tagSearch'){
                this.$emit('cardToParent', {type : 'tagSearch', tag : data})
            }else{
                Swal.fire('you are not authorized for this action','','error')
            }
        }

    }
}
</script>
