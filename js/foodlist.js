
function foodCat(name){
    var CatName = name;  
    console.log(CatName);
    localStorage.setItem("category", CatName);    
    window.location.replace("foodlist.html");
    
}

foodList();

function foodList() {
    var category = localStorage.getItem("category");
    console.log('2 '+category);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apifoodapp.herokuapp.com/infoFood', false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            res = xhr.responseText;
            // console.log(res);
            if (res != '') {
                console.log(typeof(res));
                var myObj = JSON.parse(res);
                console.log(typeof(myObj));
                var length = myObj.length;
                // console.log(length);
                // console.log(myObj[0]._id);

                for(var i=0 ; i<length; i++){
                    console.log(i);
                    if(myObj[i].foodtype == category){
                        document.getElementById('foodCard').innerHTML += '<div class="col-md-6 col-lg-3"><div class="card d-block"><br><img style="width: 150px; height: 150px; border-radius: 50%; display: block; margin-left: auto; margin-right: auto;" src="'+ myObj[i].foodpic +'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+ myObj[i]._id +'</h4><p class="card-text">Price: ₹'+ myObj[i].foodprice +'/-</p><a href="javascript: void(0);" class="btn btn-primary" onclick="one()">Button</a></div></div></div>' ;
                    }
                    
                }
            }
        }
    }
    xhr.send();
}

