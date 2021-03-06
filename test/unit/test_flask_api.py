import json

from mock import MagicMock, patch

import pref_vote_app.controllers as cntrlr


class TestFlaskApiSuite(object):
    @patch('pref_vote_app.controllers.polls')
    @patch('pref_vote_app.controllers.poll')
    def test_submit_vote(self, poll_mock, polls_mock):
        app = cntrlr.app.test_client()
        poll = MagicMock()
        poll_dict = {'foo': poll}
        polls_mock.__getitem__.side_effect = lambda k: poll_dict[k]
        resp = app.post(
            '/api/submit_vote',
            data=json.dumps(dict(pollId='foo',
                                 preferences={1:'bar', 2:'baz'})))
        poll_mock.Ballot.assert_called_once_with({1: u'bar', 2: u'baz'})
        poll.submit_ballot.assert_called_once_with(poll_mock.Ballot.return_value)
        assert resp.status_code == 200
        assert resp.data == 'OK'

    @patch('pref_vote_app.controllers.STV')
    @patch('pref_vote_app.controllers.polls')
    def test_check_status(self, polls_mock, stv_mock):
        app = cntrlr.app.test_client()
        poll = polls_mock.__getitem__.return_value
        stv_mock.run_STV_poll.return_value = {'foo': 'bar'}
        resp = app.get('/api/check_status', data=json.dumps(dict(pollId='foo')))
        stv_mock.run_STV_poll.assert_called_once_with(poll)
        polls_mock.__getitem__.assert_called_once_with('foo')
        assert resp.status_code == 200
        assert resp.data == json.dumps(stv_mock.run_STV_poll.return_value)

    def test_start_poll(self):
        app = cntrlr.app.test_client()
        assert 'foo' not in cntrlr.open_polls
        resp = app.post('/api/start_poll', data=json.dumps(dict(pollId='foo')))
        assert 'foo' in cntrlr.open_polls
        assert resp.status_code == 200
        assert resp.data == 'OK'

    @patch('pref_vote_app.controllers.polls')
    def test_get_ballot(self, polls_mock):
        app = cntrlr.app.test_client()
        poll = polls_mock.__getitem__.return_value
        ballot_info = {'boo': 'baz'}
        poll.get_ballot_info.side_effect = [ballot_info]
        resp = app.get('/api/get_ballot', data=json.dumps(dict(pollId='foo')))
        polls_mock.__getitem__.assert_called_once_with('foo')
        poll.get_ballot_info.assert_called_once_with()

        assert resp.status_code == 200
        assert resp.data == json.dumps(ballot_info)

    def test_stop_poll(self):
        app = cntrlr.app.test_client()
        app.post('/api/start_poll', data=json.dumps(dict(pollId='foo')))
        assert 'foo' in cntrlr.open_polls

        resp = app.post('/api/stop_poll', data=json.dumps(dict(pollId='foo')))
        assert 'foo' not in cntrlr.open_polls
        assert resp.status_code == 200
        assert resp.data == 'OK'

    @patch('pref_vote_app.controllers._unique_generator')
    @patch('pref_vote_app.controllers.poll')
    def test_create_poll(self, poll_mock, generator_mock):
        app = cntrlr.app.test_client()
        poll_id = 'abcdefgh'
        poll_pin = 'abcde'
        generator_mock.side_effect = [poll_id, poll_pin]
        resp = app.post('/api/create_poll',
                        data=json.dumps(dict(pollName='nar',
                            candidates =['bar', 'baz'],
                                             numOfWinners= 4)))
        poll_mock.Poll.assert_called_once_with('nar', ['bar', 'baz'], poll_id, 4)
        assert resp.status_code == 200
        assert resp.data == json.dumps(dict(pollId=poll_id, pollPin=poll_pin))


