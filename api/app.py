from flask import Flask, request
from recommender import Recommender

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def make_song_recommendation():
    try:
        data = request.get_json()
        tracks = data['tracks'] 
        if(len(tracks) < 5):
            return { 'tracks' : tracks }
        recommended_tracks = Recommender.make_recommendation(tracks)
        return { 'tracks' : recommended_tracks }
    except:
        return { 'message' : 'There was an issue generating recommended tracks' }, 500
    

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers['Access-Control-Allow-Credentials'] = 'false'
    return response


if(__name__ == '__main__'):
    app.run()