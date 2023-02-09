#include <Arduino.h>
#include <Bounce2.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Qwerty";
const char *password = "12345678";

const String Send_Park_url = "";
const String Send_Check_url = "";

void Connect_Wifi();

void setup() {
  Serial.begin(115200);
  Connect_Wifi();
}

void loop() {
}

void Connect_Wifi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.print("OK! IP=");
  Serial.println(WiFi.localIP());
}