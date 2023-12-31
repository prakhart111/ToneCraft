# ToneCraft
Style & Tone Preserving Content Generation

**Try ToneCraft Now: https://tonecraft-ai.vercel.app/** <br>
**API Deployment: https://prakhart.pythonanywhere.com/**


## How it works
Here's a screen recording of the working of the application.
*https://youtube.com/shorts/O9ptza18mjg?feature=share*

## Idea Presentation Video
*https://youtu.be/7Tfnp-ssoEA*

## Using Locally
- Clone the repository
- Install the dependencies > backend
```bash
cd backend
pip install -r requirements.txt
# Add your OpenAI Key in backend .env file
```
- Install the dependencies > frontend
```bash
# Make sure you have nodejs installed
# Go back to the root directory using cd ..
cd frontend
npm install
```

- Run the backend server
```bash
# Make sure you are in the backend directory
py app.py
```

- Run the frontend server
```bash
# Make sure you are in the frontend directory
npm run dev
```


## Working example of API
- Content: "recently gave my JEE exam, I don't know if I'll pass"


- When a calming-happy sound is sent.
Audio: "./audio-sample-data/calm_happy.wav"
![Happy](image.png)

- When a scary-fearful sound is sent.
Audio: "./audio-sample-data/fear.wav"
![Fear](image-1.png)

- When angry sound is sent.
Audio: "./audio-sample-data/angry-med.wav"
![angry](image-2.png)

