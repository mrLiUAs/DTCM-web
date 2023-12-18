from flask import Flask, request, jsonify
from flask import render_template, url_for, redirect, session, flash
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/data", methods=["POST"])
def data():
    if request.method == "POST":
        print(request.get_json())
    return "ok"

@app.route("/test", methods=["GET", "POST"])
def test():
    return render_template("ttt.html")

# TODO
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    user = mongo.db.users.find_one({"username": username, "password": password})
    if user:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid credentials"})

if __name__ == "__main__":
    app.run(debug=True, port=3000)
