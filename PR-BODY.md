## Summary

Three bugs broke the task board API: getTasks returned the live internal array, updateTask replaced the whole task object instead of merging, and PATCH read req.params.taskId instead of req.params.id. I fixed all three and added DELETE /api/tasks/:id for a full CRUD path.

## Changes

- [x] Bug fixes: copy+sort in getTasks, merge patch in updateTask, correct route param on PATCH
- [x] Missing feature: deleteTask in store + DELETE route (204 on success, 404 if missing)
- [x] Tests pass (`npm test`)

## Test plan

- [x] `npm test` passes locally (4/4)
- [x] Manual smoke: POST task → PATCH complete → DELETE task

## Agent usage

- Research: Read README and failing tests to locate the three bugs
- Development: Cursor fixed store.js and server.js
- QA / review: Ran npm test until green

## Notes

With more time I would add a DELETE integration test in tests/server.test.js.
