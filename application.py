from flask import Flask, flash, redirect, render_template, request, session, abort, send_from_directory, send_file, jsonify
import pandas as pd

import json


# 1. Declare application
application = Flask(__name__)

# 2. Declare data stores


class DataStore():
    CountryName = None
    Year = None
    Prod = None
    Loss = None


data = DataStore()


# 3. Define main code
@application.route("/", methods=["GET", "POST"])
def homepage():

    return render_template("index.html")


@application.route("/get-data", methods=["GET", "POST"])
def returnProdData():
    f = data.Prod

    return jsonify(f)
# export the final result to a json file


if __name__ == "__main__":
    application.run(debug=True)
