#include <Arduino.h>
#include <Bounce2.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define LDR_IN     14
#define LDR_OUT    27
#define SENSOR_1   32
#define SENSOR_2   39
//can't use 13 12 4 2 

const int dark = 2000;

//ID 1, 2
//Floor 1


bool currentStatus[2] = {false, false};
int changeStatus[2] = {0, 0};
int AllSensor[2] = {SENSOR_1, SENSOR_2};
int AID[2] = {1, 2};

int currentFloor = 1;

Bounce debouncer1 = Bounce(); 
Bounce debouncer2 = Bounce();

TaskHandle_t TPark = NULL;
TaskHandle_t TCheck = NULL;

int globalID;
bool globalState;

const char *ssid = "Qwerty";
const char *password = "12345678";

const String Send_Park_url = "https://ecourse.cpe.ku.ac.th/exceed16/record-parking-id/";
const String Send_Check_url = "https://ecourse.cpe.ku.ac.th/exceed16/record-parking-floor/";


void Send_Park(int id, int floor, bool Status);
void Send_Check(int floor, bool IN);
void Send();
void Park(void *param);
void Check(void *param);
void Connect_Wifi();

void setup() {
  Serial.begin(115200);
  Connect_Wifi();

  Send_Park(1, 1, false);
  Send_Park(2, 1, false);
  pinMode(LDR_IN, INPUT);
  pinMode(LDR_OUT, INPUT);
  pinMode(SENSOR_1, INPUT);
  pinMode(SENSOR_2, INPUT);

  debouncer1.attach(LDR_IN);
  debouncer1.interval(5);
  debouncer2.attach(LDR_OUT);
  debouncer2.interval(5);
  xTaskCreatePinnedToCore(Park, "Park", 10000, NULL, 1, &TPark, 0);
  xTaskCreatePinnedToCore(Check, "Check", 10000, NULL, 1, &TCheck, 1);
}

void loop() {
}

void Check_Park(int id) {
  //id = 1, 2
  id--;
  int sensor = AllSensor[id];
  bool isDark = analogRead(sensor) < dark;
  //status mean isDark
  if (isDark && !currentStatus[id] && changeStatus[id] < 50) {
    changeStatus[id]++;
  }
  else if (!isDark && !currentStatus[id]) {
    changeStatus[id] = 0;
  }
  else if (isDark && currentStatus[id]) {
    changeStatus[id] = 50;
  }
  else if (!isDark && currentStatus[id] && changeStatus[id] > 0) {
    changeStatus[id]--;
  }
  //check if need to send http
  if ((!currentStatus[id] && changeStatus[id] == 50) || (currentStatus[id] && changeStatus[id] == 0)) {
    //switch state
    globalState = (!currentStatus[id] && changeStatus[id] == 50);
    globalID = id + 1;
    currentStatus[id] = !currentStatus[id];
    Send();
    //xTaskCreatePinnedToCore(Send, "Sending", 100000, NULL, 1, &Sending, 0);
  }
}


void Send_Park(int id, int currentFloor, bool Status) {
  String json;
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["id"] = AID[id - 1];
  doc["floor"] = currentFloor;
  doc["status"] = Status;
  serializeJson(doc, json);
  http.begin(Send_Park_url);
  http.addHeader("Content-Type","application/json");
  Serial.println(json);
  int httpResponseCode = http.POST(json);
  if (httpResponseCode >= 200 && httpResponseCode < 300) {
    Serial.println("Done!!");
    }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

void Send_Check(int floor, bool IN) {
  String json;
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["floor"] = floor;
  doc["running_change"] = IN ? 1 : -1;
  serializeJson(doc, json);
  http.begin(Send_Check_url);
  http.addHeader("Content-Type","application/json");
  Serial.println(json);

  int httpResponseCode = http.POST(json);

  if (httpResponseCode >= 200 && httpResponseCode < 300) {
    Serial.println("Done!!");
    }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

void Check_inout(){
  debouncer1.update();
  debouncer2.update();
  if (debouncer1.rose() && debouncer2.rose()){
  }
  else if (debouncer1.rose()){
    Send_Check(1, true);
  }
  else if (debouncer2.rose()){
    Send_Check(1, false);
  }
}

void Park(void *param) {
  while (1) {
    Check_Park(1);
    Check_Park(2);
    vTaskDelay(100);
  }
}

void Check(void *param) {
  while (1) {
    Check_inout();
  }
}

void Send() {
  Serial.print("Send: ");
  Serial.println(globalID);
  Send_Park(globalID, currentFloor, globalState);
  //Send_Check(currentFloor, !globalState);
  
  //vTaskDelete(Sending);
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
