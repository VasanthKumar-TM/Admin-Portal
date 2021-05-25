

function valueData(val) {
    console.log(val);
    var arr = val;  
    localStorage.setItem("val", arr);    
    window.location.replace("editDetail.html");
}

foodDetail();

function foodDetail() {
    var i = localStorage.getItem("i");
    console.log(i);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apifoodapp.herokuapp.com/infoFood', false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            res = xhr.responseText;
            // console.log(res);
            if (res != '') {
                var myObj = JSON.parse(res);
                var length = myObj.length;

                document.getElementById('topic').innerHTML = '<h4 class="page-title text-primary">'+ myObj[i]['_id'] +'</h4>';
                document.getElementById('img').innerHTML = '<img  style="width: 150px; height: 150px;   display: block; margin-left: auto; border-radius: 50%; margin-right: auto;" src="'+ myObj[i].foodpic +'" alt="Card image cap">'
                document.getElementById('name').innerHTML = myObj[i]._id;
                document.getElementById('details').innerHTML = '<tbody><tr><td><b>Price</b></td><td><b>₹'+ myObj[i].foodprice+'/-</b></td></tr><tr><td>Preparation Time</td><td>'+ myObj[i].foodpreptime +' Minutes</td></tr><tr><td>Time</td><td>10:00 AM - 10:00 PM</td></tr></tbody>'
                document.getElementById('editButton').innerHTML = '<button class="btn btn-outline-success mt-4 mb-2 btn-rounded" onclick="valueData('+ i +')" > <i class="uil-edit"></i> Edit</button>';
            }
        }
    }
    xhr.send();
}
