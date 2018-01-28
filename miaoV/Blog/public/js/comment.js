var prepage = 2;
var page = 1;
var pages = 0;
var comments = [];

$('#messageBtn').on('click', function () {
    var data = {
        contentId: $('#contentId').val(),
        content: $('#messageContent').val()
    };
    if (!data.content) {
        alert('评论内容不能为空');
        return;
    }
    sendAjax('/api/comment/post', data, function (res) {
        $('#messageContent').val('');
        page = 1;
        comments = res.data.comments.reverse();
        renderComment();
    });
});

function renderComment() {
    pages = Math.max(1, Math.ceil(comments.length / prepage));
    var start = Math.max(0, (page - 1) * prepage);
    var end = Math.min(start + prepage, comments.length);
    var pager = $('.pager');
    var lis = pager.find('li');
    if (page <= 1) {
        page = 1;
        lis.eq(0).html('<span>没有上一页</span>');
    } else {
        lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if (page >= pages) {
        page = pages;
        lis.eq(2).html('<span>没有下一页</span>');
    } else {
        lis.eq(2).html('<a href="javascript:void(0);">下一页</a>');
    }
    $("#messageCount,#messageCount1").html(comments.length);
    lis.eq(1).html(page + '/' + pages);
    if (comments.length === 0) {
        $('.messageList').html('<div class="messageBox"><p>还没有留言</p></div>');
        pager.hide();
    } else {
        for (var i = start, html = ''; i < end; i++) {
            html += '<div class="messageBox">'
                + '<p class="name clear"><span class="fl">' + comments[i].username + '</span><span class="fr">' + foramDate(comments[i].postTime) + '</span></p><p>' + comments[i].content + '</p>'
                + '</div>';
        }
        $('.messageList').html(html);
        pager.show();
    }

}

/*
* 每次页面重载的时候获取评论列表
* */
$(function () {
    var data = {
        contentId: $('#contentId').val()
    };
    sendAjax('/api/comment', data, function (res) {
        comments = res.data.comments.reverse();
        renderComment();

    }, null, 'get');
    $('.pager').on('click', 'a', function () {
        // alert(1);
        if ($(this).parent().hasClass('previous')) {
            page--;
        } else {
            page++;
        }
        renderComment();
    })
});

function foramDate(d) {
    var datel = new Date(d);
    // console.log(datel);
    return datel.getFullYear() + '-' + twoNumber(datel.getMonth() + 1) + '-'
        + twoNumber(datel.getDate()) + ' ' + twoNumber(datel.getHours()) + ':'
        + twoNumber(datel.getMinutes()) + ':' + twoNumber(datel.getSeconds());
}

function twoNumber(num) {
    return num > 10 ? num : '0' + num;
}