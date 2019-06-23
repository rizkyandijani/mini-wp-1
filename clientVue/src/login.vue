<template>
            <div id="login-form" class="card" style="width: 500px;background-color: rgba(255, 255, 255, 0.5)">
            <h2 class="text-center mt-5" style="font-weight: bolder; color: white; font-family: convergent;">Login to Your Account</h2>
            <form @submit.prevent="emitting('passdata')" class="m-4" style="font-family: Cinzel;color: white" >
                <div class="form-group row justify-content-center">
                    <label class="col-1" for="exampleInputEmail1"><i class="fas fa-envelope fa-lg"></i></label>
                    <input v-model="login.email" type="email" class="form-control col-7" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text" style="color: white">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group row justify-content-center">
                    <label for="exampleInputPassword1" class="col-1"><i class="fas fa-key fa-lg"></i></label>
                    <input v-model="login.password" type="password" class="form-control col-7" id="passwordLogin" placeholder="Password">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary row mb-3">Login</button>
                    <br>
                    <div class="row justify-content-center" style="font-weight: bold">
                        <span>Click <a href="" @click.prevent="emitting('changepage')" style="color: grey">here</a> if you don't have any account</span>
                        <br>
                        <!-- <div class="g-signin2 mt-2" data-onsuccess="onSignIn">button</div> -->
                        <!-- <div id="g-signin2"></div> -->
                        <div>
                            <GoogleLogin type="button" class="btn btn-primary mt-2" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"> <i class="fab fa-google mr-2"></i> Login Google</GoogleLogin>
                            <!-- <GoogleLogin type="button" class="btn btn-danger" :params="params" :logoutButton=true>Logout</GoogleLogin> -->
                        </div>
                        <!-- <a href="" @click.prevent="emitting('signout')">Sign Out</a> -->
                    </div>
                </div>
            </form>
            </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
    props : [],
    components : {
        GoogleLogin
    },
    data(){
        return{
            login : {
                email : '',
                password : ''
            },
            tokenGoogle : '',
            params : {
                client_id: '1033942918311-kkrejim83g7fncmpbnft7ch6auri3kqf.apps.googleusercontent.com'
            }
        }
    },
    methods : {
        emitting(e){
            console.log('ngemit');
            
            if(e === 'passdata'){
                this.$emit('loginToParent',this.login)
                this.emptyFormLogin()
            }
            else if( e === 'loginGoogle'){
                console.log('emitting loginGoogle',this.tokenGoogle);
                
                this.$emit('loginToParent',{type : 'google',token : this.tokenGoogle})
                this.tokenGoogle = ''
            }
            else if(e === 'signout'){
                this.$emit('loginToParent','signout')
            }
            else{
                this.$emit('loginToParent','toRegister')
            }
        },
        emptyFormLogin(){
          this.login =  {
              email : '',
              password : ''
          }  
        },
        onSuccess(googleUser){
            console.log(googleUser);
            let id_token = googleUser.getAuthResponse().id_token
            console.log('ini id token di login',id_token);
            this.tokenGoogle = id_token
            this.emitting('loginGoogle')
        },
        onFailure(err){
            console.log(err)
        }
    },
    mounted(){
    }
}

</script>

