from api import app
from flask import request, make_response

@app.route('/')
def index():
    return 'Hello World'