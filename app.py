from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes

# File to store places
FILE_PATH = 'places.json'

# Function to read the places from the file
def read_places():
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, 'r') as f:
            return json.load(f)
    return []

# Function to write places to the file
def write_places(places):
    with open(FILE_PATH, 'w') as f:
        json.dump(places, f, indent=4)

# Route to get all places
@app.route('/places', methods=['GET'])
def get_places():
    places = read_places()
    return jsonify(places)

# Route to add a new place
@app.route('/places', methods=['POST'])
def add_place():
    places = read_places()
    data = request.json
    print(data)  # Debug: print the incoming data to verify it
    places.append(data)
    write_places(places)
    return jsonify({"message": "Place added successfully!"}), 200

# Route to delete a place by ID
@app.route('/places/<string:place_id>', methods=['DELETE'])
def delete_place(place_id):
    places = read_places()
    places = [place for place in places if place['id'] != place_id]
    write_places(places)
    return jsonify({"message": "Place deleted successfully!"}), 200

# Route to edit a place by ID
@app.route('/places/<string:place_id>', methods=['PUT'])
def edit_place(place_id):
    places = read_places()
    data = request.json
    for place in places:
        if place['id'] == place_id:
            place.update(data)
            write_places(places)
            return jsonify({"message": "Place updated successfully!"}), 200
    return jsonify({"message": "Place not found!"}), 404

# Route for root URL
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Places API!"})

if __name__ == '__main__':
    app.run(debug=True)