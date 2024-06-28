const data = Array.from({ length: 100 }, (_, i) => i + 1);

await measurePerformance('Add Data - Method 1', () => addData1(data));
await measurePerformance('Add Data - Method 2', () => addData2(data));
await measurePerformance('Add Data - Method 3', () => addData3(data));

// Metoda 1: Pętla z await
async function addData1(data) {
  let sum = 0;
  for (let item of data) {
    sum = await asyncAdd(sum, item);
  }
  return sum;
}

// Metoda 2: reduce z sum jako Promise
async function addData2(data) {
  console.log('Reduce start');
  const resultPromise = data.reduce(async (sumPromise, item) => {
    const sumValue = await sumPromise;
    return asyncAdd(sumValue, item);
  }, Promise.resolve(0));
  console.log('Reduce end');
  return resultPromise;
}

// Metoda 3: Równoległe operacje
async function addData3(values) {
  let data = [...values];

  while (data.length > 1) {
    let asyncTempSums = [];
    while (data.length > 0) {
      if (data.length === 1) {
        asyncTempSums.push(Promise.resolve(data.pop()));
      } else {
        const a = data.pop();
        const b = data.pop();
        asyncTempSums.push(asyncAdd(a, b));
      }
    }
    data = await Promise.all(asyncTempSums);
  }
  return data.pop();
}

// Funkcja mierząca czas wykonania
async function measurePerformance(name, cb) {
  console.log(`Start: ${name}`);
  performance.mark('start');
  const result = await cb();
  performance.mark('end');
  const runTime = performance.measure('Execution Time', 'start', 'end');
  console.log(`Result from ${name}: ${result}`);
  console.log(`Execution time: ${runTime.duration.toFixed(2)} ms`);
}

// Asynchroniczne dodawanie dwóch liczb
async function asyncAdd(a, b) {
  console.count('[async add operation]');
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log('Error', { a, b });
    return Promise.reject('Arguments must be of type number!');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
}
