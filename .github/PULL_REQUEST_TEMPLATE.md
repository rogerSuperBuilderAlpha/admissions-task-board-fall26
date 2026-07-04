## Summary

What was broken and how you fixed it (2–4 sentences):

## Changes

- [x] Bug fixes (describe each in your own words — do not paste solution lists)
    Fix getTasks:
        - getTasks was returning a direct reference to the internal tasks array, so callers could mutate store state. Fixed it to return a copy instead.  If a user does a push/splice they do not affect the store.tasks.
    Fix updateTask:
        - It was doing a whole update, dropping fields if not included instad of the proposed patch update, where is should update given fields, leaving others untouched. Changed it to copy all prior fields, the put the patch from user ontop.
    Fix handler in server.js:
        - Changed to use req.params.Id instad of req.params.taskId. req.params.taskId is not defined, the API was reading the wrong route. 
- [x] Missing feature implemented (optional — see README; recommended for strong pass)
- [x] Tests pass (`npm test`)



## Test plan

- [x] `npm test` passes locally
- [x] Manual smoke: create task → mark complete → (delete if implemented)



## Agent usage

Which agents did you use, and for what? Be specific — this is evaluated, not penalized.

- Research: Cursor Auto
- Development: Cursor Auto
- QA / review: Cursor Auto
- Cursor Auto for all tasks as it the cheapest and best IDE for these tasks.



## Notes

Anything you would do differently with more time: