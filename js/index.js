(async function() {
    //验证是否有登录，如果没有登录，跳转到登录页；如果有登录，获取登录页
    const resp = await API.profile();//调用接口。获取当前用户的登录信息
    // console.log(resp);
    const user = reap.data; //用户登录数据
    const doms = {
        aside : {
            nickname : $('#nickname'),
            loginId : $('loginId'),
        },
        close : $('.close'),
        chatContainer :$('.chatContainer'),

    }

    if(!user) {
        //目前不是登录状态
        alert('未登录或登录已过期，请重新登录');
        location.href = './login.html';  //跳转到登录页
        return;
        
    }

    //下面的代码环境，一定是登录状态
    // 用户信息
    setUserInfo();

    //注销事件
    doms.close = function() {
        API.loginOut();//注销
        location.href = './login.html'; //跳转到登录页面
    }

    //加载历史记录
    await loadHistory();

    async function loadHistory () {
        const resp = API.chatHistory; //是一个数组
        // 进行循环
        for(const item of resp.data) {
            addChat(item);
        }
    }

    //设置用户信息
    function setUserInfo() {
        doms.aside.nickname.innerText = user.nickname;
        doms.aside.loginId.innerText = user.loginId;
    }

    //根据消息对象，将其添加到页面中。（添加一条消息。）
    //判断是me还是机器人
    function addChat(chatInfo) {
        // 第一个div--存放聊天信息的container
        const div = $$$('div');
        div.classList.add('chat-item');
        if(chatInfo.from) {
            div.classList.add('me');
        };
        //img--头像图片
        const img = $$$('img');
        img.src = chatInfo.from ? './asset/avatar.png' : "./asset/robot-avatar.jpg";

        //第二个div--聊天内容
        const content = $$$('div');
        content.classList.add('chat-content');
        content.innerText = chatInfo.content;

        //第三个div。日期
        const date = $$$('date');
        date.classList.add('chat-date');
        date.innerText = formDate(chatInfo.createdAt);

        // 将这些添加到容器中
        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);

        doms.chatContainer.appendChild(div);
    }

    //自定义时间戳函数
    function formDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        //月0--11，+1 。转换成字符串，保留两位,前边补充0。
        const month = (date.getMonth() + 1).toString().padStart(2,'0');
        const day = date.getDay().toString().padStart(2,'0');
        const hour = date.getHours().toString().padStart(2,'0');
        const minute = date.getMinutes().toString().padStart(2,'0');
        const second = date.getSeconds().toString().padStart(2,'0');

        // 返回拼接结果
        return `${year}-${month}-${day}-${hour}-${minute}-${second}`


    }
    // addChat({
    //     "_id": "6344d9e42f439b3294a7e4ea",
    //     "from": "agoagoago",
    //     "to": null,
    //     "content": "你好",
    //     "createdAt": 1665456612502

    // })

    //让聊天区域的滚动条滚动到底
    // function scrollBottom() {
    //     doms.chatContainer.scrollTop
    // }

    //聊天消息内容

    // 发送消息事件--提交事件
   
})();