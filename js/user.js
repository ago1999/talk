// 文本框id
// 验证规则

// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */

class FieldValidator {
    /**
     * 构造器说明
     * @param {String} txtId 文本框的Id
     * @param {function} validatorFunc 
     * 验证规则函数，当需要对该文本框进行验证时，会调用该函数，
     * 函数的参数为当前文本框的值，
     * 函数的返回值为验证的错误消息，若没有返回，则表示无错误
     */

    //* 构造器
    constructor(txtId,validatorFunc) {
        this.input = $('#' + txtId); //根据文本框Id选出input. '#' +id就是一个id选择器
        //选出报错误的p元素
        this.p = this.input.nextElementSibling;
        // console.log(this.input, this.p);

        this.validatorFunc = validatorFunc;

        //验证。失去焦点，出发验证。         表单提交
        this.input.onblur = () => {
            this.validate();
        };
    }

    // 回调函数。说明 验证规则：验证成功--true，验证失败--false
     async validate() {
        const err = await this.validatorFunc(this.input.value); //传入当前文本框的值
        if(err) {//如果文本框有值,进行判断
            //有错误
            this.p.innerText = err;
            return false; //验证失败
        }
        else {
            this.p.innerText = '';
            return true; //验证成功
        }
    }

    /**
     * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
     * @param {FieldValidator[]} validators
     */
    // 静态方法。
    static async validate(...validators) {
        const proms = validators.map(v=>v.validate())
        const results = await Promise.all(proms);//[true,false]
        //查找问题，看result中是否每个都为false
        return results.every((r) => r);
    }    
}

// //调用构造函数.账号
// const loginIdValidator = new FieldValidator('txtLoginId',async function(val) {
//     if (!val){ //账号框无值
//         return '请填写账号';
//     }
//     // 账号框有值
//     const resp = await API.exists(val);
//     if(resp.data){
//         // console.log('faffcafv')
//         return '该账号已被占用';
//     }
    
// })

// //调用构造函数.昵称
// const nicknameValidator = new FieldValidator('txtNickname',async function(val) {
//     if (!val){ //账号框无值
//         // console.log('请填写昵称');
//         return '请填写昵称'; 
//     }   
// })

// //调用构造函数.密码
// const loginPwdValidator = new FieldValidator('txtLoginPwd',async function(val) {
//     if (!val){ //账号框无值
        
//         return '请填写密码'; 
//     } 
// })

// //调用构造函数.确认密码
// const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function(val) {
//     if (!val){ //账号框无值
//         return '请填写确认密码'; 
//     }

//     if (val !== loginPwdValidator.input.value ) {
//         return '两次密码不一致';
        
//     }
// })



// function test() {
//     FieldValidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, loginPwdConfirmValidator).then((result) => {
//         console.log(result);
//     })
// }