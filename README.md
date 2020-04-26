# Pokemon Go Forum

Live: https://hanguyen-pokemongo-forum.now.sh/

### API Documentation: 

    Link: https://stark-inlet-33649.herokuapp.com

- ##### GET /api/topics

    Return all topics of the forum

###### Example response

    [
        {
            id: 1,
            topic_name: 'General',
            topic_content: 'General discussion about Pokemon Go!.'
        },
        {
            id: 2,
            topic_name: 'Introduction',
            topic_content: 'Introduce yourselves here!'
        }
    ]

- ##### GET /api/threads

    Return all threads of the forum

###### Example response

    [
        {
            id: 1,
            thread_title: 'events',
            thread_content: 'When is Valentine event start?',
            user_id: 1,
            topic_id: 1,
            modified: '2020-02-22T21:28:32.615Z'
        }
    ]

- ##### GET /api/comments

    Return all comments of the forum

###### Example response

    [
        {
            id: 1,
            content: 'Hello there!',
            user_id: 1,
            thread_id: 1,
            modified: '2020-02-22T21:28:32.615Z'
        }
    ]

- ##### GET /api/topics/${topicId}/threads

    Return all threads with a specific topicId

- ##### GET /api/threads/${thread_id}

    Return a specific thread by its id

- ##### GET /api/threads/${threadId}/comments

    Return all comments with a specific threadId

- ##### POST /api/threads
   
    Post a thread

###### Example request

    {
        thread_title: 'events',
        thread_content: 'When is Valentine event start?',
        user_id: 1,
        topic_id: 1,
    }

- ##### POST /api/comments
   
    Post a comment

###### Example request

    {
        content: 'Hello!',
        user_id: 1,
        thread_id: 1,
    }

- ##### DELETE /api/threads/${thread_id}

    Delete a Thread. If no thread could be found by thread_id , the server responds with a status 400.

- ##### DELETE /api/comments/${comment_id}

    Delete a comment. If no comment could be found by comment_id , the server responds with a status 400.

- ##### PATCH /api/threads/${thread_id}

    Change a thread content. If no thread could be found by thread_id , the server responds with a status 400.

- ##### PATCH /api/comments/${thread_id}

    Change a comment content. If no comment could be found by comment_id , the server responds with a status 400.

### Preview:
![](Screenshot-PoGoForum.png)

    This is a Forum for Pokemon Go where users can get all the related infomation. User can also post threads, comments and delete threads, comments.

### Tech Stack

    Front-end: HTML, CSS, Javascript, React

    Back-end: Node.js, Express, PostgresSQL
