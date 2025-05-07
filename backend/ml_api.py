from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

# Path to the model (absolute path from project root)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODEL_PATH = os.path.join(PROJECT_ROOT, 'frontend', 'model', 'model.h5')
model = load_model(MODEL_PATH, compile=False)

@app.route('/predict',methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        img = Image.open(file.stream).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array)
        confidence = float(prediction[0][0]) * 100
        detected = confidence > 56
        return jsonify({
            'detected': detected,
            'confidence': round(confidence,4)
        })
    except Exception as e:
        return jsonify({'error': str(e)}),500

if __name__=='__main__':
    app.run(host='0.0.0.0',port=5001,debug=True) 