import json

from flask import Flask, request


app = Flask(__name__)


place_holder = None


polls = {}


@app.route('/api/submit_vote', methods=['POST'])
def submit_vote():
    data = json.loads(request.data)
    vote_info = {int(key): data[u'preferences'][key] for key in data[u'preferences']}
    poll_id = data[u'poll_id']
    polls[poll_id].submit_ballot(place_holder.Ballot(vote_info))
    return 'OK', 200
