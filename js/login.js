console.log('jhvv');

function loginN() {
  console.log('hello');

  const loginForm = document.querySelector("#login-form");

  function resetFields() {
    loginForm["password"].classList.remove("is-invalid");
    loginForm["emailaddress"].classList.remove("is-invalid");
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    resetFields();
    const email = loginForm["emailaddress"].value;
    const password = loginForm["password"].value;
    if (email === "" && password === "") {
      loginForm["emailaddress"].classList.add("is-invalid");
      loginForm["password"].classList.add("is-invalid");
    }
    if (email === "") {
      loginForm["emailaddress"].classList.add("is-invalid");
    }
    if (password === "") {
      loginForm["password"].classList.add("is-invalid");
    }
    if (email != "" && password != "") {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://apifoodapp.herokuapp.com/loginUser', false);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          res = xhr.responseText;
          console.log(res);
          if (res == 'success') {
            window.location.replace("profile.html");
          }
        }
      }
      xhr.send("username=" + email + "&password=" + password);
    }

  });

}