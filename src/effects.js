export function getFx1(prefix, animationRef, callback, {id, inc}, setStartValues) {
  const diff = 100;
  const millis = () => Date.now();
  let last = millis();
  return () => {
    if (millis() - last >= diff) {
      let currentId = prefix + (id);
      let current = document.getElementById(currentId);
      if (!current) {
        inc *= -1;
        id += 2 * inc;
        currentId = prefix + (id);
        current = document.getElementById(currentId);
      }

      const prevId = prefix + (id - inc);
      const prev = document.getElementById(prevId);
      if (prev) {
        prev.style.backgroundColor = "red";
      }

      if (current) {
        current.style.backgroundColor = "white";

        id += inc;
      }

      last = millis();
    }

    setStartValues({id, inc})

    animationRef.current = requestAnimationFrame(callback());
  }
}