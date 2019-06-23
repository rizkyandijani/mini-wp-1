<template>
    <div id="register-form" class="card" style="width: 500px;background-color: rgba(255, 255, 255, 0.5)">
            <h2 class="text-center mt-5 mb-4" style="font-weight: bolder; color: white; font-family: convergent">Create Your Account</h2>
            <form @submit.prevent="emitting('passdata')" class="col-8 offset-2 text-center" style="font-family: Cinzel;color: white; padding: 5px; font-weight: bold">
                <div class="form-group">
                    <label  for="firstNameRegister">First Name</label>
                    <input v-model="register.firstName" type="text" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="lastNameRegister">Last Name</label>
                    <input v-model="register.lastName" type="text" class="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input v-model="register.email" type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text" style="color: white">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="register.password" type="password" class="form-control" id="passwordRegister" placeholder="Password">
                </div>
                    <button type="submit" class="btn btn-primary row mb-3">Register</button>
                    <br>
                    <div class="row justify-content-center">
                        <span>Click <a href="" @click.prevent="emitting('changepage')" style="color: grey">here</a> if you already have an account</span>                                                
                    </div>
            </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            register : {
                firstName : '',
                lastName : '',
                email : '',
                password : ''
            }
        }
    },
    methods : {
        emitting(e){
            if(e === 'passdata'){
                this.$emit('registerToParent', this.register)
                this.emptyFormRegister()
            }else if(e === 'changepage'){
                console.log('ke chaknge');
                
                this.$emit('registerToParent','toLogin')
            }
        },
        emptyFormRegister(){
            this.register = {
                firstName : '',
                lastName : '',
                email : '',
                password : ''
            }
        },
    }
}
</script>
