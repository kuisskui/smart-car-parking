from pymongo import MongoClient
import os
import urllib
from dotenv import load_dotenv
load_dotenv('.env')

DATABASE_NAME = "exceed01"
COLLECTION_NAME_ID = "smart-car-parking-id"
COLLECTION_NAME_FLOOR = "smart-car-parking-floor"
username = os.getenv("user")
password = urllib.parse.quote(os.getenv('password'))
MONGO_DB_URL = f"mongodb://{username}:{urllib.parse.quote(password)}@mongo.exceed19.online"
MONGO_DB_PORT = 8443

client = MongoClient(f"{MONGO_DB_URL}:{MONGO_DB_PORT}/?authMechanism=DEFAULT")
db = client[DATABASE_NAME]
parking_id = db[COLLECTION_NAME_ID]
parking_floor = db[COLLECTION_NAME_FLOOR]
