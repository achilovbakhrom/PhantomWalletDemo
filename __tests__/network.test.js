import network from '../app/utils/network';

// get reqeust
it('get request with axios', async () => {
    const userResponse = await network.get('https://jsonplaceholder.typicode.com/todos/1')
    const user = userResponse.data
    console.log(user)
    
    expect(user.userId).toEqual(1) 
})

// post request
it('post request with axios', async () => {
    const postResponse = await network.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
    })
    const post = postResponse.data
    expect(post.title).toEqual('foo')
})

// put request
it('put request with axios', async () => {
    const putResponse = await network.put('https://jsonplaceholder.typicode.com/posts/1', {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      })
    
    expect(putResponse.status).toEqual(200)
})

// delete request
it('delete request with axios', async () => {
    const deleteResponse = await network.delete('https://jsonplaceholder.typicode.com/posts/1')
    expect(deleteResponse.status).toEqual(200)
})

