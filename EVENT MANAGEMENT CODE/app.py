from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Temporary storage for events (not recommended for production)
events = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/create_event", methods=["POST"])
def create_event():
    event_data = request.get_json()
    events.append(event_data)
    return jsonify(event_data)

@app.route("/events")
def get_events():
    return jsonify(events)

if __name__ == "__main__":
    app.run(debug=True)
