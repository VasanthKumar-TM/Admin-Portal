var firebaseConfig = {
    apiKey: "AIzaSyAcPhRLki_b_MRNQ98m0ItxNBr6QCkXaBI",
    authDomain: "food-app-740db.firebaseapp.com",
    projectId: "food-app-740db",
    storageBucket: "food-app-740db.appspot.com",
    messagingSenderId: "440859497444",
    appId: "1:440859497444:web:0bcd6035e2d7f507f12df1",
    measurementId: "G-B1EKFRLL0G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

editDetail();

function editDetail() {
    var val = localStorage.getItem("val");

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

                // document.getElementById('topic').innerHTML = '<h4 class="page-title text-primary">'+ myObj[i]._id +'</h4>';
                // document.getElementById('img').innerHTML = '<img  style="width: 150px; height: 150px;   display: block; margin-left: auto; border-radius: 50%; margin-right: auto;" src="'+ myObj[i].foodpic +'" alt="Card image cap">'
                // document.getElementById('name').innerHTML = myObj[i]._id;
                // document.getElementById('details').innerHTML = '<tbody><tr><td><b>Price</b></td><td><b>₹'+ myObj[i].foodprice+'/-</b></td></tr><tr><td>Preparation Time</td><td>'+ myObj[i].foodpreptime +' Minutes</td></tr><tr><td>Time</td><td>10:00 AM - 10:00 PM</td></tr></tbody>'

                document.getElementById("foodName").value = myObj[val]._id;
                document.getElementById("foodPrice").value = myObj[val].foodprice;
                document.getElementById("foodTime").value = myObj[val].foodpreptime;
                var fImg = document.getElementById('foodImage');
                fImg.src = myObj[val].foodpic;
                document.getElementById('foodPic').innerHTML = myObj[val].foodpic;
                // console.log(document.getElementById('foodPic'));
                // if(localStorage.getItem("oneorzero") == '1'){
                //     // document.getElementById('foodPic').setAttribute('required','true');
                //     console.log(localStorage.getItem("oneorzero"));
                //     localStorage.setItem("oneorzero", '0');
                //     console.log('2 '+localStorage.getItem("oneorzero"));
                // }
                
            }
        }
    }
    xhr.send();
}

function editComplete(){
    const ref = firebase.storage().ref();
            const file = document.querySelector("#foodPic").files[0];
            var currentdate = new Date();
            var datetime = "foodpic" + currentdate.getDate()
                + (currentdate.getMonth() + 1)
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            const metadata = {
                contentType: file.type
            };

            const task = ref.child(datetime).put(file, metadata);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    console.log(url);
                    if(localStorage.getItem("oneorzero") == '1'){
                        // document.getElementById('foodPic').setAttribute('required','true');
                        console.log(localStorage.getItem("oneorzero"));
                        localStorage.setItem("oneorzero", '0');
                        console.log('2 '+localStorage.getItem("oneorzero"));
                        localStorage.setItem("url", url);
                    }
                })
                .catch(console.error);

}

function picChange(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        imageData = dataURL;
        var output = document.getElementById('foodImage');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);

    localStorage.setItem("oneorzero", '1'); 
}