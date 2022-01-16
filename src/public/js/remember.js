$(function() { 
     if(localStorage.chkbx && localStorage.chkbx != '') { 
        $('#remember').attr('checked','checked'); 
        $('#email').val(localStorage.usrname); 
        $('#password').val(localStorage.pass) ;
        console.log($('#email'));
    } else {    
        $('#remember').removeAttr('checked'); 
        $('#email').val(''); 
        $('#password').val(''); 
    }
        $('#remember').click(function() { 

        if($('#remember').is(':checked')){ // salva nome de usuário e senha 
            localStorage.usrname = $('#email').val(); 
            localStorage.pass = $('#password').val(); 
            localStorage.chkbx = $('#remember').val(); 
        }else { 
            localStorage.usrname = '' ; 
            localStorage.passe = '' ; 
            localStorage.chkbx = '' ; 
        } 
    }); 
});  