from flask import Flask, request, jsonify
import pickle
import pandas as pd
from features import extract_features
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained model
with open("phishing_model.pkl", "rb") as f:
    model, feature_names = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    url = data.get("url")

    features = extract_features(url)
    df = pd.DataFrame([features], columns=feature_names)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0]

    return jsonify({
        "url": url,
        "prediction": int(prediction),
        "confidence": float(max(probability))
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)