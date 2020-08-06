from dotenv import load_dotenv 
load_dotenv()

from flask import Flask, request
from recommender import Recommender



app = Flask(__name__)
app.config.from_pyfile('config.py')


@app.route('/', methods = ['POST'])
def make_song_recommendation():
    try:
        # data = request.args.get('ids')
        data = request.get_json()
        tracks = data['tracks'] # FIXME
        # return { "tracks" : tracks }
        recommended_tracks = Recommender.make_recommendation(tracks)
        return { 'tracks' : recommended_tracks }
    except:
        return { 'message' : 'There was an issue with generating recommended tracks' }, 500
    


if(__name__ == '__main__'):
    app.run()