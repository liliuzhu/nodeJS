$(function () {

    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function () {
        $registerBox.show();
        $loginBox.hide();
    });

    //切换到登录面板
    $registerBox.find('a.colMint').on('click', function () {
        $loginBox.show();
        $registerBox.hide();
    });


    //注册
    $registerBox.find('button').on('click', function () {
        //通过ajax提交请求
        var data = {
            username: $registerBox.find('[name="username"]').val(),
            password: $registerBox.find('[name="password"]').val(),
            repassword: $registerBox.find('[name="repassword"]').val()
        };
        var url = '/api/user/register';
        sendAjax(url, data, function (result) {
            $registerBox.find('.colWarning').html(result.message);
            if (!result.code) {
                //注册成功
                $registerBox.find('input').val('');
                setTimeout(function () {
                    $loginBox.show();
                    $registerBox.hide();
                }, 1000);
            }

        });
    });

    //登录
    $loginBox.find('button').on('click', function () {
        var data = {
            username: $loginBox.find('[name="username"]').val(),
            password: $loginBox.find('[name="password"]').val()
        };
        var url = '/api/user/login';
        sendAjax(url, data, function (result) {
            $loginBox.find('.colWarning').html(result.message);
            if (!result.code) {
                //登录成功
                window.location.reload();
            }
        });
    });

    //退出
    $('#logout').on('click', function () {
        $.ajax({
            url: '/api/user/logout',
            success: function (result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        });
    })

});