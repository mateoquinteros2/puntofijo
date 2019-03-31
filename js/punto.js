
var mostrar = document.getElementById("resultados");
var root = document.getElementById("totalraiz");

//ESCRIBIR POR MEDIO DE LOS BOTONES

document.getElementById("coseno").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.cos(x)';
insertAtCursor(text, 'cos(x)')
});
document.getElementById("seno").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.sin(x)';
insertAtCursor(text, 'sin(x)')
});
document.getElementById("tangente").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.tan(x)';
insertAtCursor(text, 'tan(x)')
});
document.getElementById("potencia").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.pow(x,1)';
insertAtCursor(text, '^')
});
document.getElementById("euler").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.E';
insertAtCursor(text, 'e')
});
document.getElementById("logaritmo").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.log(x)';
insertAtCursor(text, 'log(x)')
});

//FUNCION PARA INSERTAR TEXTO EN POSICICION DE CURSOR
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

//DERIVADA



//FUNCION PARA VALIDAR CAMPO VACIOS
function validar(){
	var funcion=document.getElementById('funcion').value;
	var fun=document.getElementById('fun').value;
	var a=document.getElementById('aa').value;
	var enlace=document.getElementById('enlace');

	if(funcion==''){alert('Ingrese su g(x)');}
	if(fun==''){alert('Ingrese su f(x)');}
	if(a==''){alert('Ingrese el valor de la primera aproximacion');}

	var derivada = math.derivative(funcion, 'x').eval({x: a})
	derivada = Math.abs(derivada);
    console.log(derivada);
  	

	if(funcion!='' && a!='' && fun!=''){
		if(derivada>1){
			alert('No existe raiz en el intervalo ingresado');
		}else{
			enlace.href="#tabla"
			mostrarTabla();
		}
	}

}
var fa;

//FUNCION DEL ALGORITOMO E IMPRIMIR EN PANTALLA
function mostrarTabla(){

	var a=document.getElementById('aa').value;
	var diferencia =1;
	var aa=parseFloat(a);
	var cont=0;
	var anterior;
	//var fa;
	var t = 0.000000005;  
	var filaDocumento = "";
	var raizzz = "";

	

    do{

    	if(cont==0){

    		filaDocumento += "<tr>" +

                          "<td >"+ cont +"</td>"+

                          "<td>"+ aa +"</td>"+

                       "</tr>";

            anterior=a;
            cont=cont+1;

    	}else{

    	   fa=F(aa);
    	   fa=fa.toFixed(9);

	       filaDocumento += "<tr>" +

	                          "<td >"+ cont +"</td>"+

	                          "<td>"+ fa +"</td>"+

	                        "</tr>";
			
		    
		
		
			diferencia=anterior-fa;
			diferencia = Math.abs(diferencia);

			
			aa=fa;
	    	anterior=fa;
	    	cont=cont+1;

			raizzz="LA RAÍZ ES: "+fa;


    	}
    	

  }while(t<diferencia && cont<=500);
	mostrar.innerHTML = filaDocumento;
	root.innerHTML = raizzz;
  
  draw()



}

//FUNCOIN PARA EVALUAR LA FUNCION DEL ALGORITMO
function F(x){
	var funcion=document.getElementById('funcion').value; 



	//REEMPLAZAR EQUIS
	var equis = [];
	for(var i = 0; i < funcion.length; i++) {
		if (funcion[i].toLowerCase() === "x") equis.push(i);
	}

	var totalX = equis.length;

	for(var i=0; i<totalX; i++){
		funcion = funcion.replace('x', x)
	}
	
	try {
	    math.eval(funcion); 
	} catch (e) {
	    if (e instanceof SyntaxError) {
	        alert(e.message);
	    }
	}

	console.log(funcion);
	
    return math.eval(funcion);
    //6*Math.pow(x,3)-2*Math.pow(x,2)-x-1

}

  function draw() {
    try {
      // compile the expression once
      const expression = document.getElementById('funcion').value
      const expr = math.compile(expression)

      // evaluate the expression repeatedly for different values of x
      const xValues = math.range(fa-2,fa*2,0.01).toArray()
      const yValues = xValues.map(function (x) {
        return expr.eval({x: x})
      })

      // compile the expression once
      const expressions = document.getElementById('fun').value
      const exprs = math.compile(expressions)

      console.log(expressions);

      // evaluate the expression repeatedly for different values of x
      const xValuess = math.range(fa-2,fa*2,0.01).toArray()
      const yValuess = xValuess.map(function (x) {
        return exprs.eval({x: x})
      })

      // compile the expression once
      const expressionss = "x"
      const exprss = math.compile(expressionss)

      console.log(expressionss);

      // evaluate the expression repeatedly for different values of x
      const xValuesss = math.range(fa-2,fa*2,0.01).toArray()
      const yValuesss = xValuesss.map(function (x) {
        return exprss.eval({x: x})
      })

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        name: 'g(x)',
        type: 'scatter'
      }
      const trace2 = {
        x: xValuess,
        y: yValuess,
        name: 'f(x)',
        type: 'scatter'
      }
      const trace3 = {
        x: xValuesss,
        y: yValuesss,
        name: 'y=x',
        type: 'scatter'
      }
      const trace4 = {
        x: [fa, fa, fa], 
  		y: [fa-2, fa*2, 0.01],
  		shape: "spline",
        name: 'raiz',
        type: 'scatter'
      }
      const data = [trace1,trace2,trace3,trace4]
      Plotly.newPlot('plot', data)
    }
    catch (err) {
      console.error(err)
      alert(err)
    }


  }




