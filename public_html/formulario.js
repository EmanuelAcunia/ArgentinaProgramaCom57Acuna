
function mostrardestino() {
     var dest = document.getElementById("destino");
     var pre = document.getElementById("precio");

    pre.value = dest.value;
}
function mostrarpasajeros() {
     var cant = document.getElementById("cantidad");
      var pas = document.getElementById("pasajeros");

    pas.value = cant.value;
}
function mostrarservicio() {
    var cat = document.getElementById("categoria");
    var ser = document.getElementById("servicio");

    ser.value = cat.value;
}
function mostrarpresupuesto() {
    var dest = 1;
    var cat = 1;
    var cant = 1;
    let resultado = 0;  
    dest = document.getElementById("destino");  
    cat = document.getElementById("categoria");        
    cant = document.getElementById("cantidad");
    var serv = document.getElementById("presupuesto");
   
    resultado=(Number(dest.value) + Number(cat.value)) * cant.value;
    serv.value = resultado;
}
document.addEventListener('DOMContentLoaded', function () {
    // Configurar reglas de validación y mensajes de error usando jQuery validation
    $('#formularioProceso').validate({
        rules: {
            nombre: 'required',
            apellido: 'required',
            dni: 'required',
            destino: 'required',
            cantidad: 'required',
            categoria: 'required',
            telefono: 'required',
            correo: 'required'
        },
        messages: {
            nombre: 'Por favor ingrese su nombre',
            apellido: 'Por favor ingrese su apellido',
            dni: 'Por favor ingrese su documento',
            destino: 'Por favor ingrese su destino',
            cantidad: 'Por favor ingrese la cantidad',
            categoria: 'Por favor ingrese su servicio',
            telefono: 'Por favor ingrese su telefono',
            correo: 'Por favor ingrese su correo'
        },
        submitHandler: function (form) {
            // Obtener los valores de los campos del formulario
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var dni = document.getElementById('dni').value;

            var destino = document.getElementById('destino').value;

            var categoria = document.getElementById('categoria').value;

            var cantidad = document.getElementById('cantidad').value;
            var correo = document.getElementById('correo').value;
            var telefono = document.getElementById('telefono').value;


            // Realizar cálculos para la cotización
            //  var subtotal = destinoOption * categoriaOption * cantidadOption;
            var subtotal = (Number(destino) + Number(categoria) )* cantidad;
            var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
            var total = subtotal + impuesto;


            var destinoconf;
            switch (destino) {
                case '25000':
                    destinoconf = "Cordoba - 6 Dias - 7 Noches   ";
                    break;
                case '27000':
                    destinoconf = "Corrientes - 3 Dias - 4 Noches";
                    break;
                case '22000':
                    destinoconf = "Jujuy - 6 Dias - 7 Noches     ";
                    break;
                case '30000':
                    destinoconf = "Misiones - 6 Dias - 7 Noches  ";
                    break;
                case '24000':
                    destinoconf = "Salta - 6 Dias - 7 Noches     ";
                    break;
                case '15000':
                    destinoconf = "Tucuman - 3 Dias - 4 Noches   ";
                    break;

            }
            var tiposer;
            switch (categoria) {
                case '5000':
                    tiposer = "Media Pension";
                    break;
                case '10000':
                    tiposer = "Pension Completa";
                    break;
                case '20000':
                    tiposer = "Full Service";
                    break;

            }
            // Generar el resumen de la cotización
            var cotizacion = '\t\t\t\t\tPresupuesto De Reserva\n\n\n' +
                    '\t\t\t\t\tDatos del Cliente\n\n' +
                    'Nombre: ' + nombre + '\n' +
                    'Apellido: ' + apellido + '\n' +
                    'Tipo De Documento: ' + ' D.N.I. ' + '\t\t\t' +
                    'N° De Documento: ' + dni + '\n\n\n' +
                    '\t\t\t\t\tDatos del Pack de Viaje\n\n' +
                    'Destino: ' + destinoconf + '\t\t' +
                    'Precio: $' + destino + '\n' +
                    
                    'Tipo De Servicio: ' + tiposer + '\t\t\t' +
                    'Precio: $' + categoria + '\n' +
                    
                    'Cantidad de Pasajeros: \t\t\t\t\t\t' + cantidad + '\n' +
                   
                    'Subtotal: $' + subtotal + '\n' +
                    'Impuesto (21%): $' + impuesto + '\n' +
                    'Total: $' + total + '\n\n\n\n\n' +
                    '\t\t\t\t\tDatos de Contacto\n\n' +
                    'Telefono: ' + telefono + '\n' +
                    'Email: ' + correo + '\n'
                    ;


            // Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario
            // ...
            // Crear un nuevo objeto jsPDF
            var pdf = new jsPDF();

            // Agregar el resumen al documento PDF
            pdf.text(cotizacion, 10, 10);

            // Generar el archivo PDF como Blob
            var pdfBlob = pdf.output('blob');

            // Crear un enlace de descarga
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

            // Liberar el objeto Blob
            URL.revokeObjectURL(pdfBlob);

        }
    });

    // Configurar reglas de validación y mensajes de error usando jQuery validation para el formulario de contacto
    $('#formularioContacto').validate({
        rules: {
            nombre: 'required',

            telefono: 'required',
            email: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombre: 'Por favor ingrese su nombre ',
            telefono: 'Por favor ingrese su telefono ',
            email: {
                required: 'Por favor ingrese su dirección de correo electrónico',
                email: 'Por favor ingrese una dirección de correo electrónico válida'
            },
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function (form) {
            // Obtener los valores de los campos del formulario
            var nombre = $('#nombre').val();
            var email = $('#email').val();
            var mensaje = $('#mensaje').val();

            // Hacer la petición AJAX para enviar los datos al servidor
            $.ajax({
                url: 'https://reqres.in/api/users?page=2', // URL de regres.in para la petición de contacto
                method: 'POST', // Método HTTP POST
                data: {
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje
                },
                success: function (response) {
                    // Aquí puedes manejar la respuesta del servidor si es necesario
                    console.log('Éxito:', response);
                    // Puedes mostrar un mensaje de éxito al usuario
                    alert('¡Mensaje enviado con éxito!');
                },
                error: function (xhr, status, error) {
                    // Aquí puedes manejar los errores de la petición AJAX si es necesario
                    console.error('Error:', error);
                    // Puedes mostrar un mensaje de error al usuario
                    alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
                }
            });
        }
    });
});




