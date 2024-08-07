#El Zarape

El Zarape es una empresa especializada en el desarrollo de software, con un enfoque particular en soluciones para el sector de la restauración. Nuestra misión es proporcionar herramientas tecnológicas innovadoras que mejoren la eficiencia y la experiencia del cliente en negocios de comida.

##Propuesta para el Desarrollo de Aplicación de Restaurante “El Zarape”

Planteamiento
El restaurante “El Zarape” ha decidido innovar sus procesos de atención a clientes para mejorar sus servicios, implementar tecnología y a la vez optimizar la cantidad de personal requerido. Como parte de esta innovación, se ha solicitado un sistema de información que consiste en tres módulos con su respectivo alcance.

##Objetivo General

Desarrollar un sistema automatizado para realizar un punto de venta de auto pago para una cadena de restaurantes tipo brunch (almuerzos).

##Objetivos Específicos

Desarrollo de una aplicación web para gestionar el sistema. Esta deberá operar en formato Intranet.
Desarrollar una aplicación web responsiva de punto de venta on-site. Deberá contar con seguimiento del pedido por medio de un avisador electrónico o digital.
Desarrollo de una aplicación móvil de punto de venta para entrega drive-thru.
Funcionalidad Requerida

##I. Aplicación Web para Gestionar el Sistema

Deberá ser una aplicación que opere en un formato de red privada de acceso local.
Contendrá la gestión de los siguientes catálogos:
Sucursales: Registro de ID, nombre, ubicación física, GPS del establecimiento, logotipo, URL y horarios.
Usuarios: Registro de ID, nombre de usuario y contraseña.
Alimentos: Registro de ID, nombre del platillo, descripción, foto, precio y categoría (Platillos, Ensaladas, Sándwiches, Postres, Fruta, etc.).
Bebidas: Registro de ID, nombre de la bebida, descripción, foto, precio y categoría (Refrescos, Aguas, Jugos, Cafés, etc.).
Combos: Permitir combinar varios ID de alimentos y bebidas, formando paquetes de desayuno como "Sándwich, Fruta, Café" o "Chilaquiles, Jugo y Café".

##II. Aplicación Web Responsiva de Punto de Venta On-Site y Seguimiento del Pedido

Funcionará únicamente dentro del restaurante, disponible a través de dispositivos de cómputo o tablets ubicadas en la recepción del establecimiento. Los comensales podrán consultar y elegir en el menú los platillos y bebidas, obteniendo al instante el ticket de la compra, que deberá ser pagado de manera inmediata a través de pago en línea o terminal bancaria (esta última fuera del alcance del sistema).
Al agregar un platillo, se mostrará en el ticket: una fila por cada tipo de producto, cantidad y precio. Al final de la comanda, se visualizará el subtotal, IVA y total.
Opción de pago en línea o terminal (aún no disponible).

###Preparar un simulador de pago para completar la transacción.

Al registrarse el pago, se habilitará un avisador electrónico o digital (puede ser una alerta con códigos QR, pantalla de gestión de turnos, etc.). En caso del avisador electrónico, este puede enviar alertas con sonido, luz, vibración o mensaje.
En el área de cocina, se recibirán las comandas electrónicas para ser preparadas. Al estar listas, el personal de cocina activará la alarma o publicará que la comanda está lista.
El comensal podrá intercambiar su dispositivo de alarma por la orden atendida y consumirla en su mesa.
Al concluir, el comensal deberá llevar sus trastes a una zona asignada y desechar la basura apropiadamente.
III. Aplicación Móvil de Punto de Venta para Entrega Drive-Thru


###Perfil:

Información personal: nombre, apellidos, teléfono.
Medio de pago: número de tarjeta, MM, YY, CVV, nombre del titular.
Dirección del medio del pago: calle y número, colonia, ciudad, estado, código postal.

###Ordenar:

Elige sucursal: se posicionan por la ubicación más cercana.
Muestra menú agrupado por categorías.
Muestra platillos con nombre, foto, descripción y precio.
Cada platillo con un botón de agregar.
Al agregar un platillo, se mostrará en el ticket: una fila por cada tipo de producto, cantidad y precio. Al final de la comanda, se visualizará el subtotal, IVA y total.
Preparar un simulador de pago para completar la transacción.
Generar un QR de la compra, que deberá presentarse para recoger el pedido. El personal de ventanilla leerá el QR y entregará el pedido, registrando la compra como entregada.
