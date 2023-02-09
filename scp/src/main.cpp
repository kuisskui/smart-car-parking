#include <Arduino.h>
#include <Bounce2.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define LDR_IN     13;
#define LDR_OUT    2;
#define SENSOR_1   32;
#define SENSOR_2   39;
#define LED_1      34;
#define LED_2      36;


//ID 1, 2
//Floor 1

Bounce debouncer1 = Bounce(); 
Bounce debouncer2 = Bounce(); 

const char *ssid = "Qwerty";
const char *password = "12345678";

const String Send_Park_url = "";
const String Send_Check_url = "";

void Send_Park(int id, int floor, bool Status);
void Send_Check(int floor, bool IN);


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

void Send_Park(int id, int floor, bool Status) {
  //Status = true มีรถจอด
  //Status = false ไม่มีรถจอด
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["id"] = id;
  doc["floor"] = floor;
  doc["status"] = Status;
  http.begin(Send_Park_url);
  int httpResponseCode = http.GET();
  if (httpResponseCode >= 200 && httpResponseCode < 300) {
    Serial.println("Done!!");
    }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

void Send_Check(int floor, bool IN) {
  //IN = true รถเข้า
  //IN = false รถออก
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["floor"] = floor;
  doc["running_count"] = IN ? 1 : -1;
  http.begin(Send_Check_url);
  int httpResponseCode = http.GET();
  if (httpResponseCode >= 200 && httpResponseCode < 300) {
    Serial.println("Done!!");
    }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

