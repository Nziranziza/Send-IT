//format date
function formatDate(){
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
     if(dd<10) 
     {
    dd='0'+dd;
     } 

     if(mm<10) 
     {
    mm='0'+mm;
    }    
    today = dd+'/'+mm+'/'+yyyy;
    return today;
}
//Receives input from parcel form
//Save them to LocalStorage
function saveParcel(e){
    //collect inputs from form
    var from=document.getElementById("from").value;
    var destination=document.getElementById("destination").value;
    var weight=document.getElementById("weight").value;
    
    //Combine them into a structure
    var  parcel={
        from:from,
        destination:destination,
        weight:weight,
        delivered:false,
        price:calculatePrice(weight),
        id:Math.random()*10**17,
        createdAt:formatDate(),
        ordered:false,
        present_loc:from

    }
    //Create parcels object and Save the parcel
    if(localStorage.getItem('parcels')==null){
        var parcels=new Array();
        parcels.push(parcel)
        localStorage.setItem('parcels',JSON.stringify(parcels));
    }else{
        //Save the parcel
        var parcels=JSON.parse(localStorage.getItem('parcels'));
        parcels.push(parcel);
        localStorage.setItem('parcels',JSON.stringify(parcels));
}
fetchParcel();
e.preventDefault();
}

//calculate the price of the parcel delivery order

function calculatePrice(weight){
    price=weight*650
    return price;
}

//Fetch parcel order and display them to the page
function fetchParcel(){
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
    var displayParcel=document.getElementById("display");
    displayParcel.innerHTML="<div class='box margin-left'>"+
                  "<p>Your recent parcel delivery order is empty."+
                  "Please create the first 3 for free</p>"+
                  "</div>"

    }else{
    //get the area to output the parcel delivery order
    var displayParcel=document.getElementById("display");
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    displayParcel.innerHTML="";//make sure the area is empty

    //loop through all parcel delivery order and output them
    var length=parcels.length;
    for(let i=length-1;i>=0;i--){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var status=delivered ? "Delivered":"In transit";
        var date=parcels[i].createdAt;
        var ordered=parcels[i].ordered ? "Cancel":"Order";
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var btnclass=parcels[i].ordered ? "label del":"label success";
        displayParcel.innerHTML+="<div class='box margin-left'>"+
                           "<div class='popup right' onMouseOver='popup("+id+")' onMouseOut='popup("+id+")' onclick='deleteParcel("+id+")'>x<span class='popuptext' id='"+id+"p'>Remove</span></div>"+
                           "<h3>Parcel order from "+from+" to "+destination+"</h3>"+
                           "<label><b>Status:</b> "+status+"</label></br />"+
                           "<label><b>Weight:</b> "+weight+" kg</label><br />"+
                           "<label><b>Price:</b> "+price+" Rwf</label><br />"+
                           "<label><b>Present location:</b> "+present_loc+"</label><br />"+
                           "<label>"+date+"</label><br />"+
                           "<button onClick='orderParcel("+id+")' class='"+btnclass+"'>"+ordered+"</button>"+
                           "<button onClick='edit("+id+")' class='label primary'>Change location</button>"+
                           "<div id='"+id+"'></div>"
                       "</div>"
    }
}
}
//Make an order
function orderParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].ordered=!parcels[i].ordered;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//Change destination
function changeDestination(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var destination=document.getElementById(id+"i").value;
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].destination=destination;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//bring destination text field
function edit(id){
  var dist=document.getElementById(id)
  dist.innerHTML="<input type='text' placeholder='Type in new destination' id='"+id+"i'><br />"+
                 "<button class='label primary' onClick='changeDestination("+id+")'>Update</button>"
}
//delete parcel delivery order
function deleteParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for(i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
            parcels.splice(i,1);
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//View All Parcel Delivery
function viewAllPDOs(){
    var link1=document.getElementById('link1');
    var link2=document.getElementById('link2');
    var link3=document.getElementById('link3');
    var link4=document.getElementById('link4');
    var link5=document.getElementById('link5');
    link1.setAttribute('class','button primary');
    link4.setAttribute('class','button current');
    link3.setAttribute('class','button primary');
    link2.setAttribute('class','button primary');
    link5.setAttribute('class','button primary');
    var user_content=document.getElementById('user-content');
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
        user_content.innerHTML="<h1 class='box'>No Parcel delivery order is available</h1>"
    }else{
     user_content.innerHTML="<h1 class='box'>All Parcel Delivery Order ("+parcels.length+")</h1>"+
                             "<table class='full-width'>"+
                             "<tbody id='user-table'>"+
                            
                             "</tbody>"+
                             "</table>";
     var user_table=document.getElementById('user-table');
     user_table.innerHTML= "<tr class='tadm'>"+
                           "<th>From</th>"+
                           "<th>Destination</th>"+
                           "<th>Price</th>"+
                           "<th>Weight</th>"+
                           "<th>Status</th>"+
                           "<th>Present location</th>"+
                           "<th>Order ID</th>"+
                           "<th>Created at</th>"
                           "</tr>";
    var length=parcels.length
    for(i=length-1;i>=0;i--){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var status=delivered ? "Delivered":"In transit";
        user_table.innerHTML+="<tr class='tadm'>"+
        "<td><img src='../img/arrow.png' style='width:15px' onClick='userDetailParcel("+id+")' id='"+id+"img'></img> "+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+" Rwf</td>"+
        "<td>"+weight+" Kg</td>"+
        "<td>"+status+"</td>"+
        "<td>"+present_loc+"</td>"+
        "<td>"+id+"</td>"+
        "<td>"+date+"</td>"+
     "</tr>"+"<div id='"+id+"'></div>"
    }
} 
}
//All Delivered Parcel Orders
function viewDeliveredPOs(){
    var link1=document.getElementById('link1');
    var link2=document.getElementById('link2');
    var link3=document.getElementById('link3');
    var link4=document.getElementById('link4');
    var link5=document.getElementById('link5');
    link1.setAttribute('class','button primary');
    link2.setAttribute('class','button current');
    link3.setAttribute('class','button primary');
    link4.setAttribute('class','button primary');
    link5.setAttribute('class','button primary');

    var user_content=document.getElementById('user-content');
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
        user_content.innerHTML="<h1 class='box'>No Parcel delivery order is available</h1>"
    }else{
        var no_delivered=0;
        for(let i=0;i<parcels.length;i++){
            if(parcels[i].delivered){
                no_delivered++;
            }
        }if(!no_delivered){
          user_content.innerHTML="<h1 class='box'>No Parcel delivery order is available</h1>"
        }else{
     user_content.innerHTML="<h1 class='box'>Delivered Parcel Orders ("+no_delivered+")</h1>"+
                             "<table class='full-width'>"+
                             "<tbody id='user-table'>"+
                            
                             "</tbody>"+
                             "</table>";
     var user_table=document.getElementById('user-table');
     user_table.innerHTML= "<tr class='tadm'>"+
                           "<th>From</th>"+
                           "<th>Destination</th>"+
                           "<th>Price</th>"+
                           "<th>Weight</th>"+
                           "<th>Status</th>"+
                           "<th>Present location</th>"+
                           "<th>Order ID</th>"+
                           "<th>Created at</th>"
                           "</tr>";
    var length=parcels.length
    for(i=length-1;i>=0;i--){
        if(parcels[i].delivered){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var status=delivered ? "Delivered":"In transit";
        user_table.innerHTML+="<tr class='tadm'>"+
        "<td><img src='../img/arrow.png' style='width:15px' onClick='userDetailParcel("+id+")' id='"+id+"img'></img> "+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+" Rwf</td>"+
        "<td>"+weight+" Kg</td>"+
        "<td>"+status+"</td>"+
        "<td>"+present_loc+"</td>"+
        "<td>"+id+"</td>"+
        "<td>"+date+"</td>"+
     "</tr>"+"<div id='"+id+"'></div>"
    }
}
}
} 
}
//In transit Delivered Order
function viewInTransitPDOs(){
    var link1=document.getElementById('link1');
    var link2=document.getElementById('link2');
    var link3=document.getElementById('link3');
    var link4=document.getElementById('link4');
    var link5=document.getElementById('link5');
    link1.setAttribute('class','button primary');
    link3.setAttribute('class','button current');
    link2.setAttribute('class','button primary');
    link4.setAttribute('class','button primary');
    link5.setAttribute('class','button primary');
    var user_content=document.getElementById('user-content');
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
        user_content.innerHTML="<h1 class='box'>No Parcel delivery order is available</h1>"
    }else{
        var non_delivered=0;
        for(let i=0;i<parcels.length;i++){
            if(!parcels[i].delivered){
                non_delivered++;
            }
        }if(!non_delivered){
            user_content.innerHTML="<h1 class='box'>No Parcel delivery order is available</h1>"
        }else{
     user_content.innerHTML="<h1 class='box'>In Transit Parcel Delivery Orders ("+non_delivered+")</h1>"+
                             "<table class='full-width'>"+
                             "<tbody id='user-table'>"+
                            
                             "</tbody>"+
                             "</table>";
     var user_table=document.getElementById('user-table');
     user_table.innerHTML= "<tr class='tadm'>"+
                           "<th>From</th>"+
                           "<th>Destination</th>"+
                           "<th>Price</th>"+
                           "<th>Weight</th>"+
                           "<th>Status</th>"+
                           "<th>Present location</th>"+
                           "<th>Order ID</th>"+
                           "<th>Created at</th>"
                           "</tr>";
    var length=parcels.length
    for(i=length-1;i>=0;i--){
        if(!parcels[i].delivered){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var status=delivered ? "Delivered":"In transit";
        user_table.innerHTML+="<tr class='tadm'>"+
        "<td><img src='../img/arrow.png' style='width:15px' onClick='userDetailParcel("+id+")' id='"+id+"img'></img> "+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+" Rwf</td>"+
        "<td>"+weight+" Kg</td>"+
        "<td>"+status+"</td>"+
        "<td>"+present_loc+"</td>"+
        "<td>"+id+"</td>"+
        "<td>"+date+"</td>"+
     "</tr>"+"<div id='"+id+"'></div>"}
    }
}
} 
}
/*Admin codes
_______________________________________________________________________________________________________________________________________*/
//fetch parcels for the admin
function adminParcel(){
    var adm=document.getElementById('admin');
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
        adm.innerHTML="<h1>No Parcel delivery order is available</h1>"
    }else{
     adm.innerHTML="<tr class='tadm'>"+
                    "<th>From</th>"+
                    "<th>Destination</th>"+
                    "<th>Price</th>"+
                    "<th>Weight</th>"+
                    "<th>Status</th>"+
                    "<th>Present location</th>"+
                    "<th>Order ID</th>"+
                    "</tr>";
    for(i=0;i<parcels.length;i++){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var status=delivered ? "Delivered":"In transit";
        var btncls=delivered? "label success":"label primary";
        var btn_caption=delivered ? "Success":"Deliver";
        adm.innerHTML+="<tr class='tadm'>"+
        "<td><img src='../img/arrow.png' style='width:15px' onClick='detailParcel("+id+")' id='"+id+"img'></img> "+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+" Rwf</td>"+
        "<td>"+weight+" Kg</td>"+
        "<td>"+status+"</td>"+
        "<td>"+present_loc+"</td>"+
        "<td>"+id+"</td>"+
        "<td><button class='"+btncls+"' onClick='deliverParcel("+id+")'>"+btn_caption+"</button>"+
     "</tr>"+"<div id='"+id+"'></div>"
    }
} 
}
//Deliver the parcel order for Admin 
function deliverParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].delivered=true;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    adminParcel();
}
//Drop down details
function detailParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var view=document.getElementById(id);
    for(i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
            var status=parcels[i].delivered ? "Delivered":"In transit";
            if(view.innerHTML)
              view.innerHTML=""
            else
              view.innerHTML="<div class='box'>"+
                             "<h3>Summary details</h3>"+
                             "<b>Id:</b> "+parcels[i].id+"<br />"+
                             "<b>From:</b> "+parcels[i].from+"<br />"+
                             "<b>Destination:</b> "+parcels[i].destination+"<br />"+
                             "<b>Price:</b> "+parcels[i].price+"<br />"+
                             "<b>Status:</b> "+status+"<br />"+
                             "<b>Present location:</b><br />"+
                             "<input type='text' value='"+parcels[i].present_loc+"'placeholder='New present location' id='"+id+"pr'>"+
                             "<button class='button primary' onClick='changePresentloc("+id+")'>Update</button>"
                             "</div>";
        }
    }
    var arrow_url=view.innerHTML ? "../img/arrowdown.png":"../img/arrow.png";
    document.getElementById(id+"img").setAttribute('src',arrow_url);
}
//Change Present location
function changePresentloc(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var newlocation=document.getElementById(id+'pr').value;
    if(newlocation){
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].present_loc=newlocation;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    adminParcel();
 }else
 alert("Type in new location");
}
//Initialize the app with some data
function populate(){
    localStorage.clear();
    
    for(let i=0;i<10;i++){
        var status= i>5? true:false;
    var  parcel={
        from:"Muhanga",
        destination:"Kigali",
        weight:"20Kg",
        delivered:status,
        price:calculatePrice(20),
        id:Math.random()*10**17,
        createdAt:formatDate(),
        ordered:false,
        present_loc:"Muhanga"

    }
    //Create parcels object and Save the parcel
    if(localStorage.getItem('parcels')==null){
        var parcels=new Array();
        parcels.push(parcel)
        localStorage.setItem('parcels',JSON.stringify(parcels));
    }else{
        //Save the parcel
        var parcels=JSON.parse(localStorage.getItem('parcels'));
        parcels.push(parcel);
        localStorage.setItem('parcels',JSON.stringify(parcels));
}}
}
//User detail and change the destination
function userDetailParcel(id){

    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var view=document.getElementById(id);
    for(i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
            var status=parcels[i].delivered ? "Delivered":"In transit";
            if(view.innerHTML)
              view.innerHTML="";
            else
              view.innerHTML="<div class='box'>"+
                             "<h3>Parcel delivery Order details</h3>"+
                             "<b>Id:</b> "+parcels[i].id+"<br />"+
                             "<b>From:</b> "+parcels[i].from+"<br />"+
                             "<b>Price:</b> "+parcels[i].price+"<br />"+
                             "<b>Status:</b> "+status+"<br />"+
                             "<b>Destination:</b><br />"+
                             "<input type='text' value='"+parcels[i].destination+"'placeholder='New location' id='"+id+"pr'>"+
                             "<button class='button primary' onClick='changePresentloc("+id+")'>Update</button>"
                             "</div>";
}
    }
}