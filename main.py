from fastapi import FastAPI, Body, HTTPException
from pymongo import MongoClient, DESCENDING,ASCENDING
import uvicorn
from typing import Union, Optional, List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import parking_id, parking_floor


class Parking(BaseModel):
    id: str
    floor: str
    status: bool

    
class Floor(BaseModel):
    floor: str
    running_count: bool


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"msg": "smart-car-parking"}

@app.get("/get-parking-id/")
def get_parking_id():
    """Send the data to the frontend."""
    list_data = []
    for i in parking_id.find({}, {"_id": False}):
        list_data.append(i)
    return {"cars": list_data}

@app.post("/record-parking-id/")
def record_parking_id(parking: Parking):
    """Record the data when hardware send."""
    parking_id.update_one({"id": parking.id, "floor": parking.floor}, {"$set": {"status": parking.status}})

@app.get("/get-parking-floor/")
def get_parking_floor():
    """Send the data to the frontend."""
    list_data = []
    for i in parking_floor.find({}, {"_id": False}):
        i["remaining_parking"] = len(list(parking_id.find({"status": False, "floor": i["floor"]}, {"_id": False}))) - i["running_count"]
        list_data.append(i)
    return {"floors": list_data}

@app.post("/record-parking-floor/")
def record_parking_floor(floor: str = Body(), change: int = Body()):
    """Record the data when hardware send."""
    old_running_count = parking_floor.find_one({"floor": floor})["running_count"]
    parking_floor.update_one({"floor": floor}, {"$set":{"running_count": change+old_running_count}})


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
