from flask import Flask, make_response, request

app = Flask(__name__)
app.config.from_pyfile('config.py') # not sure if app configurations are necessary

@app.route('/')
def index():
    return 'Hello World'