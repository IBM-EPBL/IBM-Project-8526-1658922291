# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps.home import blueprint
from flask import render_template, request
from flask_login import login_required
from jinja2 import TemplateNotFound
import pandas as pd
import numpy as np
from ftfy import fix_text
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import re


@blueprint.route('/index')
@login_required
def index():
    with open('myntra-database.csv') as f:
        df1 = pd.read_csv(f)
        df1.to_string()
        df2 = df1.sample(25)
        df3 = df2.to_dict('index')
        print(df3)
        print(type(df3))

    return render_template('home/index.html', product = df3, segment='index')

# @blueprint.route('/search',methods=['GET','POST'])
# def recommender():
#     with open('G:\\Flask-Fashion-Recommender\\flask-pixel\\myntra-database.csv') as f1:
#         stopw  = set(stopwords.words('english'))
#         df11 = pd.read_csv(f1)
#         df11['test']=df11['gender','category','type','brand','description'].apply(lambda x: ' '.join([word for word in str(x).split() if len(word)>2 and word not in (stopw)]))

#         def ngrams(string, n=3):
#             string = fix_text(string) # fix text
#             string = string.encode("ascii", errors="ignore").decode() #remove non ascii chars
#             string = string.lower()
#             chars_to_remove = [")","(",".","|","[","]","{","}","'"]
#             rx = '[' + re.escape(''.join(chars_to_remove)) + ']'
#             string = re.sub(rx, '', string)
#             string = string.replace('&', 'and')
#             string = string.replace(',', ' ')
#             string = string.replace('-', ' ')
#             string = string.title() # normalise case - capital at start of each word
#             string = re.sub(' +',' ',string).strip() # get rid of multiple spaces and replace with a single
#             string = ' '+ string +' ' # pad names for ngrams...
#             string = re.sub(r'[,-./]|\sBD',r'', string)
#             ngrams = zip(*[string[i:] for i in range(n)])
#             return [''.join(ngram) for ngram in ngrams]
        
#         vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, lowercase=False)
#         tfidf = vectorizer.fit_transform(org_name_clean)
        

#         def getNearestN(query):
#             queryTFIDF_ = vectorizer.transform(query)
#             distances, indices = nbrs.kneighbors(queryTFIDF_)
#             return distances, indices

#         nbrs = NearestNeighbors(n_neighbors=1, n_jobs=-1).fit(tfidf)
#         unique_org = (df11['test'].values)
#         distances, indices = getNearestN(unique_org)
#         unique_org = list(unique_org)
#         matches = []
#         for i,j in enumerate(indices):
#             dist=round(distances[i][0],2)

#             temp = [dist]
#             matches.append(temp)
#         matches = pd.DataFrame(matches, columns=['Match confidence'])
#         df11['match']=matches['Match confidence']
#         df111=df11.sort_values('match')
#         df22=df111[['Product_url', 'image_url','type','category','description','brand']].head(30).reset_index()
#     return render_template('includes/card-each.html', sproduct = df22, segment='index')


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
