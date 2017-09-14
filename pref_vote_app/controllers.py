import json

from flask import Flask, request


app = Flask(__name__)


place_holder = None


polls = {}


open_polls  = set()


@app.route('/api/submit_vote', methods=['POST'])
def submit_vote():
    data = json.loads(request.data)
    poll_id = data[u'poll_id']
    vote_info = {int(key): data[u'preferences'][key] for key in data[u'preferences']}
    polls[poll_id].submit_ballot(place_holder.Ballot(vote_info))
    return 'OK', 200


@app.route('/api/check_status', methods=['GET'])
def check_status():
    data = json.loads(request.data)
    poll_id = data[u'poll_id']
    return json.dumps(polls[poll_id].check_status()), 200


@app.route('/api/start_poll', methods=['POST'])
def start_poll():
    global open_polls
    data = json.loads(request.data)
    open_polls.add(data[u'poll_id'])
    return 'OK', 200


@app.route('/api/get_ballot', methods=['GET'])
def get_ballot():
    data = json.loads(request.data)
    poll_id = data[u'poll_id']
    return json.dumps(polls[poll_id].get_ballot_info()), 200


@app.route('/api/stop_poll', methods=['POST'])
def stop_poll():
    global open_polls
    data = json.loads(request.data)
    open_polls.remove(data[u'poll_id'])
    return 'OK', 200
