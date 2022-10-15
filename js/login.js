//登录--账号、密码
//调用构造函数.账号
const loginIdValidator = new FieldValidator('txtLoginId',async function(val) {
    if (!val){ //账号框无值
        return '请填写账号';
    }
})

//调用构造函数.密码
const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val) {
    if (!val){ //账号框无值   
        return '请填写密码'; 
    }else {

    }
})



//找表单元素
const form = $('.user-form');

//给表单元素绑定事件，提交事件
form.onsubmit = async function(e) {
    e.preventDefaule(); //阻止事件的默认行为
    console.log('表单正在提交');

    //进行验证
    const result = await FieldValidator.validate(
        loginIdValidator, 
        loginPwdValidator, 
        );
    // console.log(result);
    if(!result){
        return; //验证未通过
    }

    const formData = new FormData(form); // 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());

    //得到对象，传进API。看响应结果
    const resp = await API.login(data);
    //如果响应没有错误
    if (resp.code === 0) {
        alert('登录成功，点击确定，跳转到登录页');
        location.href = './index.html';
    }else {
        alert('登录失败，请检查账号和密码');
    }
};

