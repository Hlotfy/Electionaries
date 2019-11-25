#!/usr/bin/python3
from flask import Flask
from flask import url_for, jsonify, render_template
import pickle
import numpy as np
import sys
import civ_score as cs
import sklearn.linear_model.logistic

app = Flask(__name__)

@app.route('/calc_civ_score/<text>',  methods=['GET','POST'])
def calc_civ_score(text):
    return jsonify({'score':cs.calc_civ_score(text)})

if __name__ == "__main__":
    app.debug = True
    app.run()