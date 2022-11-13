/*
 * Este simple ejemplo envía mensajes por el puerto serie, va a alternando entre un mensaje aleatorio en JSON y un mensaje simple.
 *
 */
#include <ArduinoJson.h>

uint32_t previousMillis;
bool alternarMensaje;

void setup() {
  Serial.begin(115200);
}

void loop() {
  if(millis()-previousMillis > 500) {                   //Se ejecuta cada medio segundo, basado en el ejemplo Digital\BlynkWithoutDelay
    previousMillis = millis();

    alternarMensaje =! alternarMensaje;

    if(alternarMensaje) {
      Serial.println("Hola desde Arduino!");
    }

    else {
      String datosEnJson;                               //Creamos un JSON utilizando la librería y lo enviamos por el puerte serie.
      StaticJsonDocument<200> doc;

      doc["random"] = random(1,100);
      doc["millis"] = millis()/1000;
      serializeJson(doc,datosEnJson);

      Serial.println(datosEnJson);
    }
  }
}
