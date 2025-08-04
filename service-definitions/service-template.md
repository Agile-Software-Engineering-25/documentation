---
sidebar_position: 2
sidebar_custom_props:
  myEmoji: 🏫
---

# Exams & Grades: Lecturer Service

#### Contact: Janne Keipert

### ⚠️ This page is still in progress ⚠️

## Group: F4

## Exposing information:

- Using the id of an exam you can receive the feedback of the Lecturer given to the exam submissions of each student
  - the response will look something like this:

```json
[
  {
    "id": "uuid" /* own given uuid to identity this feedback entity */,
    "exam_id": "exam_uuid" /* id of the exam which the submission is based on (the exam contains information like: its course, its due submission date, ... */,
    "exam_submissions_id": "exam_entry_uuid" /* id of the submission which this feedback is based on (the submission contains information like: when was it submitted, who submitted it, what was submitted, ...) */,
    "lecturer_id": "lecturer_uuid" /* id of the lecturer who created this feedback (the lecturer contains information like: lecturer name, lecturer surname, lecturer email) */,
    "feedback": {
      "grade": "1.3" /* the given grade */,
      "total_points": "50" /* the total points which the lecturer gave this submission */,
      "comment": "comment given by lecturer" /* a comment written by the lecturer */
    }
  }
]
```

- using the id of a student you can receive all the feedback given to submissions by this user
- using the id of a course you can receive all feedback to submissions inside this course

## Required information:

- we have the student id and need to get all submissions of this student (resolved by ExGrad: Student Service)
- we have the course id and need to get all exams in this course
