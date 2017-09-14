import json

from mock import MagicMock, patch

import pref_vote_app.controllers as cntrlr


class TestFlaskApiSuite(object):
    @patch('pref_vote_app.controllers.polls')
    @patch('pref_vote_app.controllers.place_holder')

    def test_submit_vote(self, stv_mock, polls_mock):
        app = cntrlr.app.test_client()
        poll = MagicMock()
        poll_dict = {'foo': poll}
        polls_mock.__getitem__.side_effect = lambda k: poll_dict[k]
        resp = app.post(
            '/api/submit_vote',
            data=json.dumps(dict(poll_id='foo',
                                 preferences={0:'bar',1:'baz'})))
        stv_mock.Ballot.assert_called_once_with({0: 'bar',1:'baz'})
        poll.submit_ballot.assert_called_once_with(stv_mock.Ballot.return_value)
        assert resp.status_code == 200
        assert resp.data == 'OK'

    @patch('pref_vote_app.controllers.polls')
    def test_check_status(self, polls_mock):
        app = cntrlr.app.test_client()
        poll = polls_mock.__getitem__.return_value
        poll.check_status.return_value = {'foo': 'bar'}
        resp = app.get('/api/check_status', data=json.dumps(dict(poll_id='foo')))
        polls_mock.__getitem__.assert_called_once_with('foo')
        poll.check_status.assert_called_once_with()
        assert resp.status_code == 200
        assert resp.data == json.dumps(poll.check_status.return_value)

    def test_start_poll(self):
        app = cntrlr.app.test_client()
        resp = app.post('/api/start_poll', data=json.dumps(dict(poll_id='foo')))
        assert 'foo' in cntrlr.open_polls
        assert resp.status_code == 200
        assert resp.data == 'OK'

    @patch('pref_vote_app.controllers.polls')
    def test_get_ballot(self, polls_mock):
        app = cntrlr.app.test_client()
        poll = polls_mock.__getitem__.return_value
        ballot_info = {'boo': 'baz'}
        poll.get_ballot_info.side_effect = [ballot_info]
        resp = app.get('/api/get_ballot', data=json.dumps(dict(poll_id='foo')))
        polls_mock.__getitem__.assert_called_once_with('foo')
        poll.get_ballot_info.assert_called_once_with()

        assert resp.status_code == 200
        assert resp.data == json.dumps(ballot_info)

    def test_stop_poll(self):
        app = cntrlr.app.test_client()

        app.post('/api/start_poll', data=json.dumps(dict(poll_id='foo')))
        assert 'foo' in cntrlr.open_polls

        resp = app.post('/api/stop_poll', data=json.dumps(dict(poll_id='foo')))
        assert 'foo'not in cntrlr.open_polls
        assert resp.status_code == 200
        assert resp.data == 'OK'
