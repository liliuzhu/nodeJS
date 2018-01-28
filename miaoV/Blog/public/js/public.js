function sendAjax(url, data, success, error, type) {
    $.ajax({
        type: type || 'post',
        url: url,
        data: data,
        dataType: 'json',
        success: success,
        error: error,
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        timeout: 5000
    });
}