React Dev Tools Profiler is used to measure the performance of the application:

### 1 Interactions: user to type "pol" to input search country

**BEFORE OPTIMIZATION**

- Commit Duration: 4.3s
- Render Duration: 26.2ms
- Flamegraph: ![Flamegraph](./docs/images/before-optimization/flamegraph-country.png)
- Ranked Chart: ![Ranked Chart](./docs/images/before-optimization/ranked-country.png)

**AFTER OPTIMIZATION**

- Commit Duration: 4.2s
- Render Duration: 24ms
- Flamegraph: ![Flamegraph](./docs/images/after-optimization/flamegraph-country.png)
- Ranked Chart: ![Ranked Chart](./docs/images/after-optimization/ranked-country.png)

---

### 2 Interactions: user change year to 2018

**BEFORE OPTIMIZATION**

- Commit Duration: 3.3s
- Render Duration: 210.5ms
- Flamegraph: ![Flamegraph](./docs/images/before-optimization/flamegraph-year.png)
- Ranked Chart: ![Ranked Chart](./docs/images/before-optimization/ranked-year.png)

**AFTER OPTIMIZATION**

- Commit Duration: 3.2s
- Render Duration: 248.9ms
- Flamegraph: ![Flamegraph](./docs/images/after-optimization/flamegraph-year.png)
- Ranked Chart: ![Ranked Chart](./docs/images/after-optimization/ranked-year.png)

---

### 3 Interactions: user changes sort to sort by name desc

**BEFORE OPTIMIZATION**

- Commit Duration: 2.9s
- Render Duration: 198.2ms
- Flamegraph: ![Flamegraph](./docs/images/before-optimization/flamegraph-sort.png)
- Ranked Chart: ![Ranked Chart](./docs/images/before-optimization/ranked-sort.png)

**AFTER OPTIMIZATION**

- Commit Duration: 1.8s
- Render Duration: 239ms
- Flamegraph: ![Flamegraph](./docs/images/after-optimization/flamegraph-sort.png)
- Ranked Chart: ![Ranked Chart](./docs/images/after-optimization/ranked-sort.png)

---

### 4 Interactions: user adds one more column "gdp"

**BEFORE OPTIMIZATION**

- Commit Duration: 2.4s
- Render Duration: 227.9ms
- Flamegraph: ![Flamegraph](./docs/images/before-optimization/flamegraph-columns.png)
- Ranked Chart: ![Ranked Chart](./docs/images/before-optimization/ranked-columns.png)

**AFTER OPTIMIZATION**

- Commit Duration: 1s
- Render Duration: 49ms
- Flamegraph: ![Flamegraph](./docs/images/after-optimization/flamegraph-columns.png)
- Ranked Chart: ![Ranked Chart](./docs/images/after-optimization/ranked-columns.png)
