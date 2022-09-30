from tokenize import Number
import numpy as np
import pandas as pd
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
import requests
import json
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from flask import Flask, redirect, url_for, render_template, request, session, flash, jsonify


app = Flask(__name__)
cors = CORS(app)
client = MongoClient("mongodb://localhost:27017")
db = client['final']
collection = db.buildings2
df = pd.DataFrame(list(collection.find()))


@app.route('/', methods=['GET'])
@cross_origin()
def index():

    # x = df[['buidling_floors', 'building_year', 'room_num', 'floor_num']]
    x = df[['buidling_floors', 'building_year', 'room_num', 'floor_num']]
    y = df['y']
    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.33)
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    # coeff_df = pd.DataFrame(lr.coef_, x.columns, columns=['Coefficient'])
    predictions = lr.predict(X_test)

    pickle.dump(lr, open('model.pkl', 'wb'))
    model = pickle.load(open('model.pkl', 'rb'))
    res = model.predict([[int(request.args['building_floors']), int(request.args['building_year']),
                          int(request.args['room_num']), int(request.args['floor_num'])]])

    result = "{:.2f}".format(res[0])
    return jsonify(result)


if __name__ == '__main__':
    # db.create_all() #creates the database if it doesn't exist whenever we run the application, we can use it to save users
    app.run(port=5000, debug=True)
