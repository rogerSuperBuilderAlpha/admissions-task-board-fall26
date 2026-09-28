import { describe, it, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { _resetForTests } from '../src/store.js';

describe('task API', () => {
  let server;
  let port;
  beforeEach(() => _resetForTests());

  before(async () => {
    const { app } = await import('../src/server.js');
    await new Promise((resolve) => {
      server = app.listen(0, resolve);
    });
    port = server.address().port;
  });

  after(async () => {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('marks a task complete via PATCH', async () => {
    await fetch(`http://127.0.0.1:${port}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test' }),
    });
    const res = await fetch(`http://127.0.0.1:${port}/api/tasks/1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    assert.equal(res.status, 200, 'fix PATCH handler to read req.params.id');
    const body = await res.json();
    assert.equal(body.task.title, 'Test');
    assert.equal(body.task.completed, true);
  });

  it('creates, lists, and deletes a task', async () => {
    const base = `http://127.0.0.1:${port}/api/tasks`;
    const created = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '  Delete me  ' }),
    });
    assert.equal(created.status, 201);
    const { task } = await created.json();
    assert.equal(task.title, 'Delete me');
    const listed = await fetch(base);
    assert.equal(listed.status, 200);
    assert.deepEqual(await listed.json(), { tasks: [task] });
    const deleted = await fetch(`${base}/${task.id}`, { method: 'DELETE' });
    assert.equal(deleted.status, 204);
    assert.equal(await deleted.text(), '');
    assert.deepEqual(await (await fetch(base)).json(), { tasks: [] });
    for (const id of [task.id, 999, 'invalid']) {
      const missing = await fetch(`${base}/${id}`, { method: 'DELETE' });
      assert.equal(missing.status, 404);
      assert.deepEqual(await missing.json(), { error: 'not found' });
    }
    const patch = await fetch(`${base}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    assert.equal(patch.status, 404);
  });
});
