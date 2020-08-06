import spotipy
from spotipy.oauth2 import SpotifyOAuth
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import pandas as pd
import random 
import collections

class Recommender():

    NUM_TRACKS = 30
    
    sp = spotipy.Spotify(auth_manager = SpotifyOAuth(
        username = 'u2qt69mreoqsc16jar5z2s7cl'
    ))

    @classmethod
    def test(cls, track_ids):
        return cls._get_recommended_tracks(track_ids)

    @classmethod 
    def make_recommendation(cls, track_ids):
        tracks = cls._get_related_tracks(track_ids)
        return cls._get_recommended_tracks(tracks)

    @classmethod
    def _get_artist_ids(cls, track_ids):
        artist_ids = set()
        for track_id in track_ids:
            result = cls.sp.track(track_id)['artists']
            for artist in result:
                artist_ids.add(artist['id'])
        
        return list(artist_ids)

    @classmethod
    def _get_related_artists(cls, artist_id):
        related_artists = []
        result = cls.sp.artist_related_artists(artist_id)['artists']
        for artist in result:
            related_artists.append(artist['id'])
        artists = set()
        try:
            artists.update(related_artists[:2])
            related_artists.sort(reverse = True, key = cls._get_artist_popularity)
            artists.update(related_artists[:2])
            artists.update(random.sample(related_artists[3:], k = 2))
        except:
            return []
            
        return list(artists)

    @classmethod
    def _get_top_tracks(cls, artist_id):
        top_tracks = []
        result = cls.sp.artist_top_tracks(artist_id)['tracks']
        for track in result:
            top_tracks.append(track['id'])
        tracks = set()
        try:
            tracks.update(random.sample(top_tracks[:5], k = 2))
            tracks.update(random.sample(top_tracks[6:], k = 3))
        except:
            tracks.update(top_tracks)
        
        return list(tracks)

    @classmethod
    def _get_related_tracks(cls, track_ids):
        recommended_tracks = set()
        artist_ids = cls._get_artist_ids(track_ids)
        for artist_id in artist_ids:
            related_artists = cls._get_related_artists(artist_id)

            for artist in related_artists:
                top_tracks = cls._get_top_tracks(artist)
                recommended_tracks.update(top_tracks)
        return random.sample(list(recommended_tracks), k = 100 \
            if len(recommended_tracks) > 100 else len(recommended_tracks))

    @classmethod
    def _get_artist_popularity(cls, artist_id):
        return cls.sp.artist(artist_id)['popularity']

    @classmethod
    def _get_audio_features(cls, track_ids):
        df = pd.DataFrame(columns = [
            'energy',
            'valence',
            'speechiness',
            'acousticness',
            'danceability',
            'instrumentalness',
            'tempo'
        ])
        track_audio_features = cls.sp.audio_features(track_ids)
        # return track_audio_features
        for i in range(len(track_audio_features)):
            track = track_audio_features[i]
            df.loc[i] = [
                track['energy'],
                track['valence'],
                track['speechiness'],
                track['acousticness'],
                track['danceability'],
                track['instrumentalness'],
                track['tempo']
            ]
        
        return df

    @staticmethod
    def _cluster_tracks(df):
        scaler = StandardScaler()
        pca = PCA(n_components = 5)
        clustering = KMeans(n_clusters = 4)

        scaler.fit_transform(df)
        df = pd.DataFrame(pca.fit_transform(df))

        clustering.fit(df)
        predictions = clustering.predict(df)

        return predictions

    @classmethod
    def _get_recommended_tracks(cls, track_ids):
        df = cls._get_audio_features(track_ids)
        predictions = cls._cluster_tracks(df)
        
        predictions_counter = collections.Counter(predictions)
        tracks_by_cluster = {}   
        for i in range(len(predictions)):
            if(predictions[i] in tracks_by_cluster.keys()):
                tracks_by_cluster[predictions[i]].append(track_ids[i])
            else:
                tracks_by_cluster[predictions[i]] = [track_ids[i]]

        for key in list(predictions_counter.keys()):
            if(predictions_counter[key] < 10):
                del predictions_counter[key]
        
        recommended_tracks = []
        num_songs = int(cls.NUM_TRACKS / len(predictions_counter.keys()))
        for key in predictions_counter.keys():
            recommended_tracks.extend(random.sample(tracks_by_cluster[key], k = num_songs))

        return recommended_tracks

        






