# Disclaimer ❗️

I realized this test technical assignment for back-end development using Nestjs and TypeScript.

Source: <a href="https://github.com/appbooster/test-assignments/blob/master/tasks/backend.md">Backend developer (any)</a>

# Test assignment: backend

We create mobile applications, and sometimes we need to run A/B tests to validate hypotheses. For this, we need a system that implements the simplest REST API, consisting of a single endpoint.

## API and distribution

Upon launch, the mobile application generates a unique client ID (which persists between sessions) and requests a list of experiments by adding a Device-Token HTTP header. In response, the server provides a list of experiments. For each experiment, the client receives:

- Key: the name of the experiment. The client has code that will alter certain behavior depending on the value of this key
- Value: a string, one of the possible options (see below)

It is crucial that the device is assigned to one group and always remains in it.

## Experiments

### 1. Button color

We have a hypothesis that the color of the "buy" button affects the conversion to purchase

- Key: button_color
- Options:
- #FF0000 → 33.3%
- #00FF00 → 33.3%
- #0000FF → 33.3%

Thus, after 600 requests to the API with different DeviceTokens, each color should be assigned to 200 devices

### 2. Purchase price

We have a hypothesis that changing the purchase price in the app may affect our marginal profit. However, to avoid losing money in case of an unsuccessful experiment, 75% of users will receive the old price, and we will test the change on only a small portion of the audience:

- Key: price
- Options:
- 10 → 75%
- 20 → 10%
- 50 → 5%
- 5 → 10%

## Requirements and constraints

1. Once a device has received a value, it will always receive only that value

2. The experiment is conducted only for new devices: if the experiment was created after the first request from the device, then the device should not know anything about this experiment

## Task

1. Design, describe, and implement the API
2. Add experiments (1) and (2) to the application
3. Create a page for statistics: a simple table with a list of experiments, the total number of devices participating in the experiment, and their distribution among options

You can use any technologies and libraries

The following will be considered a plus:

- Presence of tests
- A deployed version of the application
- Server response speed <100ms
