---
title: How climb is counted
description: How Summit measures the feet you climb, and why its number is lower than a naive sum.
---

Summit counts climb the way good fitness watches do, so small wobbles in the height reading don't turn into feet you never climbed. The same method checks planned routes and live walks, so planned and walked numbers can be compared fairly.

## On a walk

Your iPhone's barometer senses tiny changes in air pressure, which makes it very good at telling you went up two meters. It drifts over an hour, though. GPS knows your real height but jumps around from reading to reading. Summit uses the barometer for every step up and down, and GPS to slowly correct the drift.

Then it only banks a climb once you've gone up at least **3 m (about 10 ft)** from the last low point. Walking over a speed bump, or the reading wobbling while you wait at a light, adds nothing.

If your phone has no barometer, Summit uses GPS alone and raises that bar to **6 m (about 20 ft)**, because GPS height is noisier. The Walk screen tells you when this happens.

## When planning

The route service returns a height for each point on a route. Summit:

1. Spaces the heights out evenly, one every 25 m.
2. Smooths out single spikes by taking the middle of every three readings.
3. Banks climb with the same 3 m rule as on a walk.

The steepest grade on a route card is the steepest stretch over 100 m.

## Why planned and walked climb differ

Planned climb comes from map elevation data, which is measured about every 30 m. It can miss a short flight of stairs or a steep driveway. Your barometer doesn't miss those. Expect walked climb to land near the plan, sometimes a little over.

Only walked climb counts toward your peak.
