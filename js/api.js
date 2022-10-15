var API = (function () {
    const  BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';
    //封装请求方法--get、post
    // GET
    function get(path) {
        const headers = {};
        //localStorage.getItem(key):获取指定key本地存储的值
        //localStorage.setItem(key,value)：将value存储到key字段
        const token = localStorage.getItem(TOKEN_KEY);
        if(token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, { headers });  //fetch默认是get
    };
    //POST
    function post(path, bodyObj) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem(TOKEN_KEY);
        if(token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, {
            headers, 
            method: 'POST',
            body: JSON.stringify(bodyObj), //将传入的请求体以json格式显示
        });
    };

    //封装接口
    //注册
    async function reg(userInfo) {
        //请求.url也可以用字符串拼接
        //等待解析完成，将响应结果返回
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
    };

    //登录
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if(result.code === 0) {
            //登录成功.要根据token判断是否注册过，进而判断是否登陆成功
            //将响应头中的token保存起来
            const token = resp.headers.get('authorization');
            localStorage.setItem(TOKEN_KEY,token);
        }  
        return result;
    };

    //当前登录的用户信息
    async function profile () {
        const resp = await get('/api/user/profile');//把token带过去，请求服务器
        return await resp.json();
    };

    

    //验证账号
    async function exists (loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    };

    //聊天接口--发送聊天信息
    async function sendChat (content) {
        const resp = await post('/api/chat',{
            content,
        })
        return await resp.json();
    };

    //聊天接口--获取聊天记录
    async function chatHistory () {
        const resp = await get('/api/chat/history');
        return await resp.json();
    };

    //退出登录
    function loginOut () {
        //localStorage.removeItem(key):删除指定key本地存储的值
        localStorage.removeItem(TOKEN_KEY);

    };

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        chatHistory,
        loginOut,
       
    };
})();


