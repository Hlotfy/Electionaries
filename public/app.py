from flask import Flask
from flask import url_for, jsonify, render_template
import pickle

app = Flask(__name__)

@app.route('/calc_civ_score',  methods=['GET','POST'])
def calc_civ_score(text):
