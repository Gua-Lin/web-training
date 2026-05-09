let p1 = { username: "admin" , password: "123456" };

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let userInput = document.getElementById('username') ;
        let passInput = document.getElementById('password') ;

        if (userInput.value.trim() === '' || passInput.value.trim() === '') {
        alert('请输入用户名和密码');
        return;
        }

        if (userInput.value === p1.username && passInput.value  === p1.password) {
            alert('成功');
        } else {
            alert('失败');
        }
    });
});