# Hands-on-Health

## Live website powered with render

right click to open in new tab
[https://hands-on-health2-1.onrender.com](https://hands-on-health2-1.onrender.com)


## Steps to set up:
- Clone the repo into your local computer
- cd into client; then `npm install`
- cd into server; then `npm install`
- Create your own working branch
- Make changes, commit, then pull request

## JSON Structures:
### Exercises from database
```
{
  name: String,  // Name of exercise
  type: String,  // Type of exercise
  sets: Number,
  reps: Number,
  priority: Number(1 or 2)  // Priority for exercises(1 for important/compound exercises, 2 for other extra exercises)
}

Example:
{
  name: "Bench Press",
  type: "Chest",
  sets: 3,
  reps: 8,
  priority: 1
}
```

### Workout template GET request frontend->backend
```
Put into the query of the backend url
Example:
types: ["Chest","Back"],
duration: "30",
intensity: "normal"
```

### Workout Template GET request backend->frontend
```
{
  name: String,  // Name of exercise
  type: String,  // Type of exercise
  sets: Number,
  reps: Number
}

Example:
{
  name: "Bench Press",
  type: "Chest",
  sets: 3,
  reps: 8
}
```


