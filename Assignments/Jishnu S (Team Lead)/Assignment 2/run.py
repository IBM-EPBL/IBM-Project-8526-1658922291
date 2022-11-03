from flask import Flask, render_template
from flask_navigation import Navigation

app = Flask(__name__)
nav = Navigation(app)

nav.Bar('top', [
    nav.Item('Home', 'index'),
    nav.Item('About','about'),
    nav.Item('Sign in','signin'),
    nav.Item('Sign up','signup'),
])

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/navpage')
def navpage():
    return render_template('navpage.html')


@app.route('/About')
def about():
	return render_template('About.html')


@app.route('/Sign in')
def signin():
	return render_template('signin.html')


@app.route('/Sign up')
def signup():
	return render_template('signup.html')


if __name__ == '__main__':
	app.run()
