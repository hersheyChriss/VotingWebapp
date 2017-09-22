import json, string, random

from pref_vote import poll, STV
from flask import Flask, request


app = Flask(__name__)


polls = {}


open_polls  = set()


poll_pins = {}


@app.route('/api/submit_vote', methods=['POST'])
def submit_vote():
    data = json.loads(request.data)
    poll_id = data[u'pollId']
    vote_info = [poll.Vote(str(data[u'preferences'][key]), int(key)) for key in data[u'preferences']]
    polls[poll_id].submit_ballot(poll.Ballot(vote_info,'a'))
    return 'OK', 200


@app.route('/api/check_status', methods=['GET'])
def check_status():
    data = json.loads(request.data)
    poll_id = data[u'pollId']
    return json.dumps(STV.run_STV_poll(polls[poll_id])), 200


@app.route('/api/start_poll', methods=['POST'])
def start_poll():
    global open_polls
    data = json.loads(request.data)
    open_polls.add(data[u'pollId'])
    return 'OK', 200


@app.route('/api/get_ballot', methods=['GET'])
def get_ballot():
    data = json.loads(request.data)
    poll_id = data[u'pollId']
    return json.dumps(polls[poll_id].get_ballot_info()), 200


@app.route('/api/stop_poll', methods=['POST'])
def stop_poll():
    global open_polls
    data = json.loads(request.data)
    open_polls.remove(data[u'pollId'])
    return 'OK', 200

@app.route('/api/create_poll', methods=['POST'])
def create_poll():
    data = json.loads(request.data)
    poll_name = data[u'pollName']
    poll_candidates = data[u'candidates']
    num_of_winners = int(data[u'numOfWinners'])
    poll_id = _unique_generator(8)
    poll_pin = _unique_generator(5)
    poll_candidates = [poll.Candidate(c) for c in poll_candidates]
    polls[poll_id] = poll.Poll(poll_name, poll_candidates, poll_id, num_of_winners)
    poll_pins[poll_pin] = poll_id
    return json.dumps(dict(pollId=poll_id, pollPin = poll_pin)), 200

def _unique_generator(size = 6, chars=string.ascii_letters + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
