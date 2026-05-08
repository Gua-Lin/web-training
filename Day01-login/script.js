var p1 = { username: "admin" , password: "123456" };

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var userInput = document.getElementById('username') ;
        var passInput = document.getElementById('password') ;

        if (userInput.value === p1.username && passInput.value  === p1.password) {
            alert('成功');
        } else {
            alert('失败');
        }
    });
});