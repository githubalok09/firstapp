function fnGetLoginAvailbility(){
    var Loginid = $("#name").val();
    if(Loginid != ''){   
     $.ajax({
        url: '/api/users/loginidavailbility/' + Loginid,
        dataType: "json",      
        type:"GET",
        cache: false,
        timeout: 5000,        
        contentType: "application/json; charset=utf-8",
        success: function(data) {    
            $("#spname").text('');
            if(data.status == 'notfound') {   
             $("#spname").text(data.info);
             $("#spname").removeClass('alert-warning');
             $("#spname").addClass('alert-success');             
            }
            else{    
                $("#spname").text(data.info);                
                $("#spname").removeClass('alert-success');
                $("#spname").addClass('alert-warning');               
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#spname").text('');
            alert('error ' + textStatus + " " + errorThrown);
        }
     });
 }
}