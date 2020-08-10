from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request
from recommender import Recommender
import random

app = Flask(__name__)

meme_songs = [
    '5Vnx5i9VJSZ6ayfK6jncf8',
    '2374M0fQpWi3dLnB54qaLX',
    '2XWEKRbJ8lSvmDI3qfIsXc',
    '2Lh5QSUyAMsun7ueSar2sL',
    '50fboiidqkAhrE5dNueFKR',
    '2WfaOiMkCvy7F5fcp2zZ8L',
    '7GhIk7Il098yCjg4BQjzvb',
    '1Y2xv06UOclv7HpuMSqFq1',
    '3DamFFqW32WihKkTVlwTYQ',
    '4fK6E2UywZTJIa5kWnCD6x',
    '7uHO4AmKtyGa5v5fsElGoC'
]

@app.route('/songs', methods = ['POST'])
def make_song_recommendation():
    try:
        data = request.get_json()
        tracks = data['tracks']
        if(len(tracks) < 5):
            return { 'tracks' : tracks }
        recommended_tracks = Recommender.make_recommendation(tracks)
        recommended_tracks.append(random.choice(meme_songs))
        random.shuffle(recommended_tracks)
        return { 'tracks' : recommended_tracks }
    except:
        return { 'message' : 'There was an issue generating recommended tracks' }, 500


@app.route('/movies', methods = ['POST'])
def make_movie_recommendation():
    try:
        data = request.get_json()
        # TODO 
    except:
        return { 'message' : 'There was an issue generating movie recommendations' }, 500
    

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers['Access-Control-Allow-Credentials'] = 'false'
    return response


if(__name__ == '__main__'):
    app.run()