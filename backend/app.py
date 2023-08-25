# -*- coding: utf-8 -*-
"""
ToneCraft - A tool for analysing voice data

Praat Scripts Credit: https://github.com/drfeinberg/PraatScripts
"""

print("Analysing voice data...")

#Measure pitch of all wav files in directory
import glob
import numpy as np
import pandas as pd
import parselmouth
from parselmouth.praat import call


# This is the function to measure voice pitch
def measurePitch(voiceID, f0min, f0max, unit):
    sound = parselmouth.Sound(voiceID) # read the sound
    pitch = call(sound, "To Pitch", 0.0, f0min, f0max) #create a praat pitch object
    meanF0 = call(pitch, "Get mean", 0, 0, unit) # get mean pitch
    stdevF0 = call(pitch, "Get standard deviation", 0 ,0, unit) # get standard deviation
    harmonicity = call(sound, "To Harmonicity (cc)", 0.01, 75, 0.1, 1.0)
    hnr = call(harmonicity, "Get mean", 0, 0)
    pointProcess = call(sound, "To PointProcess (periodic, cc)", f0min, f0max)
    localJitter = call(pointProcess, "Get jitter (local)", 0, 0, 0.0001, 0.02, 1.3)
    localabsoluteJitter = call(pointProcess, "Get jitter (local, absolute)", 0, 0, 0.0001, 0.02, 1.3)
    rapJitter = call(pointProcess, "Get jitter (rap)", 0, 0, 0.0001, 0.02, 1.3)
    ppq5Jitter = call(pointProcess, "Get jitter (ppq5)", 0, 0, 0.0001, 0.02, 1.3)
    ddpJitter = call(pointProcess, "Get jitter (ddp)", 0, 0, 0.0001, 0.02, 1.3)
    localShimmer =  call([sound, pointProcess], "Get shimmer (local)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
    localdbShimmer = call([sound, pointProcess], "Get shimmer (local_dB)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
    apq3Shimmer = call([sound, pointProcess], "Get shimmer (apq3)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
    aqpq5Shimmer = call([sound, pointProcess], "Get shimmer (apq5)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
    apq11Shimmer =  call([sound, pointProcess], "Get shimmer (apq11)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
    ddaShimmer = call([sound, pointProcess], "Get shimmer (dda)", 0, 0, 0.0001, 0.02, 1.3, 1.6)


    return meanF0, stdevF0, hnr, localJitter, localabsoluteJitter, rapJitter, ppq5Jitter, ddpJitter, localShimmer, localdbShimmer, apq3Shimmer, aqpq5Shimmer, apq11Shimmer, ddaShimmer

# praat script main
def run_single(file):
	file.save('./audio/' + file.filename )
	wave_file = './audio/' + file.filename
	sound = parselmouth.Sound(wave_file)
	(meanF0, stdevF0, hnr, localJitter, localabsoluteJitter, rapJitter, ppq5Jitter, ddpJitter, localShimmer, localdbShimmer, apq3Shimmer, aqpq5Shimmer, apq11Shimmer, ddaShimmer) = measurePitch(sound, 75, 500, "Hertz")
	
	df = pd.DataFrame(np.column_stack([wave_file, meanF0, stdevF0, hnr, localJitter, localabsoluteJitter, rapJitter, ppq5Jitter, ddpJitter, localShimmer, localdbShimmer, apq3Shimmer, aqpq5Shimmer, apq11Shimmer, ddaShimmer]),
		   columns=['voiceID', 'meanF0Hz', 'stdevF0Hz', 'HNR', 'localJitter', 'localabsoluteJitter', 'rapJitter','ppq5Jitter', 'ddpJitter', 'localShimmer', 'localdbShimmer', 'apq3Shimmer', 'apq5Shimmer',
	      'apq11Shimmer', 'ddaShimmer'])
	json=df.to_json(orient='records')
	os.remove(wave_file)
	return json
    

#openai integration
import openai
import os
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_prompt(sound_data, tags, text, word_count):
	return """
    You are a gen-ai tone based content writer tool. You analyse the tone, with data points given below, and modify provided text to match the tone, while keeping the meaning of the text intact.
    You are looking for the following metrics:
    - Mean F0
    - Standard Deviation of F0
    - Harmonic-to-Noise Ratio
    - Local Jitter
    - Local Absolute Jitter
    - Rap Jitter
    - PPQ5 Jitter
    - DDP Jitter
    - Local Shimmer
    - Local dB Shimmer
    - APQ3 Shimmer
    - APQ5 Shimmer
    - APQ11 Shimmer
    - DDA Shimmer
    You are given the following voice data: """ + sound_data + """ in JSON format (HIGHEST PRIORITY)
    You are given the following text: """ + text + """
    Here are some tags selected by the user: """ + tags + """
    Expected Word Count: """ + word_count + """
    Return the modified text ONLY.
    """

def run_prompt(prompt_):
    model_engine = "text-davinci-003"
    try:
        completion = openai.Completion.create(
            engine=model_engine,
            prompt=prompt_,
            max_tokens=2048 - len(prompt_),
            n=1,
            stop=None,
            temperature=0,
        )
        return completion.choices[0].text
    except Exception as e:
        print(e)
        return "Error"

# Using flask to make an api
from flask import Flask, jsonify, request
# import praat_scripts

# creating a Flask app
app = Flask(__name__)

# prevent CORS error
from flask_cors import CORS
CORS(app)

@app.route('/', methods = ['GET'])
def home():
	if(request.method == 'GET'):
		data = "hello world"
		return jsonify({'data': data})

# post route that recieves a wav file only
@app.route('/api', methods = ['POST'])
def api():
	if(request.method == 'POST'):
		print(request.files)
		print(request.form)
		file = request.files['file']
		content = request.form['content']
		tags = request.form['tags']
		word_count = request.form['word_count']
		# file.save('./audio/upload.wav')
		filename = file.filename
		print("File received: " + filename)
		try:
			json_res = run_single(file) # run the praat script
			print("Voice data from PRAAT : " + json_res)
			prompt = get_prompt(json_res, tags, content, word_count)
			text = run_prompt(prompt)
			return jsonify({'filename': filename, 'message': 'success', 'voice_data_json': text})
		except Exception as e:
			print(e)
			return jsonify({'filename': filename, 'message': 'error', 'error': e})
            

	
# driver function
if __name__ == '__main__':
	app.run(debug = True)
