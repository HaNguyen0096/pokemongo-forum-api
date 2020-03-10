Pokemon Go Forum

Live: https://hanguyen-pokemongo-forum.now.sh/

API: https://stark-inlet-33649.herokuapp.com/api

Get all topics: GET /topics/
Get all threads: GET /threads/
Get all comments: GET /comments/
Get threads by topic: GET /topics/${topicId}/threads/
Get a thread by id: GET /threads/${thread_id}
Get comments by threads id: GET /threads/${threadId}/comments
Post a thread: POST /threads/
Post a comment: POST /comments/
Delete a thread: DELETE /threads/${thread_id}/
Delete a comment: DELETE /comments/${comment_id}/
Change a thread content: PATCH /threads/${thread_id}/
Change a comment content: PATCH /comments/${comment_id}/

This is a Forum for Pokemon Go where users can get all the related infomation. User can also post threads, comments and delete threads, comments.

Front-end: HTML, CSS, Javascript, React
Back-end: Node.js, Express, PostgresSQL