export function isErrorWithMessage(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  );
}

export function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error) {
  return toErrorWithMessage(error).message;
}

export const isAbortError = (error) => {
  const message = getErrorMessage(error);
  if (error && message === "AbortError") {
    return true;
  }
  return false;
};

export function fetchProfileByEns(address) {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const URL = `https://api.web3.bio/profile/${address}`;

      const response = await fetch(URL, {
        method: "GET",
        signal,
        next: {
          revalidate: 60,
        },
      });
      const data = await response.json();
      if (data) {
        resolve(data);
      } else {
        reject(Error("No ens data found"));
      }
    } catch (error) {
      reject(error);
    }
  });
  promise.cancel = () => controller.abort();
  return promise;
}
