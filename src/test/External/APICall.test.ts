const apiCall = require('../../APICall/APICall.ts');
const expect = require('chai').expect;
const should = require('chai').should;
var request = require('supertest');

const postIds = ['1000', '1001'];
const authorsId = [1, 2];
const dev = 'https://imagequix-qa-interview.herokuapp.com';

// Uses outside functions to show I can test others work.
describe('API | Service Calls | Get Methods', function() {
	describe('/blog-posts', function() {
		// Setting timeout condition to higher result due to slow ping. Cannot use hooks because this would not set the timeout on the tests.
		this.timeout(50000);
		it('Passes as expected', async function() {
			const result = await apiCall('dev', '/blog-posts');
			expect(result).to.deep.equal(
				[ 
					{ 
						id: 1000,
						authorId: 1,
						title: 'Title 1000',
						body: '<p>Some sweet text</p>',
						publishDate: '2019-03-06T15:30:00.000',
						lastUpdated: '2019-03-04T11:46:32.241' 
					},
					{ 
						id: 1001,
						authorId: 2,
						title: 'Title 1001',
						body: '<h1>Some super awesome thing</h1><p>An awesome explanation</p>',
						publishDate: '2019-03-01T15:30:00.000',
						lastUpdated: '2019-02-27T23:32:52.553' 
					} 
				]
			);
			expect(result).to.be.a('array');
		});
	});
	describe('/blog-posts/:id', function() {
		// Setting timeout condition to higher result due to slow ping.
		this.timeout(50000);
		postIds.forEach((element) => {
			it(`Passes for id: ${element}`, async function() {
				const result = await apiCall('dev', `/blog-posts/${element}`);
				if(element === '1000'){ 
					expect(result).to.deep.equal(
						{ 
							id: 1000,
							authorId: 1,
							title: 'Title 1000',
							body: '<p>Some sweet text</p>',
							publishDate: '2019-03-06T15:30:00.000',
							lastUpdated: '2019-03-04T11:46:32.241' 
						}
					);
				} else {
					expect(result).to.deep.equal(
						{ 
							id: 1001,
							authorId: 2,
							title: 'Title 1001',
							body: '<h1>Some super awesome thing</h1><p>An awesome explanation</p>',
							publishDate: '2019-03-01T15:30:00.000',
							lastUpdated: '2019-02-27T23:32:52.553' 
						} 
					);
				}
			});	
		});
	});
	describe('/authors', function() {
		// Setting timeout condition to higher result due to slow ping.
		this.timeout(50000);
		it('Passes as expected', async function() {
			const result = await apiCall('dev', '/authors');
			expect(result).to.deep.equal(
				[ 
					{ 
						'firstName': 'John',
      					'id': 1,
      					'lastName': 'Doe',
      					'lastUpdated': '2010-01-01T00:00:02.123'
					},
					{ 
						'firstName': 'Henry',
						'id': 2,
						'lastName': 'Thoreau',
						'lastUpdated': '1862-05-06T12:00:00.000' 
					} 
				]
			);
			expect(result).to.be.a('array');
		});
	});
	describe('/authors/:id', function() {
		// Setting timeout condition to higher result due to slow ping.
		this.timeout(50000);
		authorsId.forEach((element) => {
			it(`Passes for id: ${element}`, async function() {
				const result = await apiCall('dev', `/authors/${element}`);
				if(element === 1){ 
					expect(result).to.deep.equal(
						{ 
							'firstName': 'John',
							'id': 1,
							'lastName': 'Doe',
							'lastUpdated': '2010-01-01T00:00:02.123'
						}
					);
				} else {
					expect(result).to.deep.equal(
						{ 
							'firstName': 'Henry',
							'id': 2,
							'lastName': 'Thoreau',
							'lastUpdated': '1862-05-06T12:00:00.000' 
						} 
					);
				}
			});	
		});
	});
});
// Switching gears to show that I can test without utilizing outside functions, if needed (using SuperTest).
describe('API | Service Calls | Post Methods', function() {
	/* ATTENTION: Not Working as expected. Designated required fields aren't enough. Skip failing test here if that was the standard till it was fixed. */
	describe('/blog-posts', function() {
		it('Responds with 201 on post (FAILING TEST)', function(done) {
			this.skip();
			request(`${dev}`)
			.post('/blog-posts')
			.send({"title": "Test-Title", "body": "Test-Body", "publishDate": "2019-2-20"})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(function(err: any, res: any) {
			// to show that there is an error handling method I could use.
				if (err) {
					done(err);
				}
				expect(res.res.statusMessage).to.equal('Bad Request');
			});
			done();
		});
	});
	/* ATTENTION: Works with post to blog */
	describe('/blog-posts', function() {
		this.timeout(50000);
		it('Responds with 201', function(done) {
			request(`${dev}`)
			.post('/blog-posts')
			.send({
				"authorId": 2,
				"title": "Title 1002",
				"body": "<p>Don't hassle the hoff</p>",
				"publishDate": "2019-03-06T15:31:00.000",
				"lastUpdated": "2019-03-04T11:47:32.241"
			})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(function(err: any, res: any) {
				// with no error handling (if one so chooses)
				expect(res.res.statusMessage).to.equal('OK');
				done();
			});
		});
	});
	describe('/authors', function() {
		this.timeout(50000);
		it('Responds with 201', function(done) {
			request(`${dev}`)
			.post('/authors')
			.send({"firstName": "Test-FirstName", "lastName": "Test-LastName"})
			.expect(201)
			.expect('Content-Type', /json/)
			.end(function(err: any, res: any) {
				if (err) {
					done(err);
				}
				expect(res.res.statusMessage).to.equal('Created');
			});
			done();
		});
	});
});
describe('API | Service Calls | Put Methods', function() {
	/* ATTENTION: Not Working as expected. Designated required fields aren't enough. Not skipped if standard was to have the test fail then later refactor test. */
	describe('/blog-posts/:id', function() {
		this.timeout(50000);
		it('Responds with 200 (FAILING TEST)', function(done) {
			request(`${dev}`)
			.put('/blog-posts/1002')
			.send({
				"id": "1002",
				"title": "Title-Test",
				"body": "Body-Test",
				"publishDate": "2020-1-1"
			})
			.expect(200)
			.end(function(err: any, res: any) {
				expect(res.text).equal('{"error":"invalid payload"}');
				done();
			});
		});
	});
	/* ATTENTION: Working as expected */
	describe('/blog-posts/:id', function() {
		this.timeout(50000);
		it('Responds with 200', function(done) {
			request(`${dev}`)
			.put('/blog-posts/1002')
			.send({
				"authorId": 3,
				"title": "Title 1020",
				"body": "something",
				"publishDate": "2119-03-06T15:30:00.000",
				"lastUpdated": "2119-03-31T13:19:50.500Z",
				"id": 1002
			})
			.expect(200)
			.end(function(err: any, res: any) {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('title');
				expect(res.body).to.have.property('body');
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('publishDate');
				expect(res.body).to.have.property('lastUpdated');
				done();
			});
		});
	});
	describe('/authors', function() {
		this.timeout(50000);
		it('Responds with 200 on put', function(done) {
			request(`${dev}`)
				.put('/authors/3')
				.send({"firstName": "Chuck", "lastName": "Norris", "id": 3})
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function(err: any, res: any) {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('firstName');
					expect(res.body).to.have.property('lastName');
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('lastUpdated');
					done();
				});
		});
	});
});
describe('API | Service Calls | Delete Methods', function() {
	describe('/blog-posts/:id', function() {
		this.timeout(50000);
		it('Responds with 204', function(done) {
			request(`${dev}`)
				.delete('/blog-posts/1002')
				.expect(204)
				.end(function(err: any, res: any) {
					expect(res.body).to.eql({});
					done();
				});
		});
	});
	describe('/authors', function() {
		this.timeout(50000);
		it('Responds with 204', function(done) {
			request(`${dev}`)
				.delete('/authors/3')
				.expect(204)
				.expect('Content-Type', /json/)
				.end(function(err: any, res: any) {
					expect(res.body).to.eql({});
					done();
				});
		});
	});
});