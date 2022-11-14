
# Monitor serie web

<a href="https://playful-paletas-599515.netlify.app/" target="_blank">Ver Online</a>


Este proyecto simula al "monitor serie" que utilizamos el IDE de arduino para comunicarnos por el puerto serie.

Al igual que en el IDE, seleccionamos la velocidad (9600,115200, etc), abrimos el puerto, y vemos los mensajes.

Lo novedoso o interesante de este proyecto es que si enviamos los datos en formato JSON, estos se mostrarán en pequeños cuadraditos, donde el nombre es el nombre del dato y el valor el valor correspondiente.
De esta forma tenemos una forma visualmente agradable y rápida de ver los datos mientras debugueamos.

### ¿Cómo utlizarla?
Simplemente conecta tu proyecto Arduino y abrí el puerto tal cuál como haces siempre en el IDE de Arduino.
De todas formas, hay programas de ejemplos que podes cargar.


### Sobre la web:
Esta desarrollado puramente con HTML, CSS y Javascript; no utiliza node para la comunicación con el puerto serie.


### To-Do:
- [ ] Agregar para enviar datos desde la web al arduino
- [ ] Resolver WebSockets via HTTPS para integrar con ESP8266
- [ ] Agregar repositorio en github
- [ ] Agregar botón para descargar los datos en CSV.
- [ ] Poder Activar/Desactivar el autoscroll, igual que en el IDE.
- [ ] Poder activar/desactivar la hora del mensaje.
- [ ] Guardar Configuración del usuario.