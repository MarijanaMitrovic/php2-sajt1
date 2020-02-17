$(document).ready(function(){

    $(document).on('click', '.update-user', function(e){
        e.preventDefault();
        let id = $(this).data('id');


        $.ajax({
            url: 'models/admin_panel/get_one_user.php', 
            method: 'GET',
            data: {
                id: id
            },
            dataType: 'json', 
            success: function(user){
                console.warn('user is here');
                console.log(user);
                fillForm(user);
            }, 
            error: function(error, xhr, statusText){
                console.error('error getting user');
                
                console.log(error.parseJSON);
                console.log(xhr.status+statusText);
            }
        })
    });

    $("#btnSave").click(function(){
        let id = $('#hdnId').val();
        var currentdate = new Date(); 
var datetime = currentdate.getFullYear() + "-"
               +(currentdate.getMonth()+1)+"-"
                + currentdate.getDate() + " "
                
                
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
               var first_name = $('#tbAddName').val();
                var last_name= $('#tbAddLast').val();
                var email= $('#tbAddEmail').val();
                var pass= $('#tbAddLozinka').val();
                 
                var role=$('#tbRole').val();

        if(id !== ''){

            $.ajax({
                url: 'models/admin_panel/update_user.php',
                method: 'POST',
                data: {
                    id:id,
                    first_name : first_name,
                    last_name:last_name,
                    email: email,
                     pass: pass,
                     reg_date : datetime,
                     role:role
                },
                dataType: 'json',
                success: function(data, status, xhr){
                    console.warn('successfully updated');
                   

                    if(xhr.status == 204){
                        console.log('success');
                        console.log('Json data ' + data + status);
    
                    }

                  //  clearForm();
                    printUsers();
                }, 
            
                
               error: function(error, xhr, statusText){
                   console.log('GRESKA UPDATE:'+error); 
                    console.log(xhr.status+statusText);
                   
                 }
            })
    }    else
            
            // KORAK 5 - INSERT
           {   

            var datetime = currentdate.getFullYear() + "-"
            +(currentdate.getMonth()+1)+"-"
             + currentdate.getDate() + " "
             
             + currentdate.getHours() + ":"  
             + currentdate.getMinutes() + ":" 
             + currentdate.getSeconds();
            $.ajax({
                url: 'models/admin_panel/insert_user.php',
                method: 'POST',
                data: {
                    
                    first_name : $('#tbAddName').val(),
                    last_name:$('#tbAddLast').val(),
                    email: $('#tbAddEmail').val(),
                     pass: $('#tbAddLozinka').val(),
                     reg_date: datetime,
                     role:$('#tbRole').val()
                },
                dataType: 'json',
                success: function(data, status, xhr){
                    console.warn('succesfully inserted');

                    if(xhr.status == 201){
                        console.log('Json data ' + data + status);
                    }
                  //  clearForm();
                    printUsers();
                }, 
                error: function(error, xhr, statusText){
                    console.log('GRESKA INSERT:'+error); 
                     console.log(xhr.status+statusText);
                    
                  }
            })    }  
        });
    

    // KORAK 6 - DELETE
    $(document).on('click', '.delete-user', function(e){
        e.preventDefault();
        let id = $(this).data('id');

        $.ajax({
            url: 'models/admin_panel/delete_user.php',
            method: 'GET',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(data, status, xhr){
                console.warn('successfully deleted' + data);
                console.log(xhr.status + status);
                printUsers();
            }, 
            error: function(error, xhr, statusText){
                console.log('GRESKA DELETE:'+error); 
                 console.log(xhr.status+statusText);
                
              }
        })
    })
});


function fillForm(user){
    $("#hdnId").val(user.id);
    $('#tbAddName').val(user.first_name),
  $('#tbAddLast').val(user.last_name),
   $('#tbAddEmail').val(user.email),
      $('#tbAddLozinka').val(user.pass),
     $('#tbRole').val(user.role)
}

// function clearForm(){
//    $('#hdnId').val('');
  //  $('#tbAddName').val(''),
 // $('#tbAddLast').val(''),
 //  $('#tbAddEmail').val(''),
  //    $('#tbAddLozinka').val(''),
   //  $('#tbRole').val('')
//} 


function printUsers(){
    
    // KORAK 4 - Osvezenje prikaza kategorija

    $.ajax({
        url: 'models/users/get_users.php',
        method: 'GET',
        dataType: 'json',
        success: function(users, status, statusTxt){
            allUsers(users);
            console.log(status + statusTxt)
        }, 
        error: function(error, xhr, statusText){
            console.log('GRESKA DELETE:'+error); 
             console.log(xhr.status+statusText);
            
          }
    })
}

function allUsers(users){
    let html = "";
    for(let user of users){
        html += oneUser(user);
        
    }
    $("#users").html(html);
}

function oneUser(user){
    return `<tr>
    <td> ${user.first_name } </td>
    <td>${user.last_name}</td>
    <td>${user.email}</td>
    <td> ${user.reg_date}</td>
    <td>${user.role_id}  </td>
    <td> <a href='#' class='delete-user' data-id=' ${user.id}'>DELETE</a></td>
    <td> <a href='#' class='update-user' data-id=' ${user.id}'>UPDATE</a></td>
    
    </tr>`;
}

