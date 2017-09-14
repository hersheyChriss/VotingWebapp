import json

from flask import Flask, request


app = Flask(__name__)


place_holder = None


polls = {}


open_polls  = set()


@app.route('/api/submit_vote', methods=['POST'])
def submit_vote():
    data = json.loads(request.data)
    vote_info = {int(key): data[u'preferences'][key] for key in data[u'preferences']}
    poll_id = data[u'poll_id']
    polls[poll_id].submit_ballot(place_holder.Ballot(vote_info))
    return 'OK', 200


@app.route('/api/check_status', methods=['POST'])
def check_status():
    data = json.loads(request.data)
    poll_id = data[u'poll_id']
    return json.dumps(polls[poll_id].check_status()), 200


@app.route('/api/start_poll', methods=['POST'])
def start_poll():
    data = json.loads(request.data)
    open_polls.add(data[u'poll_id'])
    return 'OK', 200
