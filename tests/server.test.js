import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

describe('PATCH /api/tasks/:id', () => {
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

  it('deletes a task via DELETE', async () => {
    const created = await fetch(`http://127.0.0.1:${port}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Delete me' }),
    });
    const { task } = await created.json();
    const res = await fetch(`http://127.0.0.1:${port}/api/tasks/${task.id}`, {
      method: 'DELETE',
    });
    assert.equal(res.status, 204);
    const list = await fetch(`http://127.0.0.1:${port}/api/tasks`);
    const body = await list.json();
    assert.equal(body.tasks.some((t) => t.id === task.id), false);
  });

  it('returns 404 when deleting a missing task', async () => {
    const res = await fetch(`http://127.0.0.1:${port}/api/tasks/9999`, {
      method: 'DELETE',
    });
    assert.equal(res.status, 404);
  });
});
