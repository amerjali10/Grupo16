function traerInformacion(){
	$.ajax({    
    url : 'https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume',
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.items.length; i++){
			miTabla += '<tr>';
	        miTabla += '<td>'+ respuesta.items[i].id+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].brand+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].name+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].model+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].category_id+ '</td>'; 		
            miTabla += '<td><button onclick="editarRegistro('+respuesta.items[i].id+' )">Editar</button>';			
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
        pintarSelect();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function guardarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		brand: $("#brand").val(),
        category_id: selected,
        id: $("#id").val(),
        model: $("#model").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			
			alert("guardado! ");
			$("#brand").val("");
			$("#category").val("");
			$("#id").val("");
			$("#model").val("");
			$("#name").val("");
        	traerInformacion();	
			}
		}
	});
}

function editarRegistro (id){
	$.ajax({    
    url : 'https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
        let miTabla = '<table>';
		for (i=0; i<respuesta.items.length; i++){
			$("#brand").val(respuesta.items[i].brand);
			$("#category").val(respuesta.items[i].category_id);
			$("#id").val(respuesta.items[i].id);
			$("#model").val(respuesta.items[i].model);
			$("#name").val(respuesta.items[i].name);
            $("#id").attr("readonly", true);
			pintarSelect();
		}
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function actualizarInformacion(){
    let selected = $("#cat").children(":selected").attr("value");
	let misDatos = {
		brand: $("#brand").val(),
        category_id: selected,
        id: $("#id").val(),
        model: $("#model").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 

	$.ajax(    
    'https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#brand").val("");
			$("#category").val("");
			$("#id").val("");
			$("#model").val("");
			$("#name").val("");
			$("#id").attr("readonly", false);
        	traerInformacion();	
			}
		}
	});
}

function pintarSelect(){
	$.ajax({    
    url : 'https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/categoria',
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#cat").empty();
		miSelect="";
		for (i=0; i<respuesta.items.length; i++){
	        miSelect += '<option value='+ respuesta.items[i].id+ '>'+respuesta.items[i].nombre_categoria+'</option>'; 		
		}
	    $("#cat").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
	
}	
	
	

/*
$.post('https://gc31840f0846900-grupo16ciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/api/costume',
    datosJson,
    function(data, textStatus, jqXHR)
    {
        alert("guardado!");
		$("#brand").val("");
        $("#category").val("");
        $("#id").val("");
        $("#model").val("");
        $("#name").val("");
        		
		traerInformacion();
        alert("guardado!");
       //data: Data from server.    
    }).fail(function(jqXHR, textStatus, errorThrown) 
    {
        alert('ha sucedido un problema:'+ textStatus +" resp:" + errorThrown );
 
    });
}
*/






