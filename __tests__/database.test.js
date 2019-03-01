import Database from '../app/utils/database';
const database = new Database('test');

// insert
it('insert to db', async () => {
    const result = await database.insert({
        id: 1,
        title: 'title',
        author: 'Author',
        pages: 2000
    })
    console.log(result)
    expect(result.id).toEqual(1)
});

// findAll
it ('findAll', async () => {
    const result = await database.findAll()
    console.log(result)
    expect(result.length).toEqual(5)
})

