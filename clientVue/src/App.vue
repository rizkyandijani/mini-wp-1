<template>
<div>
    <div>
            <nav v-show="isLogin && page ==='main'" class="navbar navbar-light" style="font-family: 'Convergence'; background-color:#002949; color: white; position: fixed;width: 100%; z-index: 1;">
                <div class="row col-12 d-flex">
                    <div id="icon" class="col">
                            <a href="" id="sidebarCollapse" class="mr-2">
                                <i class="fas fa-align-justify fa-lg"></i>
                            </a>
                        <a href="#" class="navbar-brand mb-0 h1" style="font-family: Montserrat; color: white">
                            <span>Yo -</span>
                            <span style="font-weight: bold">Blogg</span>
                        </a>
                    </div>
                    <div id="user" class="col d-flex align-content-center justify-content-end flex-wrap" style="margin-right: -40px">
                        <button @click.prevent="emptyForm() , edit = false" data-toggle="modal" data-target="#modalCreateArticle" type="button" class="btn btn-light mr-3" style="padding: 0 5px;"><i class="fas fa-plus-square mr-2"></i>Article</button>                        
                        <a href="">
                            <image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="rounded-circle" width="30px" height="30px"></image>
                        </a>        

                        <a href="" @click.prevent="signOut" class="ml-3">logout</a>
                    </div>
                </div>
            </nav>
            <div class="wrapper" >
                    <!-- Sidebar -->
                    <nav id="sidebar" v-show="isLogin && page === 'main'"  class="active" style="margin-top:50px;position: fixed; z-index: 2;">
                            <div class="sidebar-header">
                                    <h3 style="font-family: Montserrat">Navigation</h3>
                                </div>
                                <ul class="list-unstyled components">
                                    <li class="">
                                        <a href="#"><i class="fas fa-home mr-2" ></i>Home</a>
                                    </li>
                                    <li class="">
                                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fas fa-check-square mr-2"></i>Published</a>
                                        <ul class="collapse list-unstyled" id="homeSubmenu">
                                            <li>
                                                <a href="#">Home 1</a>
                                            </li>
                                            <li>
                                                <a href="#">Home 2</a>
                                            </li>
                                            <li>
                                                <a href="#">Home 3</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i class="fas fa-pencil-ruler mr-2"></i>Draft</a>
                                        <ul class="collapse list-unstyled" id="pageSubmenu">
                                            <li>
                                                <a href="#">Page 1</a>
                                            </li>
                                            <li>
                                                <a href="#">Page 2</a>
                                            </li>
                                            <li>
                                                <a href="#">Page 3</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#"><i class="fas fa-id-card mr-2"></i>Contact</a>
                                    </li>
                                </ul>
                    </nav>
                    <div class="modal fade" id="modalCreateArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size: 18px; margin: 0;padding: 0">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content" style="background-color: rgba(49, 49, 51, 0.6); color: white;">
                            <div class="modal-header" style="border-bottom: none">
                                <h5 v-if="!edit" class="modal-title" id="ModalLabel" style="font-weight: bold">Create Article</h5>
                                <h5 v-if="edit" class="modal-title" id="ModalLabel" style="font-weight: bold">Edit Article</h5>                                
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="margin: 0">
                                    <form id="create-form" class="col-10 offset-1">
                                        <img v-show="edit" style="width : 300px; height: 300px" v-bind:src=newArticle.image alt="articleImage">
                                        <div class="form-row mb-3">
                                            <div class="col">
                                                <label for="title">Title</label>
                                                <input v-model="newArticle.title" type="text" class="form-control" id="title" placeholder="Title.." style="color:white; background: none">    
                                            </div>
                                            <div class="col">
                                                <label for="description">Description</label>
                                                <input v-model="newArticle.description" type="text" class="form-control" id="description" placeholder="description.." style="color:white; background: none">    
                                            </div>
                                        </div>
                                        <div class="" style="background: white; padding: 5px;">
                                                <tags-input v-model="newArticle.selectedTags" style="color: white" element-id="tags" :existing-tags="objectTag" :typeahead="true"></tags-input>
                                        </div>
                                        <br>
                                        <div class="form-group">
                                            <label for="picture">Image</label>
                                            <input v-on:change="uploadImage" class="btn" type="file"  id="imageInput" style="color: white"/>    
                                        </div>
                                        <div class="form-group">
                                            <label for="article">Article</label>
                                            <wysiwyg v-model="newArticle.content"></wysiwyg>
                                        </div>
                                        <div class="row justify-content-center">
                                        <button v-show="!edit" id="create-article" type="button" class="btn btn-success mr-1" data-toggle="modal" data-target="#modalCreateArticle" v-on:click=" createArticle" style="padding:0px;margin:0px">create article</button>
                                        <button v-show="edit" id="create-article" type="button" class="btn btn-success mr-1" data-toggle="modal" data-target="#modalCreateArticle" v-on:click=" editArticle(newArticle.id)" style="padding:0px;margin:0px">edit article</button>
                                        
                                        <button id="reset-form" type="button" class="btn btn-danger ml-1" v-on:click="emptyForm" style="padding:0px;margin:0px;">reset form</button>
                                        </div>

                                    </form>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="loadingModal" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-body row justify-content-center">
                                <img src="https://2.bp.blogspot.com/-S-RnhRYTQrk/Vq3jyHesheI/AAAAAAAAAac/CoOz0Gqx2S0/s1600/loading1.gif" width="200px;" height="200px" alt="...">
                            </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="isLogin" id="content-container" class="jumbotron" style="background : none;margin-bottom: 0; background-size: cover;">
                        <div v-show="!detail">
                            <div class="d-flex justify-content-center">
                                <div class="card col-4" style="background-color: grey">
                                    <div class=" col">
                                        <form class="form mb-2 mt-2">
                                        <input v-model="searchQuery" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="background-color: white">
                                        </form>
                                        <button @click.prevent="tagQuery = '', searchQuery = '', getArticle()" type="button" class="btn btn-danger" style="padding: 0 3px;">Reset Search</button>
                                    </div><br>
                                    <div id="tagContainer" class="col mt-2">
                                        <button @click.prevent="tagQuery = tag, getArticle()" v-for="(tag,index) in tags" v-bind:key='index' type="button" class="btn btn-dark mr-1 ml-1 mb-2" style="padding: 0 3px;margin:0px">{{tag}}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 p-5" style="">
                                <div class="row justify-content-center">
                                    <articleCard v-for="article in filteredResources" :key="article._id" v-bind:article="article" v-bind:localStorageId="idUser" v-on:cardToParent="fromCard"></articleCard>
                                </div>
                            </div>    
                        </div>
                        <div v-if="detail" class="d-flex justify-content-center">
                            <div class="card" style="width : 100%">
                                <!-- <div class="card-header">
                                    <h3>{{detailData.title}}</h3>
                                </div> -->
                                <div class="card-body">
                                    <div class="d-flex justify-content-center">
                                        <img style="width : 100%; max-height: 800px;; " v-bind:src=detailData.image alt="articleImage">
                                    </div>
                                    <br>
                                    <span>Author : {{detailData.userId.firstName}} {{detailData.userId.lastName}}</span>
                                    <br>
                                    <span v-html="detailData.content"></span>
                                </div>
                                <div class="card-footer">
                                    <button id="back-to-list" type="button" class="btn btn-primary" v-on:click="detail = false">back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="landing-page" v-show="page === 'landingPage'" class="jumbotron" style="margin: 0; background: url(https://images.pexels.com/photos/1585969/nature-milky-way-galaxy-space-1585969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);background-size: cover">
                <div id="contentLogin" class="row col-lg-12 col-md-6 col-sm-3">
                    <div id="quote" class="col" style="color: white;margin-left: 100px;margin-top: 100px; font-size: 40px;height: 100%">
                        <span id="appName" style="font-size: 60px;">YO<span style="font-weight: bold">BLOGG</span> 
                        </span><br>
                        <span style="font-family: 'Petit Formal Script'">find inspiration within humanity</span>
                        <div style="margin-left: 240px;font-family: Petit Formal Script">
                            <button type="button" class="btn btn-outline-light" style="width: 200px;height: 50px;">
                                Find Inspiration
                            </button>
                        </div>
                    </div>
                    <div id="form" class="col d-flex justify-content-center" style="margin-top: 120px;height: 100%" >
                        <div>
                        <loginForm v-show="landForm == 'login'" v-on:loginToParent="fromLogin" />
                        </div>
                        <registerForm v-show="landForm == 'register'" v-on:registerToParent="fromRegister"/>
                    </div>
                </div>
            </div>    
</div>
</template>

<script>
import vueWysiwyg from './vueWysiwyg'
import registerForm from './register'
import loginForm from './login'
import articleCard from "./articleCard";
import axios from 'axios'

let ax = axios.create({
    baseURL : 'http://localhost:3000',
})

export default {
    components : {
        registerForm,
        loginForm,
        wysiwyg : vueWysiwyg.component,
        "tags-input" : VoerroTagsInput,
        articleCard
    },
    data(){
        return {
            articles : [],
            tags : [],
            objectTag : {},
            message: 'hello world',
            landForm : 'login',
            isLogin : false,
            page : "landingPage",
            newArticle : {
                id : '',
                title : '',
                description : '',
                image : '',
                selectedTags : [],
                content : ''
            },
            searchQuery : '',
            tagQuery : '',
            file : '',
            edit : false,
            detail : false,
            detailData : '',
            idUser : localStorage.userId
        }
    },
    methods : {

        loggedIn(){
            this.isLogin = true,
            this.page = 'main'
            ax.defaults.headers.common['token'] = localStorage.token
            this.getArticle()
            this.getAllTag()
            console.log(this.tags);
            
            
        },
        fromLogin(data){
            if(data === 'toRegister'){
                console.log('masuk mau ubah state ke register');
                this.landForm = 'register'
            }
            else if( data === 'signout'){
                this.signOut()
            }
            else if(data.type === 'google'){
                console.log('masuk dari login google',data);
                
                console.log('data token',data.token);
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/users/loginGoogle',
                    headers: {
                        id_token : data.token
                    }
                })
                .then(({data})=>{
                    console.log('dapet data success login',data);
                    
                    this.successLogin(data)
                })
                .catch(err=>{
                    console.log('yah error');
                    console.log(err.response);
                    
                })
            }
            else{
                console.log('ini ada data object login',data);
                ax.post('/users/login',{
                    email : data.email,
                    password : data.password
                })
                .then(({data})=>{
                    console.log(data);
                    this.successLogin(data)
                })
                .catch(err =>{
                    console.log(err.response.data);
                })
            }
        },

        successLogin(data){
            ax.defaults.headers.common['token'] = data.token
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', `${data.firstName} ${data.lastName}`)
            localStorage.setItem('email', data.email)
            localStorage.setItem('userId', data.id)
            this.loggedIn()
            Swal.fire(`welcome ${localStorage.name}`,'','success')
        },

        fromRegister(data){
            if(data === 'toLogin'){
                console.log('trigerred ubahs state ke login');
                
                this.landForm = 'login'
            }else{
                console.log('ini ada data object register', data);
                ax.post('/users/register',data)
                .then(user =>{
                    Swal.fire('sucessfully registered', '', 'success')
                    this.landForm = 'login'
                })
                .catch(err =>{
                    console.log(err.response.data)
                })
            }
        },

        getAllTag(){
            ax.get('/articles')
            .then(({data})=>{
                
                let array = []
                data.forEach(element=>{
                    
                    let tagArr = element.tags.split(',')
                    
                    tagArr.forEach(tag =>{
                        if(array.indexOf(tag) !== -1){
                            
                        }else{
                            
                            array.push(tag)
                        }
                        this.objectTag[tag] = tag
                    })
                })
                console.log('ini array',array);
                
            this.tags = array.sort()
            console.log('semua tag',this.tags);
            console.log('iki object tag',this.objectTag);
            
            
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },

        getArticle(){
            let link = ''
            if(this.tagQuery){
                link = `/articles?tag=${this.tagQuery}`
            }else{
                link = `/articles`
            }
            ax.get(`${link}`)
            .then(({data})=>{
                console.log(data);
                this.articles = data
            })
            .catch(err =>{
                console.log(err.response);
            })
        },

        uploadImage(){
            this.file = '',
            this.file = event.target.files[0]
            this.newArticle.image = this.file
            console.log('file masuk',this.file);

            let formData = new FormData()
            formData.append('image',this.file)

            ax.post('/articles/cekTag',formData)
            .then(({data}) =>{
                console.log(data);
                this.newArticle.selectedTags = data
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },

        createArticle(){
            $("#loadingModal").modal('show')            
            let formData = new FormData()
            formData.append('image', this.newArticle.image)
            formData.append('title', this.newArticle.title)
            formData.append('description', this.newArticle.description)
            formData.append('content', this.newArticle.content)
            formData.append('tags',this.newArticle.selectedTags)
            
            ax.post('/articles',formData)
            .then(({data})=>{
                $("#loadingModal").modal('hide')
                Swal.fire('successfully create article','','success')            
                this.emptyForm()
                this.getArticle()
                this.getAllTag()
            })
            .catch(err =>{
                console.log(err.response);

            })
        },

        emptyForm(){
            console.log('empty form jalan');
            
            this.newArticle = {
                title : '',
                description: '',
                content: '',
                image : '',
                selectedTags : []
            }
            $("#imageInput").val('')
        },


        fromCard(data){
            if(data.type === 'delete'){
                console.log('masuk delete');
                
                this.deleteArticle(data.id)
            }else if(data.type === 'detail'){
                console.log('masuk detail');
                this.getDetailData(data.id)
                this.detail = true
            }else if(data.type === 'edit'){
                console.log('masuk edit');                
                this.edit = true
                this.getEditData(data.id)
            }else{
                this.tagQuery = data.tag
                this.getArticle()
            }
        },

        getDetailData(id){
            ax.get(`articles/${id}`)
            .then(({data})=>{
                let arrTag = data.tags.split(',')
                let detail = data
                detail.tags = arrTag
                console.log(detail);
                this.detailData = detail
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },

        getEditData(id){
            console.log(id);
            ax.get(`articles/${id}`)
            .then(({data}) =>{
                let arrTag = data.tags.split(',')
                
                // console.log('article',data);
                this.newArticle.title = data.title,
                this.newArticle.description = data.description || '',
                this.newArticle.content = data.content
                this.newArticle.image = data.image
                this.newArticle.selectedTags = arrTag
                this.newArticle.id = data._id
                $("#modalCreateArticle").modal('show')
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },

        editArticle(id){
            $("#loadingModal").modal('show')
            let formData = new FormData()
            formData.append('image', this.newArticle.image)
            formData.append('title', this.newArticle.title)
            formData.append('description', this.newArticle.description)
            formData.append('content', this.newArticle.content)
            formData.append('tags',this.newArticle.selectedTags)

            ax.patch(`articles/${id}`,formData)
            .then(({data})=>{
                $("#loadingModal").modal('hide')
                Swal.fire('successfully edit article','','success')
                this.articles = []
                this.getArticle()
                this.getAllTag()
            })
            .catch(err =>{
                console.log(err.response.data);
                
            })
        },

        deleteArticle(id){
            console.log(id);
            ax.delete(`/articles/${id}`)
            .then(({data})=>{
                this.getArticle()
                this.getAllTag()

            })
            .catch(err =>{
                console.log(err.response);
            })
            
        },

        signOut(){
            // if(gapi.auth2 != undefined){
            //     var auth2 = gapi.auth2.getAuthInstance()
            //     auth.signOut()
            //     .then(()=>{
            //         localStorage.clear()
            //         this.isLogin = false
            //         this.page = "landingPage"
            //     })
            // }else{
                localStorage.clear()
                this.isLogin = false
                this.page = "landingPage"
            
        }
    },
    computed : {
        filteredResources(){
            if(this.searchQuery){
                return this.articles.filter((item)=>{
                    return item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            }else{
                return this.articles
            }
        }
    },
    created(){
        if(localStorage.token){
            this.loggedIn()
        }else{
            this.isLogin = false
            this.page = "landingPage"
            // this.loadGAPI()
        }
    }
}

$(document).ready(function(){
    $('#sidebarCollapse').on('click', function () {
        event.preventDefault()
        $('#sidebar').toggleClass('active');
    });
})

</script>

<style scoped>

</style>

