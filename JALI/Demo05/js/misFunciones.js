function traerInformacion(){
	$.ajax({    
    url : 'https://gc31840f0846900-grupo11ciclo03.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/emp/emp/',
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
	        miTabla += '<td>'+ respuesta.items[i].empno+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].ename+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].deptno+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].hiredate+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].job+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].mgr+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].comm+ '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].sal+ '</td>';
            miTabla += '<td><button onclick="editarRegistro('+respuesta.items[i].empno+' )">Editar</button>';			
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInformacion(){
	let misDatos = {
		empno: $("#empno").val(),
        ename: $("#ename").val(),
        deptno: $("#deptno").val(),
        job: $("#job").val(),
        sal: $("#sal").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gc31840f0846900-grupo11ciclo03.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/emp/emp/',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("guardado!");
			$("#empno").val("");
			$("#ename").val("");
			$("#deptno").val("");
			$("#job").val("");
			$("#sal").val("");
        	traerInformacion();	
			}
		}
	});
}

function editarRegistro (codEmp){
	$.ajax({    
    url : 'https://gc31840f0846900-grupo11ciclo03.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/emp/emp/'+codEmp,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
        let miTabla = '<table>';
		for (i=0; i<respuesta.items.length; i++){
			$("#empno").val(respuesta.items[i].empno);
			$("#ename").val(respuesta.items[i].ename);
			$("#deptno").val(respuesta.items[i].deptno);
			$("#job").val(respuesta.items[i].job);
			$("#sal").val(respuesta.items[i].sal);
		}
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}
	
function actualizarInformacion(){
	let misDatos = {
		empno: $("#empno").val(),
        ename: $("#ename").val(),
        deptno: $("#deptno").val(),
        job: $("#job").val(),
        sal: $("#sal").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gc31840f0846900-grupo11ciclo03.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/emp/emp/',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Actualizado!");
			$("#empno").val("");
			$("#ename").val("");
			$("#deptno").val("");
			$("#job").val("");
			$("#sal").val("");
        	traerInformacion();	
			}
		}
	});
}
	
	
	
	
	
