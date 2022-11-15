/*
 * En este ejemplo para ESP8266 (NodeMCU, wemos, etc), nos conectamos a WiFi y enviamos por el serial algunos datos interesantes, como el valor de RSSI, la IP local, etc.
 */

#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

unsigned long previousMillis;
void setup() {
  Serial.begin(115200);
  WiFi.begin("Mi WiFi", "Password");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }
}

void loop() {
  if(millis()-previousMillis > 1000) {
    previousMillis = millis();

    String datosEnJson;
    StaticJsonDocument<200> doc;

    doc["ssid"] = WiFi.SSID();
    doc["millis"] = millis()/1000;
    doc["rssi"] = WiFi.RSSI();
    doc["mac"] = WiFi.macAddress();
    doc["ip"] = WiFi.localIP().toString();
    doc["status"] = WiFi.status();

    serializeJson(doc,datosEnJson);
    Serial.print(datosEnJson);
  }
}
