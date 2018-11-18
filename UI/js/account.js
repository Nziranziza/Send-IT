function createAccount(){
    var fname=document.getElementById("fname").value.trim();
    var lname=document.getElementById("lname").value.trim();
    var email=document.getElementById("email").value.trim();
    var cemail=document.getElementById("cemail").value.trim();
    var password=document.getElementById("password").value.trim();

    if(email===cemail){
    var account={
        fname:fname,
        lname:lname,
        email:email,
        password:password,
        id:Math.random()*10**16
    }

    if(localStorage.getItem('accounts')==null){
        var accounts=new Array();
        accounts.push(account)
        localStorage.setItem('accounts',JSON.stringify(accounts));
    }else{
        var accounts=JSON.parse(localStorage.getItem('accounts'));
        accounts.push(account);
        localStorage.setItem('accounts',JSON.stringify(accounts));
}
    }else{
        alert("Email must match confirm email");
    }
e.preventDefault();
}

function login(){
    var email=document.getElementById("email").value.trim();
    var password=document.getElementById("password").value.trim();

    if(localStorage.getItem('accounts')==null){
        alert("Please create account first");
        return false;
    }else{
        var accounts=JSON.parse(localStorage.getItem('accounts'));
        for (let i=0;i<accounts.length;i++){
            var remail=accounts[i].email;
            var rpassword=accounts[i].password;
            if(email===remail){
                if(password===rpassword){
                    return true
                }else{
                    var errarea=document.getElementById("err-msg");
                    errarea.innerHTML="The password is incorrect";
                    return false
                }
            }
        }
        var errarea=document.getElementById("err-msg");
        errarea.innerHTML="The email is incorrect";
    }
}