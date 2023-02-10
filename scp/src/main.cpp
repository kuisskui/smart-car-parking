#include <Arduino.h>
#include <Bounce2.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define LDR_IN     14
#define LDR_OUT    0
#define SENSOR_1   32
#define SENSOR_2   39
#define LED_1      34
#define LED_2      36

//can't use 13 12 4 2 

const int dark = 2000;

//ID 1, 2
//Floor 1

bool currentStatus[2] = {false, false};
int changeStatus[2] = {0, 0};
int AllSensor[2] = {SENSOR_1, SENSOR_2};

int currentFloor = 1;

Bounce debouncer1 = Bounce(); 
Bounce debouncer2 = Bounce();

TaskHandle_t Checking = NULL;
TaskHandle_t Sending = NULL;

int globalID;
bool globalState;

const char *ssid = "Will";
const char *password = "12345678";

const String Send_Park_url = "https://ecourse.cpe.ku.ac.th/exceed16/record-parking-id/";
const String Send_Check_url = "https://ecourse.cpe.ku.ac.th/exceed16/record-parking-floor/";

int isObstacle = HIGH;


void Send_Park(int id, int floor, bool Status);
void Send_Check(int floor, bool IN);
void Send(void *param);
void Check(void *param);
void Connect_Wifi();

void setup() {
  Serial.begin(115200);
  Connect_Wifi();
  xTaskCreatePinnedToCore(Check, "Checking", 100000, NULL, 1, &Checking, 0);
}

void loop() {
}

void Check_Park(int id) {
  //id = 1, 2
  id--;
  int sensor = AllSensor[id];
  bool status = analogRead(sensor) < dark;
  Serial.println(analogRead(sensor));
  //status mean isDark
  if (status && !currentStatus[id] && changeStatus[id] < 10) {
    changeStatus[id]++;
  }
  else if (!status && !currentStatus[id]) {
    changeStatus[id] = 0;
  }
  else if (status && currentStatus[id]) {
    changeStatus[id] = 10;
  }
  else if (!status && currentStatus[id] && changeStatus[id] > 0) {
    changeStatus[id]--;
  }
  //check if need to send http
  if ((!currentStatus[id] && changeStatus[id] == 10) || (currentStatus[id] && changeStatus[id] == 0)) {
    //switch state
    currentStatus[id] = !currentStatus[id];
    globalID = id + 1;
    globalState = (!currentStatus[id] && changeStatus[id] == 10);
    xTaskCreatePinnedToCore(Send, "Sending", 100000, NULL, 1, &Sending, 1);
  }
}


void Send_Park(int id, int currentFloor, bool Status) {
  //Status = true มีรถจอด
  //Status = false ไม่มีรถจอด
  HTTPClient http;
  DynamicJsonDocument doc(512);
  doc["id"] = id;
  doc["floor"] = currentFloor;
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

void Check(void *param) {
  int count = 1;
  while (true) {
    Serial.print("Checkcount: ");
    Serial.println(count++);
    Check_Park(1);
    Check_Park(2);
    vTaskDelay(1000);
  }
}

void Send(void *param) {
  Send_Park(globalID, currentFloor, globalState);
  Send_Check(currentFloor, !globalState);
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