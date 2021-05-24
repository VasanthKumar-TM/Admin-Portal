var firebaseConfig = {
  apiKey: "AIzaSyBHPx5ij0m6J8LdAZlpzCAjoF2mJDDC2hk",
  authDomain: "stretch-pattarai.firebaseapp.com",
  projectId: "stretch-pattarai",
  storageBucket: "stretch-pattarai.appspot.com",
  messagingSenderId: "1046668280702",
  appId: "1:1046668280702:web:a17d1559f809831d8e692f",
  measurementId: "G-LS9VD8ZZQC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//get elements
const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    // console.log(localStorage.uid);
    // console.log(localStorage.idToken);
    $.ajax({
      type: "POST",
      url: "https://api.stretch.pattarai.in/check-complete-profile.php",
      datatype: "html",
      data: {
        uid: localStorage.uid,
        token: localStorage.idToken,
      },
      success: function (res) {
        console.log(res);
        var response = JSON.parse(res);
        if (response == "no") {
          window.location.replace("getDetails.html");
        } else if (response == "invalid-auth" || response == "failed") {
          // window.location.replace("index.html");
          logoutpage();
        } else if (response == "yes") {
          $.ajax({
            type: "POST",
            url: "http://api.stretch.pattarai.in/profile-info.php",
            datatype: "html",
            data: {
              uid: localStorage.uid,
              token: localStorage.idToken,
            },
            success: function (res) {
              var data = JSON.parse(res);
              if (data == "invalid_auth" || data == "failed") {
                // window.location.replace("index.html");
                logoutpage();
              } else {
                document.getElementById("username").innerHTML = data.username;
                document.getElementById("username-sub").innerHTML =
                  data.username;
                document.getElementById("username-sub1").innerHTML =
                  data.username;
                document.getElementById("phone").innerHTML = data.phone;
                document.getElementById("postcode").innerHTML = data.postcode;
                document.getElementById("gender").innerHTML = data.gender;
                document.getElementById("email").innerHTML = data.email;
              }
            },
            error: function (error) {
              console.log(error);
              // window.location.replace("index.html");
              logoutpage();
            },
          });
        }
      },
      error: function (error) {
        console.log(error);
        // window.location.replace("index.html");
        logoutpage();
      },
    });
  } else {
    // window.location.replace("index.html");
    logoutpage();
  }
});

function logoutpage() {
  //get elements
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      window.location.replace("index.html");
    })
    .catch((error) => {
      // An error happened.
    });
}
