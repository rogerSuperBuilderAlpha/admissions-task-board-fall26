import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createTask, deleteTask, getTasks, updateTask, _resetForTests } from '../src/store.js';

beforeEach(() => _resetForTests());

describe('store', () => {
  it('creates a task with id and title', () => {
    const task = createTask('  Write tests  ');
    assert.equal(task.title, 'Write tests');
    assert.equal(task.completed, false);
    assert.equal(task.id, 1);
  });

  it('getTasks returns a copy (not mutable reference)', () => {
    createTask('A');
    const list = getTasks();
    list.push({ id: 999, title: 'hack', completed: false });
    assert.equal(getTasks().length, 1);
  });

  it('updateTask merges patch without dropping fields', () => {
    const original = { ...createTask('Keep title') };
    const updated = updateTask(1, { completed: true });
    assert.equal(updated.title, 'Keep title');
    assert.equal(updated.completed, true);
    assert.equal(updated.createdAt, original.createdAt);
    assert.equal(updated.id, original.id);
  });

  it('getTasks isolates task objects and returns ascending ids', () => {
    createTask('A');
    createTask('B');
    const list = getTasks();
    list.reverse();
    list[0].title = 'changed';
    assert.deepEqual(getTasks().map(({ id, title }) => ({ id, title })), [
      { id: 1, title: 'A' }, { id: 2, title: 'B' },
    ]);
  });

  it('deletes only the requested task and does not reuse ids', () => {
    createTask('A');
    createTask('B');
    assert.equal(deleteTask(1).id, 1);
    assert.equal(deleteTask(1), null);
    assert.equal(deleteTask(999), null);
    assert.deepEqual(getTasks().map((task) => task.id), [2]);
    assert.equal(updateTask(1, { completed: true }), null);
    assert.equal(createTask('C').id, 3);
  });

  it('deleteTask removes a task by id', () => {
    createTask('Remove me');
    createTask('Keep me');
    const deleted = deleteTask(1);
    assert.equal(deleted.id, 1);
    assert.deepEqual(
      getTasks().map((task) => task.title),
      ['Keep me'],
    );
  });
});
