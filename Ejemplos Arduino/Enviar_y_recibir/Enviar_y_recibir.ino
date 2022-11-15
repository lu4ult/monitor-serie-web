/*
 * Este sencillo programa envía cada 1 segundo un mensaje por el serial y, lo que reciba por el serial lo muestra en un Display LCD I2C.
 *
 * En el monitor serie web simplemente seleccione la velocidad, que en este caso colocamo en 115200 abra el puerto y verá los datos recibidos cada segundo.
 * Lo que escriba y envíe lo verá en el display.
 */

#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 12, 2);

unsigned long previousMillis = 0;

void setup() {
  Serial.begin(115200);

  //LCD:
  //lcd.begin();        //Versiones antiguas de la librería requerían .begin() en lugar de .init()
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.print("Hola mundo!");
}

void loop() {
  if(Serial.available()) {
    delay(50);                                      //Es necesario esperar un momento sino "se come" el primer caracter recibido.
    String inputString = "";
    while(Serial.available()) {
      char c = Serial.read();
      if(c != '\r' and c != '\n')                   //Vamos concatenando las letras recibidas excepto el caracter de retorno de carro y nueva línea.
        inputString += c;
    }

    lcd.clear();
    lcd.print(inputString);
  }

  if(millis() - previousMillis > 1000) {
    previousMillis = millis();
    Serial.println("{\"millis\":"+String(millis()/1000)+",\"random\":"+String(random(1,100))+"}");        //En lugar de utilizar la librería JSON para generar el JSON lo armamos manualmente.
  }
}
