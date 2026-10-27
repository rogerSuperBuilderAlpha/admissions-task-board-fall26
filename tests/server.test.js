import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { _resetForTests } from '../src/store.js';

describe('task API', () => {
  let server;
  let port;

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

  beforeEach(() => _resetForTests());

  const post = (body) =>
    fetch(`http://127.0.0.1:${port}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

  it('marks a task complete via PATCH', async () => {
    await post({ title: 'Test' });
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

  it('rejects PATCH with a non-numeric id (400)', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/tasks/abc`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    assert.equal(res.status, 400);
  });

  it('rejects PATCH with a missing/non-boolean completed (400)', async () => {
    await post({ title: 'Test' });
    const res = await fetch(`http://127.0.0.1:${port}/api/tasks/1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.equal(res.status, 400);
  });

  it('rejects POST with a whitespace-only title (400)', async () => {
    const res = await post({ title: '   ' });
    assert.equal(res.status, 400);
  });

  it('deletes a task via DELETE (204) and removes it from the list', async () => {
    await post({ title: 'Delete me' });
    const del = await fetch(`http://127.0.0.1:${port}/api/tasks/1`, { method: 'DELETE' });
    assert.equal(del.status, 204);
    const list = await (await fetch(`http://127.0.0.1:${port}/api/tasks`)).json();
    assert.equal(list.tasks.length, 0);
  });

  it('returns 404 when deleting an already-deleted task', async () => {
    await post({ title: 'Delete me' });
    await fetch(`http://127.0.0.1:${port}/api/tasks/1`, { method: 'DELETE' });
    const again = await fetch(`http://127.0.0.1:${port}/api/tasks/1`, { method: 'DELETE' });
    assert.equal(again.status, 404);
  });
});
