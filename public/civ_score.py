#!/usr/bin/python3
import pickle
import numpy as np
import sys
from sklearn.linear_model.logistic import LogisticRegression
# from sklearn.feature_extraction.text import TfidfVectorizer

def calc_civ_score(text):
    # from sklearn.feature_extraction.text import TfidfVectorizer
    filename = '/Users/halalotfy/CS323/Electionaries/civ_score.sav'
    # vectorizer = TfidfVectorizer()

    loaded_model = pickle.load(open(filename, 'rb'))
    vectorizer = pickle.load(open('/Users/halalotfy/CS323/Electionaries/civ_vec.sav', 'rb'))
    vec_text = vectorizer.transform([text])
    result = loaded_model.predict_proba(vec_text)
    return {'score':np.around(result[0][0], decimals=2)}

anno_text = "This is relatable; I feel like any woman who doesn't sugar coat things is labeled as 'blunt', similar to how any woman who is assertive is labeled as 'bossy'."

calc_civ_score(anno_text)

if __name__ == "__main__":
    print("FUCK THIS")