
def calc_civ_score(text):
    import pickle
    from sklearn.feature_extraction.text import TfidfVectorizer
    filename = 'civ_score.sav'
    vectorizer = TfidfVectorizer()

    loaded_model = pickle.load(open(filename, 'rb'))
    vec_text = vectorizer.transform(text)
    result = loaded_model.predict_proba(vec_text)
    print(result)

anno_text = "This is relatable; I feel like any woman who doesn't sugar coat things is labeled as 'blunt', similar to how any woman who is assertive is labeled as 'bossy'."

calc_civ_score(anno_text)