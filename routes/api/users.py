from flask import Blueprint, jsonify
#REST api for all the users data
users =Blueprint('users', __name__)

@users.route('/')
def index():
    return jsonify({"sucess":True})

