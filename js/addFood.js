
// const fileInput = document.querySelector("#pic");

var imageData;

var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        imageData = dataURL;
        var output = document.getElementById('output');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};

// Function is called by the submit button in addFood .html
function addFood() {
    profile_page.addEventListener("submit", (e) => {
        e.preventDefault();

        function emptyStringcheck(ans) {
            const values = ans.replace(/\s/g, "");
            return values;
        }

        function checkedRadio(ans) {
            for (i = 0; i < ans.length; i++) {
                if (ans[i].checked) {
                    return ans[i].value;
                }
            }
        }

        const name1 = profile_page["name"].value;
        const name = emptyStringcheck(name1);

        const price = profile_page["price"].value;

        const time = profile_page["time"].value;

        var test2 = document.getElementsByName("available");
        var availablity = checkedRadio(test2);

        selectElement = document.querySelector('#category');
        output = selectElement.value;



        // If all the inputs are valid, making an request through API
        if (
            name !== "" &&
            price !== "" &&
            time !== "" &&
            imageData !== undefined &&
            focus !== ""
        ) {

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://apifoodapp.herokuapp.com/addFood', false); // API POST request
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                res = xhr.responseText;
                if (res == 'true') {
                    //Routing to foodlist.html
                  window.location.replace("foodlist.html");
                }
              }
            }

            // Sending the value to DB
            xhr.send("foodname=" + name + "&foodpic=" + imageData + "&foodprice=" + price + "&foodpreptime=" + time + "&foodavailability=" + availablity + "&foodtype=" + output);


        }
    });
}