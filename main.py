from fastapi import FastAPI, Body, HTTPException
import uvicorn
from typing import Union, Optional, List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import parking_floor, parking_id


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

@app.post("/")
def root():
    return {"msg": "smart-car-parking"}

@app.get("/car_park/")
def car_park_hardware(parking: Parking):
    """Send the data to the frontend."""
    parking_id.collection

@app.post("/car_park/")
def car_park_hardware(parking: Parking):
    """Get the data when hardware send."""
    parking_id.collection


@app.post("/car_count/")
def car_count():
    return 

    # return {"light": server}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
