/*
 *		Lambton College
 *		CSD 2103 - Front End Web Development II
 *		Term project
 *		Hugo Beltran Escarraga - C0845680
 *		Juan Luis Casanova Romero - C0851175
 */
 
$(document).ready(function() {
    checkCookie();
    document.getElementById("submit-btn").addEventListener("click", checkInfo);

    $("#about-us").click(function(){
        $("#info").toggle(1500);
      });
});

function checkName() {
    var name = document.getElementById("user-name").value;
    var pattern = /^[a-zA-Z]{2,20}( [a-zA-Z]{2,20})?( [a-zA-Z]{2,20})?( [a-zA-Z]{2,20})?$/;
    if (pattern.test(name))
    {
        document.getElementById("user-name-error").innerHTML = "";
        return true;
    }
    else
    {
        document.getElementById("user-name-error").innerHTML = "Not valid name";
        return false;
    }
}

function checkEmail() {
    var email = document.getElementById("email").value;
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (pattern.test(email))
    {
        document.getElementById("email-error").innerHTML = "";
        return true;
    }
    else
    {
        document.getElementById("email-error").innerHTML = "Not valid email";
        return false;
    }
}

function checkPhone() {
    var phone = document.getElementById("phone").value;
    var pattern = /^[(]?[0-9]{3}[)]?[- .]?[0-9]{3}[- .]?[0-9]{4}$/;
    if (pattern.test(phone))
    {
        document.getElementById("phone-error").innerHTML = "";
        return true;
    }
    else
    {
        document.getElementById("phone-error").innerHTML = "Not valid phone";
        return false;
    }
}

function checkInfo() {
    var nameOk = checkName();
    var emailOk = checkEmail();
    var phoneOk = checkPhone();
    if (nameOk && emailOk && phoneOk) {
        setCookie("username", document.getElementById("user-name").value, 365);
        setCookie("useremail", document.getElementById("email").value, 365);
        setCookie("userphone", document.getElementById("phone").value, 365);
        setCookie("rules-questions", document.getElementById("rules-questions").value, 365);
        setCookie("signs-questions", document.getElementById("signs-questions").value, 365);
        if (document.getElementById("random").checked){
            setCookie("random", "1", 365);
        }
        else{
            setCookie("random", "0", 365);
        }
        if (document.getElementById("sendEmail").checked){
            setCookie("send-email", "1", 365);
        }
        else{
            setCookie("send-email", "0", 365);
        }
        document.getElementById("test-form").submit();
    }
}

function setCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function checkCookie()
{
    var name = getCookie("username");
    if (name != null && name != "")
    {
        alert("Welcome again " + name + "!");
        document.getElementById("user-name").value = name;
    }
    var email = getCookie("useremail");
    if (email != null && email != "")
    {
        document.getElementById("email").value = email;
    }
    var phone = getCookie("userphone");
    if (phone != null && phone != "")
    {
        document.getElementById("phone").value = phone;
    }
}
