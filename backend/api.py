# Using flask to make an api
from flask import Flask, jsonify, request
import praat_scripts

# creating a Flask app
app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def home():
	if(request.method == 'GET'):
		data = "hello world"
		return jsonify({'data': data})

# post route that recieves a wav file only
@app.route('/api', methods = ['POST'])
def api():
	if(request.method == 'POST'):
		file = request.files['file']
		file.save('./audio/upload.wav')
		filename = file.filename
		print("File received: " + filename)
		json_res = praat_scripts.run() # run the praat script
		# wait for the praat script to finish running
		return jsonify({'filename': filename, 'message': 'success', 'voice_data_json': json_res})
	json_res = ""
	
# driver function
if __name__ == '__main__':
	app.run(debug = True)
