import {useParams} from 'react-router-dom';
import { useState } from 'react';
import {object,string,number} from 'yup';
import '../App.css';
import axios from 'axios';

const userSchema=object({
    email:string().email().required('required'),
    name:string().required().min(6),
    password:string().min(6).max(12).required(),
    confirmPassword:string().min(6).max(12).required().test('passord is matched',function(value){
        return value=this.parent.password;
    })
})

const Signup=()=>{
    const params=useParams();
    const [details,setDetails] = useState({
        email:'',
        name:'',
        password:'',
        confirmPassword:''
    });
    const [errors,setErrors]=useState({});
    const handleOnChange=(key,value)=>{
        setDetails({...details,[key]:value})
    }
    const handleSumbit =()=>{
       userSchema.validate(details,{abortEarly:false}).then((res)=>{
        setErrors({});
        console.log(res);
        axios({
            method:'post',
            url:'https://api.backendless.com/07AA61C5-4799-9F89-FF92-011767A3B000/24C0C976-E9EB-4CBC-8709-1523EE591A7C/users/register',
            data: {
                name: details['name'],
                email: details['email'],
	            password: details['password']
            }
        }).then((res)=>{
            if(res.status == 200)
            {
                console.log(res)}
            }).catch((err)=>{console.log(err)})
       })
       .catch((err)=>{
        let Obj={};
        err.inner.map((err)=>{
            return Obj[err.path]= err.message;
        })
        setErrors(Obj);
    })
    }
    return(
        <div className='d-flex justify-content-center align-items-center'style={{}}>
            <div className="form-group container1 d-block" style={{width:'25%',borderRadius:10,marginTop:'5%'}}>
                <br/>
                <h3 className='text-primary'>Registration</h3>
                <hr/>
                <div><input type="email" className='form-control' placeholder="Enter email" style={{width:'90%',marginLeft:15,marginTop:10}} onChange={(event)=>{handleOnChange('email',event.target.value)}}/>
                <p className='text-danger'>{errors['email']}</p>
                </div>
                <div><input type="text" className='form-control'placeholder="Name" style={{width:'90%',marginLeft:15,marginTop:10}} onChange={(event)=>{handleOnChange('name',event.target.value)}}/>
                <p className='text-danger'>{errors['name']}</p>
                </div>
                <div><input type="password" className='form-control'placeholder="Password" style={{width:'90%',marginLeft:15,marginTop:10}} onChange={(event)=>{handleOnChange('password',event.target.value)}}/>
                <p className='text-danger'>{errors['password']}</p>
                </div>
                <div><input type="password" className='form-control' placeholder="Confirm password" style={{width:'90%',marginLeft:15,marginTop:10}} onChange={(event)=>{handleOnChange('confirmPassword',event.target.value)}}/>
                <p className='text-danger'>{errors['confirmPassword']}</p>
                </div>
                <div><button type="submit" className="btn btn-primary" style={{width:'90%',marginTop:10}} onClick={handleSumbit}>Signup</button></div>
                <br/>
                <p className='text-secondary'>Already registered? <a href='/login'>login</a> here</p>
                <br/>
            </div>
        </div>
    )
}

export default Signup;