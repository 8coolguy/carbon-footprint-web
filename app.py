from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
from routes.api.users import users
#from api import #something for the REST api

app =Flask(__name__, static_url_path='',static_folder="client/build")
CORS(app)
api=Api(app)
app.register_blueprint(users)


@app.route("/", defaults={'path':''})
def serve(path):
    print(path)
    return send_from_directory(app.static_folder,'index.html')


#less
#api.add_resource(HelloApiHandler, '/flask/hello')