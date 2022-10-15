// 注册----账号、昵称、密码、确认密码

//调用构造函数.账号
const loginIdValidator= new FieldValidator('txtLoginId',async function(val) {
    if (!val){ //账号框无值
        return '请填写账号';
    }
    // 账号框有值
    const resp = await API.exists(val);
    if(resp.data){
        // console.log('faffcafv')
        return '该账号已被占用';
    }
    
})

//调用构造函数.昵称
const nicknameValidator = new FieldValidator('txtNickname',async function(val) {
    if (!val){ //账号框无值
        // console.log('请填写昵称');
        return '请填写昵称'; 
    }   
})

//调用构造函数.密码
const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val) {
    if (!val){ //账号框无值
        
        return '请填写密码'; 
    } 
})

//调用构造函数.确认密码
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function(val) {
    if (!val){ //账号框无值
        return '请填写确认密码'; 
    }

    if (val !== loginPwdValidator.input.value ) {
        return '两次密码不一致';
        
    }
})

//找表单元素
const form = $('.user-form');

// 给表单元素绑定事件，提交事件
form.onsubmit = async function(e) {
    e.preventDefaule(); //阻止事件的默认行为
    console.log('表单正在提交');
   

    //进行验证
    
    const result = await FieldValidator.validate(
        loginIdValidator, 
        nicknameValidator, 
        loginPwdValidator, 
        loginPwdConfirmValidator
        );
    // console.log(result);
    if(!result){
        return; //验证未通过
    }

    //验证通过，用到API

    //浏览器提供的构造函数 FormData，专门来组装表单数据
    // const formData = new FormData(form); //传入表单dom，得到一个表单数据对象
    //formData.entries()  拿到formData的所有键值对
    //Object.fromEntries(数组)  将数组还原成对象
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
    const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());

    //笨方法，自己通过对象组装所需的表单数据
    // const data = {
    //     loginId : loginIdValidator.input.value,
    //     loginPwd : loginPwdValidator.input.value,
    //     nickname : nicknameValidator.input.value,
    // }
        
    //得到对象，传进API。看响应结果
    const resp = await API.reg(data);
    //如果响应没有错误
    if (resp.code === 0) {
        alert('注册成功，点击确定，跳转到登录页');
        location.href('./login.html');
    }
};