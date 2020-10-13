import { HttpError, WrongResponseBodyError } from '@/lib/errors';

// To avoid delegation of an empty response body error to consumer code,
// we agree that all endpoints set content-type of application/json.

export class Api {
  constructor({ timeout = 5000 } = {}) {
    this.timeout = timeout;
  }

  async request(url, fetchOptions, { timeout } = {}) {
    const abortController = new AbortController();
    const passedSignal = fetchOptions?.signal;

    const handleConsumerAbort = () => {
      console.log('client aborted');
      if (abortController.signal.aborted) {
        return;
      }
      abortController.abort();
    };

    if (passedSignal) {
      passedSignal.addEventListener('abort', handleConsumerAbort);
    }

    setTimeout(() => {
      abortController.abort();
      passedSignal?.removeEventListener('abort', handleConsumerAbort);
    }, timeout ?? this.timeout);

    const res = await fetch(url, {
      ...fetchOptions,
      signal: abortController.signal,
    });

    if (!res.ok) {
      throw new HttpError(res.status, res.statusText);
    }

    try {
      return await res.json();
    } catch (e) {
      throw new WrongResponseBodyError(res);
    }
  }
}

export default new Api();
