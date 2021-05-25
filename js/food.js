function foodCat(name){
    var CatName = name;  
    localStorage.setItem("category", CatName);    
    window.location.replace("foodlist.html");
    
}