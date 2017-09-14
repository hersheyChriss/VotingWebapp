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
