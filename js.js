function sendGet() {
    var token = "nRsg7ZdKDNTLgjLA0VoBXOg0HrxgmrkkF1XuBq2w71MDm0Po3xRQJdLUKqw4nMtK";
    $.ajax({
        url: "http://chubgpapi.tongming.biz/api/performance/finereporttest",
        type: 'GET',
        headers: {
            "Authorization": "Bearer "+ token +""
        },
        data: {
            pn : "1"
        }
        success: function (rows) {
            var code = rows["SUCCESS"];
            if (code === "success") {
                alert(code);
            }
        }, error: function () {
            alert("error");
        }
    });
}