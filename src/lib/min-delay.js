export default function minDelay(promise, ms = 1000) {
  const delay = new Promise((r) => setTimeout(r, ms));

  const wrapDelay = (initPromise) => delay.then(initPromise);

  // prettier-ignore
  return promise.then(
    (arg) => wrapDelay(
      () => new Promise((resolve) => resolve(arg))
    ),
    (arg) => wrapDelay(
      () => new Promise((_, reject) => reject(arg))
    )
  );
}
