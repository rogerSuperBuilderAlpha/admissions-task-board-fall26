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
    createTask('Keep title');
    const updated = updateTask(1, { completed: true });
    assert.equal(updated.title, 'Keep title');
    assert.equal(updated.completed, true);
  });

  it('deleteTask removes an existing task and returns true', () => {
    createTask('Delete me');
    assert.equal(deleteTask(1), true);
    assert.equal(getTasks().length, 0);
  });

  it('deleteTask returns false for a missing id', () => {
    assert.equal(deleteTask(999), false);
  });
});
